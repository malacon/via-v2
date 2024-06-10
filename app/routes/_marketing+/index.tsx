// import { Tab } from '@headlessui/react'
import { type MetaFunction } from '@remix-run/node'
import { AnimatePresence, motion } from 'framer-motion'
import { GiftIcon } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import EmployeeCarousel from '#app/components/employee-carousel.js'
import PrayIcon from '#app/components/icon/pray.js'
import StudyIcon from '#app/components/icon/study.js'
import WorkIcon from '#app/components/icon/work.js'
import {
	Dialog,
	DialogContent,
	DialogTrigger,
} from '#app/components/ui/dialog.js'
import { Icon } from '#app/components/ui/icon.js'
import ApplyForm from '#app/routes/resources+/apply-form'
import SupportForm from '#app/routes/resources+/support-form'
import { cn } from '#app/utils/misc.js'
import InquiryForm from '../resources+/inquiry-form'

import banner from '/img/mountain-help.jpg'
import poetry from '/img/poetry.jpg'
import discuss from '/img/discuss.jpg'
import sushi from '/img/sushi.jpg'
import foley from '/img/foley.jpg'
import studyAbout from '/img/study.jpg'
import workAbout from '/img/work.jpg'
import prayAbout from '/img/pray.jpg'

export const meta: MetaFunction = () => [{ title: 'Via Nova' }]

