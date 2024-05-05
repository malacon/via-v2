/* eslint-disable remix-react-routes/use-link-for-routes */
import { parseWithZod } from '@conform-to/zod'
import { invariantResponse } from '@epic-web/invariant'
import {
	json,
	type LoaderFunctionArgs,
	type ActionFunctionArgs,
	type HeadersFunction,
	type LinksFunction,
	type MetaFunction,
} from '@remix-run/node'
import {
	Link,
	Links,
	Meta,
	Outlet,
	Scripts,
	ScrollRestoration,
	useFetchers,
	useLoaderData,
} from '@remix-run/react'
// import { withSentry } from '@sentry/remix'
import { motion, useSpring } from 'framer-motion'
import { useLayoutEffect, useState } from 'react'
import { HoneypotProvider } from 'remix-utils/honeypot/react'
import { z } from 'zod'
import { GeneralErrorBoundary } from './components/error-boundary.tsx'
import { EpicProgress } from './components/progress-bar.tsx'
import { useToast } from './components/toaster.tsx'
import { Icon, href as iconsHref } from './components/ui/icon.tsx'
import {
	Sheet,
	SheetContent,
	SheetDescription,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from './components/ui/sheet.tsx'
import { EpicToaster } from './components/ui/sonner.tsx'
import fontStylesheetUrl from './styles/font.css?url'
import tailwindStyleSheetUrl from './styles/tailwind.css?url'
import { getUserId, logout } from './utils/auth.server.ts'
import { ClientHintCheck, getHints, useHints } from './utils/client-hints.tsx'
import { prisma } from './utils/db.server.ts'
import { getEnv } from './utils/env.server.ts'
import { honeypot } from './utils/honeypot.server.ts'
import { cn, combineHeaders, getDomainUrl } from './utils/misc.tsx'
import { useNonce } from './utils/nonce-provider.ts'
import { useRequestInfo } from './utils/request-info.ts'
import { type Theme, setTheme, getTheme } from './utils/theme.server.ts'
import { makeTimings, time } from './utils/timing.server.ts'
import { getToast } from './utils/toast.server.ts'

export const links: LinksFunction = () => {
	return [
		// Preload svg sprite as a resource to avoid render blocking
		{ rel: 'preload', href: iconsHref, as: 'image' },
		// Preload CSS as a resource to avoid render blocking
		{ rel: 'mask-icon', href: '/favicons/mask-icon.svg' },
		{
			rel: 'alternate icon',
			type: 'image/png',
			href: '/favicons/favicon-32x32.png',
		},
		{ rel: 'apple-touch-icon', href: '/favicons/apple-touch-icon.png' },
		{
			rel: 'manifest',
			href: '/site.webmanifest',
			crossOrigin: 'use-credentials',
		} as const, // necessary to make typescript happy
		//These should match the css preloads above to avoid css as render blocking resource
		{ rel: 'icon', type: 'image/svg+xml', href: '/favicons/favicon.svg' },
		{ rel: 'stylesheet', href: fontStylesheetUrl },
		{ rel: 'stylesheet', href: tailwindStyleSheetUrl },
	].filter(Boolean)
}

export const meta: MetaFunction<typeof loader> = ({ data }) => {
	return [
		{ title: 'via nova: study / work / pray' },
		{ name: 'description', content: 'Work Study Pray' },
	]
}

export async function loader({ request }: LoaderFunctionArgs) {
	const timings = makeTimings('root loader')
	const userId = await time(() => getUserId(request), {
		timings,
		type: 'getUserId',
		desc: 'getUserId in root',
	})

	const user = userId
		? await time(
				() =>
					prisma.user.findUniqueOrThrow({
						select: {
							id: true,
							name: true,
							username: true,
							image: { select: { id: true } },
							roles: {
								select: {
									name: true,
									permissions: {
										select: { entity: true, action: true, access: true },
									},
								},
							},
						},
						where: { id: userId },
					}),
				{ timings, type: 'find user', desc: 'find user in root' },
			)
		: null
	if (userId && !user) {
		console.info('something weird happened')
		// something weird happened... The user is authenticated but we can't find
		// them in the database. Maybe they were deleted? Let's log them out.
		await logout({ request, redirectTo: '/' })
	}
	const { toast, headers: toastHeaders } = await getToast(request)
	const honeyProps = honeypot.getInputProps()

	return json(
		{
			user,
			requestInfo: {
				hints: getHints(request),
				origin: getDomainUrl(request),
				path: new URL(request.url).pathname,
				userPrefs: {
					theme: getTheme(request),
				},
			},
			ENV: getEnv(),
			toast,
			honeyProps,
		},
		{
			headers: combineHeaders(
				{ 'Server-Timing': timings.toString() },
				toastHeaders,
			),
		},
	)
}

export const headers: HeadersFunction = ({ loaderHeaders }) => {
	const headers = {
		'Server-Timing': loaderHeaders.get('Server-Timing') ?? '',
	}
	return headers
}

const ThemeFormSchema = z.object({
	theme: z.enum(['system', 'light', 'dark']),
})

export async function action({ request }: ActionFunctionArgs) {
	const formData = await request.formData()
	const submission = parseWithZod(formData, {
		schema: ThemeFormSchema,
	})

	invariantResponse(submission.status === 'success', 'Invalid theme received')

	const { theme } = submission.value

	const responseInit = {
		headers: { 'set-cookie': setTheme(theme) },
	}
	return json({ result: submission.reply() }, responseInit)
}

function Document({
	children,
	nonce,
	theme = 'light',
	env = {},
	allowIndexing = true,
}: {
	children: React.ReactNode
	nonce: string
	theme?: Theme
	env?: Record<string, string>
	allowIndexing?: boolean
}) {
	return (
		<html lang="en" className={`${theme} h-full overflow-x-hidden`}>
			<head>
				<ClientHintCheck nonce={nonce} />
				<Meta />
				<meta charSet="utf-8" />
				<meta name="viewport" content="width=device-width,initial-scale=1" />
				{allowIndexing ? null : (
					<meta name="robots" content="noindex, nofollow" />
				)}
				<Links />
			</head>
			<body className="overflow-x-hidden bg-background font-serif text-foreground">
				{children}
				<script
					nonce={nonce}
					dangerouslySetInnerHTML={{
						__html: `window.ENV = ${JSON.stringify(env)}`,
					}}
				/>
				<ScrollRestoration nonce={nonce} />
				<Scripts nonce={nonce} />
			</body>
		</html>
	)
}

function App() {
	const data = useLoaderData<typeof loader>()
	const nonce = useNonce()
	const theme = useTheme()
	const allowIndexing = data.ENV.ALLOW_INDEXING !== 'false'
	useToast(data.toast)

	return (
		<Document
			nonce={nonce}
			theme={theme}
			allowIndexing={allowIndexing}
			env={data.ENV}
		>
			<div className="">
				<Header />

				<div className="flex-1">
					<Outlet />
				</div>

				<Footer />
			</div>
			<EpicToaster closeButton position="top-center" theme={theme} />
			<EpicProgress />
		</Document>
	)
}

function Navigation() {
	const spring = useSpring(0, { damping: 100, stiffness: 200 })
	const [currentLocation, setCurrentLocation] = useState(0)
	const [sheetOpen, setSheetOpen] = useState(false)

	useLayoutEffect(() => {
		setCurrentLocation(window.scrollY)
		const handleWheel = () => {
			console.log('Wheel!', spring.get())
			// spring.set(window.scrollY, false)

			console.log('currentLoc:::', currentLocation)
			// spring.animation?.stop() // Stop the spring animation on wheel scroll
		}

		window.addEventListener('wheel', handleWheel)

		spring.on('change', latest => {
			window.scrollTo(0, latest)
		})

		return () => {
			window.removeEventListener('scroll', handleWheel)
		}
	}, [spring])

	function moveTo(to: number) {
		setCurrentLocation(to)
		setSheetOpen(false)
		spring.set(window.scrollY, false)
		setTimeout(() => {
			console.log('currentLoc', currentLocation)
			spring.set(currentLocation)
		}, 50)
	}

	return (
		<>
			<motion.button
				className="fixed bottom-6 right-6 z-50 h-12 w-12 rounded-full border border-black bg-slate-700 opacity-50 md:bottom-16 md:right-16"
				onClick={() => moveTo(0)}
			>
				<Icon name="arrow-up" className="h-8 w-8 text-slate-300" />
			</motion.button>
			<div className="lg:hidden">
				<Sheet open={sheetOpen} onOpenChange={open => setSheetOpen(open)}>
					<SheetTrigger asChild>
						<button>
							<Icon name="hamburger-menu" className="h-8 w-8" />
						</button>
					</SheetTrigger>
					<SheetContent className="w-screen">
						<SheetHeader>
							<SheetTitle>
								<Logo className="!text-3xl" />
							</SheetTitle>
							<SheetDescription>
								<ul className="font-nav mt-8 flex flex-col gap-8 text-lg font-normal uppercase tracking-widest">
									<li className="hover:font-bold">
										<Link
											to={{
												pathname: '/',
												hash: '#about',
											}}
											onClick={() => moveTo(110)}
										>
											About
										</Link>
									</li>
									<li className="hover:font-bold">
										<Link
											to={{
												pathname: '/',
												hash: '#contact',
											}}
											onClick={() =>
												moveTo(
													document?.getElementById('contact')?.offsetTop ||
														2100,
												)
											}
										>
											Contact
										</Link>
									</li>
									<li className="hover:font-bold">
										<Link to="faq">FAQ</Link>
									</li>
									<li className="hover:font-bold">
										<Link to="news">News</Link>
									</li>
								</ul>
							</SheetDescription>
						</SheetHeader>
					</SheetContent>
				</Sheet>
			</div>
			<nav className="hidden lg:block">
				<ul className="font-nav flex flex-row space-x-8 text-lg font-normal uppercase tracking-widest">
					<li className="hover:font-bold">
						<Link
							to={{
								pathname: '/',
								hash: '#about',
							}}
							onClick={() => moveTo(110)}
						>
							About
						</Link>
					</li>
					<li className="hover:font-bold">
						<Link
							to={{
								pathname: '/',
								hash: '#contact',
							}}
							onClick={() => moveTo(2300)}
						>
							Contact
						</Link>
					</li>
					<li className="hover:font-bold">
						<Link to="faq">FAQ</Link>
					</li>
					<li className="hover:font-bold">
						<Link to="news">News</Link>
					</li>
				</ul>
			</nav>
		</>
	)
}

function Header() {
	return (
		<header className="container mb-2 mt-10 flex flex-row place-content-between place-items-center bg-background px-6  lg:mb-5 lg:items-baseline lg:px-8">
			<Link to="/">
				<Logo />
			</Link>
			<Navigation />
		</header>
	)
}

function Logo({ className }: { className?: string }) {
	return (
		<div
			className={cn([
				'font-title text-3xl font-thin uppercase tracking-[.2em] text-black md:text-5xl',
				className,
			])}
		>
			<img
				src="/img/via-logo.svg"
				alt="Via Nova"
				className="h-14 w-auto fill-slate-900"
			/>{' '}
			{/* Via Nova */}
			{/* <span className="font-semibold">Via</span> Nova */}
		</div>
	)
}

function Footer() {
	return (
		<footer>
			<section className="container  flex h-40 flex-col justify-between px-6 pb-2 pt-12 text-center md:px-8 ">
				<div className="px-4">
					Via Nova is an independent 501(c)(3) organization. All donations are
					tax-deductible by law.
				</div>
			</section>
		</footer>
	)
}

function AppWithProviders() {
	const data = useLoaderData<typeof loader>()
	return (
		<HoneypotProvider {...data.honeyProps}>
			<App />
		</HoneypotProvider>
	)
}

export default AppWithProviders

/**
 * @returns the user's theme preference, or the client hint theme if the user
 * has not set a preference.
 */
export function useTheme() {
	const hints = useHints()
	const requestInfo = useRequestInfo()
	const optimisticMode = useOptimisticThemeMode()
	if (optimisticMode) {
		return optimisticMode === 'system' ? hints.theme : optimisticMode
	}
	return requestInfo.userPrefs.theme ?? hints.theme
}

/**
 * If the user's changing their theme mode preference, this will return the
 * value it's being changed to.
 */
export function useOptimisticThemeMode() {
	const fetchers = useFetchers()
	const themeFetcher = fetchers.find(f => f.formAction === '/')

	if (themeFetcher && themeFetcher.formData) {
		const submission = parseWithZod(themeFetcher.formData, {
			schema: ThemeFormSchema,
		})

		if (submission.status === 'success') {
			return submission.value.theme
		}
	}
}

export function ErrorBoundary() {
	// the nonce doesn't rely on the loader so we can access that
	const nonce = useNonce()

	// NOTE: you cannot use useLoaderData in an ErrorBoundary because the loader
	// likely failed to run so we have to do the best we can.
	// We could probably do better than this (it's possible the loader did run).
	// This would require a change in Remix.

	// Just make sure your root route never errors out and you'll always be able
	// to give the user a better UX.

	return (
		<Document nonce={nonce}>
			<GeneralErrorBoundary />
		</Document>
	)
}