export default function Index() {
	// const images = [
	// 	'/img/poetry.jpg',
	// 	'/img/discuss.jpg',
	// 	'/img/sushi.jpg',
	// 	'/img/foley.jpg',
	// ]
	const images = [poetry, discuss, sushi, foley]
	const aboutImages = [studyAbout, workAbout, prayAbout]
	// const [selectedIndex, setSelectedIndex] = useState<undefined | number>(
	// 	undefined,
	// )

	return (
		<main>
			<section
				id="about"
				className="mb-16 h-fit scroll-smooth bg-background-muted text-background lg:mb-16 "
			>
				<ImageOverlay
					src={banner}
					alt="Descriptive Alt Text"
					className="h-[450px] w-screen overflow-hidden md:h-[640px] lg:h-[480px]"
					gradientClass="bg-gradient-to-r from-slate-900/80 to-slate-700/80 md:from-slate-700/80 md:to-blue-500/30"
				>
					<div className="container space-y-10  px-6 text-base sm:text-lg md:px-8 md:text-xl">
						<p className="md:w-2/3 lg:w-2/5">
							Via Nova offers a 9-month, live-in experience of intensive
							intellectual, professional, and spiritual formation for Catholics
							ages 18-22.
						</p>
						<p className="md:w-2/3 lg:w-2/5">
							Through seminars, apprenticeships, spiritual regimens, and more,
							Via Nova offers participants a via nova, that is "a new way" of
							forming life-changing habits, acquiring practical knowledge, and
							ultimately enjoying a life of freedom and mission.
						</p>
					</div>
				</ImageOverlay>
			</section>
			<section className="mb-20 flex flex-col gap-24">
				<div className="container flex flex-col gap-8 px-6 md:px-8 lg:flex-row">
					<div className="text-center text-3xl leading-10 text-accent-dark md:text-6xl md:leading-[5.25rem] lg:w-1/3 lg:text-left">
						Life in Via Nova is centered around the ancient formula of{' '}
						<span className="font-bold">study</span>,{' '}
						<span className="font-bold">work</span>,{' '}
						<br className="hidden xl:block" />&{' '}
						<span className="font-bold">prayer</span>.
					</div>
					<div className=" container flex w-full flex-col place-content-between gap-8 text-center lg:w-2/3 lg:gap-0 lg:text-left">
						<div className="flex flex-col items-center gap-8 lg:flex-row">
							<div className="flex h-20 w-20 items-center justify-center rounded-full border-4 bg-gray-400">
								<StudyIcon className="h-12 w-12 text-gray-100" />
							</div>
							<p className="flex-1 text-lg md:text-xl">
								Studies in Via consists of seminars featuring the ancient
								literary and philosophical traditions of Israel, Babylon,
								Greece, and early Christianity.
							</p>
						</div>
						<div className="flex flex-col items-center gap-8 lg:flex-row">
							<div className="flex h-20 w-20 items-center justify-center rounded-full border-4 bg-gray-400">
								<WorkIcon className="h-12 w-12 text-gray-100" />
							</div>
							<p className="flex-1 text-lg md:text-xl">
								Work consists of apprenticeships with Catholic professionals who
								are dedicated to preparing participants for success in their
								respective career paths of interest.
							</p>
						</div>
						<div className="flex flex-col items-center gap-8 lg:flex-row">
							<div className="flex h-20 w-20 items-center justify-center rounded-full border-4 bg-gray-400">
								<PrayIcon className="h-12 w-12 text-gray-100" />
							</div>
							<p className="flex-1 text-lg md:text-xl">
								Prayer consists of frequent time in silent prayer, spiritual
								reading, and the sacraments under the guidance of spiritual
								directors.
							</p>
						</div>
					</div>
				</div>
				<div className="flex h-72 lg:hidden">
					<ImageSlider
						className="flex-1"
						timeInterval={5000}
						images={aboutImages}
						// rightFade={true}
					/>
				</div>
				<div className="hidden h-72 flex-row gap-0 lg:flex">
					<ImageOverlay
						src="/img/study.jpg"
						alt="Via at Study"
						className="flex-1 "
						imageClass="object-cover"
						gradientClass="bg-gradient-to-r from-gray-500/80 to-blue-500/30"
					/>
					<ImageOverlay
						src="/img/work.jpg"
						alt="Via at Work"
						className="flex-1 object-cover"
					/>
					<ImageOverlay
						src="/img/pray.jpg"
						alt="Via at Prayer"
						className="flex-1 object-cover"
					/>
				</div>
			</section>
			<section className="mb-20">
				<div className="container mx-auto w-fit space-y-4 p-2 text-center md:p-8">
					<h3 className="text-2xl font-light md:text-4xl md:leading-[2.7rem]">
						“Let him that would move the world, first move himself.”
					</h3>
					<p className=" text-lg  md:text-right md:text-2xl">- Socrates</p>
				</div>
			</section>
			<section id="" className="w-full bg-background-img">
				<div className="flex flex-col flex-wrap lg:container  lg:flex-row lg:pr-0">
					<div className="container px-6 py-12 md:px-8  lg:w-2/3 lg:flex-1 lg:pr-4">
						<div className=" text-gray-100">
							{/* <h2 className="pb-8 text-center text-2xl font-light md:text-3xl">
								The richness of life at Via
							</h2> */}
							<p className="pb-12 text-center text-base font-light md:text-xl">
								This life of study, work, and prayer aims to provide
								participants with a simple but very full life, experienced in a
								community of people who desire largely the same things, namely:
								{/* is the fullness of Catholics with various backgrounds
								<br className="hidden lg:block" /> coming together with a shared
								desire for largely the same things: */}
							</p>
							<ul className="m-auto grid list-disc grid-flow-row grid-cols-1 gap-y-6 px-4 text-sm font-light md:grid-cols-2 md:gap-x-24 md:px-12 md:text-xl">
								<li>
									Knowledge of oneself,
									<br className="hidden lg:block" /> the world, and God
								</li>
								<li>
									Habits of order
									<br className="hidden lg:block" />
									and self-mastery
								</li>
								<li>
									Meaningful work <br className="hidden lg:block" />
									in a potential career
								</li>
								<li>
									An abiding love of God
									<br className="hidden lg:block" /> and neighbor
								</li>
								<li>
									A deep capacity for
									<br className="hidden lg:block" /> prayer and meditation
								</li>
								<li>
									Freedom from vice
									<br className="hidden lg:block" /> and attachment
								</li>
								<li>
									An ability to share
									<br className="hidden lg:block" /> the faith with confidence
								</li>
								<li>
									A clear understanding
									<br className="hidden lg:block" /> of one's calling
								</li>
							</ul>
						</div>
					</div>
					<ImageSlider
						className="h-[350px] max-h-[1000px] w-full overflow-hidden lg:h-auto lg:w-1/3 lg:flex-1"
						timeInterval={5000}
						images={images}
						// rightFade={true}
					/>
				</div>
			</section>
			<section className="pb-0 pt-8 lg:pt-16" id="contact">
				<div className="container p-6 md:p-8">
					<div className="mb-10 grid grid-cols-1 gap-10 md:grid-cols-3">
						<Dialog>
							<DialogTrigger asChild className="cursor-pointer">
								<div className="active group flex flex-col place-items-center gap-2 focus-visible:outline-none">
									<h3 className="font-serif text-2xl">Apply to Via</h3>
									{/* <div className="rounded-full border-4 border-background-img p-4 group-hover:border-slate-500 group-focus-visible:border-slate-500">
										<Icon
											name="file-text"
											className="h-12 w-12 group-hover:text-slate-500 group-focus-visible:text-slate-500"
										/>
									</div> */}
									<div className="flex h-20 w-20 items-center justify-center rounded-full border-4 bg-gray-400 group-hover:bg-slate-500">
										<Icon
											name="file-text"
											className="h-12 w-12 text-gray-100"
										/>
									</div>
									<p className="text-pretty text-center text-lg font-light leading-8">
										Begin the application process to be a part of Via's
										2024-2025 cohort.
									</p>
								</div>
							</DialogTrigger>
							<DialogContent className="container rounded-lg border border-slate-500 bg-slate-300 p-8 sm:max-w-[425px]">
								<ApplyForm />
							</DialogContent>
						</Dialog>
						<Dialog>
							<DialogTrigger asChild className="cursor-pointer">
								<div className="active group flex flex-col place-items-center gap-2 focus-visible:outline-none">
									<h3 className="font-serif text-2xl">Support Us</h3>
									<div className="flex h-20 w-20 items-center justify-center rounded-full border-4 bg-gray-400 group-hover:bg-slate-500">
										{/* <Icon name="trash" className="h-12 w-12 text-gray-100" /> */}
										<GiftIcon className="h-12 w-12 text-gray-100" />
									</div>
									{/* <div className="rounded-full border-4 border-background-img p-4 group-hover:border-slate-500 group-focus-visible:border-slate-500">
										<Icon
											name="trash"
											className="h-12 w-12 group-hover:text-slate-500 group-focus-visible:text-slate-500"
										/>
									</div> */}
									<p className="text-pretty text-center text-lg font-light leading-8">
										Support Via through prayer, a donation, or both.
									</p>
								</div>
							</DialogTrigger>
							<DialogContent className="container rounded-lg border border-slate-500 bg-slate-300 p-8 sm:max-w-[425px]">
								<SupportForm />
							</DialogContent>
						</Dialog>
						<Dialog>
							<DialogTrigger asChild className="cursor-pointer">
								<div className="active group flex flex-col place-items-center gap-2 focus-visible:outline-none">
									<h3 className="font-serif text-2xl">Learn More</h3>
									{/* <div className="rounded-full border-4 border-background-img p-4 group-hover:border-slate-500 group-focus-visible:border-slate-500">
										<Icon
											name="magnifying-glass"
											className="h-12 w-12 group-hover:text-slate-500 group-focus-visible:text-slate-500"
										/>
									</div> */}
									<div className="flex h-20 w-20 items-center justify-center rounded-full border-4 bg-gray-400 group-hover:bg-slate-500">
										<Icon
											name="magnifying-glass"
											className="h-12 w-12 text-gray-100"
										/>
									</div>
									<p className="text-pretty text-center text-lg font-light leading-8">
										Request more information about Via.
									</p>
								</div>
							</DialogTrigger>
							<DialogContent className="container rounded-lg border border-slate-500 bg-slate-300 p-8 sm:max-w-[425px]">
								<InquiryForm />
							</DialogContent>
						</Dialog>
					</div>
					{/* <Tab.Group selectedIndex={selectedIndex} onChange={setSelectedIndex}>
						<Tab.List className="mb-10 grid grid-cols-1 gap-10 md:grid-cols-3">
							<Tab data-headlessui-state="selected" className="hidden"></Tab>
							<Tab className="active group flex flex-col place-items-center gap-2 focus-visible:outline-none">
								<h3 className="font-sans text-2xl">Apply to Via</h3>
								<div className="rounded-full border-4 border-background-img p-4 group-hover:border-slate-500 group-focus-visible:border-slate-500">
									<Icon
										name="file-text"
										className="h-12 w-12 group-hover:text-slate-500 group-focus-visible:text-slate-500"
									/>
								</div>
								<p className="text-lg font-light leading-8 text-center">
									Begin the application process to be a part of Via's 2024-2025
									cohort.
								</p>
							</Tab>
							<Tab className="active group flex flex-col place-items-center gap-2 focus-visible:outline-none">
								<h3 className="font-sans text-2xl">Support Us</h3>
								<div className="rounded-full border-4 border-background-img p-4 group-hover:border-slate-500 group-focus-visible:border-slate-500">
									<Icon
										name="trash"
										className="h-12 w-12 group-hover:text-slate-500 group-focus-visible:text-slate-500"
									/>
								</div>
								<p className="text-lg font-light leading-8 text-center">
									Support Via through prayer, a donation, or both.
								</p>
							</Tab>
							<Tab className="active group flex flex-col place-items-center gap-2 focus-visible:outline-none">
								<h3 className="font-sans text-2xl">Learn More</h3>
								<div className="rounded-full border-4 border-background-img p-4 group-hover:border-slate-500 group-focus-visible:border-slate-500">
									<Icon
										name="magnifying-glass"
										className="h-12 w-12 group-hover:text-slate-500 group-focus-visible:text-slate-500"
									/>
								</div>
								<p className="text-lg font-light leading-8 text-center">
									Request more information about Via.
								</p>
							</Tab>
						</Tab.List>
						<div className="mx-auto flex w-full justify-center px-4 pt-8 md:px-0">
							<Tab.Panels className="mx-auto w-fit">
								<Tab.Panel></Tab.Panel>
								<Tab.Panel>
									<ApplyForm />
								</Tab.Panel>
								<Tab.Panel>
									<SupportForm />
								</Tab.Panel>
								<Tab.Panel>
									<InquiryForm />
								</Tab.Panel>
							</Tab.Panels>
						</div>
					</Tab.Group> */}
				</div>
			</section>
			<section className="flex flex-col space-y-4 bg-background pb-4 xl:px-20">
				<EmployeeCarousel />
			</section>
		</main>
	)
}

type ImageOverlayProps = {
	src: string
	alt: string
	children?: React.ReactNode
	className?: string
	imageClass?: string
	gradientClass?: string
	rightFade?: boolean
	leftFade?: boolean
}

function ImageOverlay({
	src,
	alt,
	children,
	className,
	imageClass,
	gradientClass,
	rightFade,
	leftFade,
}: ImageOverlayProps) {
	// Default gradient logic
	const defaultGradient = 'bg-gradient-to-r from-slate-700/80 to-blue-500/30'

	// Adjusting gradient based on leftFade and rightFade flags
	if (rightFade && leftFade) {
		gradientClass = 'bg-gradient-to-l from-transparent via-black to-transparent'
	} else if (rightFade) {
		gradientClass = 'bg-gradient-to-l from-black to-transparent'
	} else if (leftFade) {
		gradientClass = 'bg-gradient-to-r from-black to-transparent'
	} else {
		gradientClass = gradientClass || defaultGradient
	}

	return (
		<div className={cn('relative', className)}>
			<img
				src={src}
				alt={alt}
				className={cn(
					'absolute inset-0 left-1/2 top-1/2 h-full w-full -translate-x-1/2 -translate-y-1/2 transform object-cover',
					imageClass,
				)}
			/>
			<div className={cn('absolute inset-0 py-10', gradientClass)}></div>
			<div className="absolute left-0 top-0 z-10 h-full w-screen py-10 text-lg">
				{children}
			</div>
		</div>
	)
}

const ImageSlider = ({
	images,
	timeInterval,
	className,
	leftFade,
	rightFade,
}: {
	images: string[]
	timeInterval?: number
	className?: string
	leftFade?: boolean
	rightFade?: boolean
}) => {
	const [index, setIndex] = useState(0)

	useEffect(() => {
		const interval = setInterval(() => {
			setIndex(current => (current + 1) % images.length)
		}, timeInterval || 3000)
		return () => clearInterval(interval)
	}, [images.length, timeInterval])

	// Determine gradient based on leftFade and rightFade
	//
	const gradientClass = cn({
		'bg-gradient-to-r from-background-img from-20% via-transparent via-80% to-background-img':
			rightFade && leftFade,
		'bg-gradient-to-r from-transparent from-80% to-background-img':
			rightFade && !leftFade,
		'bg-gradient-to-l from-transparent from-80% to-background-img':
			leftFade && !rightFade,
	})

	return (
		<div className={cn('relative', className)}>
			<AnimatePresence>
				<div
					className={cn(['absolute inset-0 z-40  py-10', gradientClass])}
				></div>
				<motion.div
					key={images[index]}
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					exit={{ opacity: 0 }}
					transition={{ duration: 1.5 }}
					className={cn('absolute inset-0')}
				>
					<img
						src={images[index]}
						alt={`Slide ${index}`}
						className="absolute inset-0 h-full w-full  object-cover"
					/>
				</motion.div>
			</AnimatePresence>
		</div>
	)
}
