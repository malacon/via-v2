import { Tab } from '@headlessui/react'
import { type MetaFunction } from '@remix-run/node'
import { AnimatePresence, motion } from 'framer-motion'
import React, { useEffect, useState } from 'react'
import EmployeeCarousel from '#app/components/employee-carousel.js'
import PrayIcon from '#app/components/icon/pray.js'
import StudyIcon from '#app/components/icon/study.js'
import WorkIcon from '#app/components/icon/work.js'
import { Icon } from '#app/components/ui/icon.js'
import { cn } from '#app/utils/misc.js'

export const meta: MetaFunction = () => [{ title: 'Via Nova' }]

export default function Index() {
	const images = ['/img/poetry.jpg', '/img/discuss.jpg']
	const [selectedIndex, setSelectedIndex] = useState<undefined | number>(
		undefined,
	)

	return (
		<main>
			<section className="mb-28 bg-background-muted text-background">
				<ImageOverlay
					src="/img/mountain-help.jpg"
					alt="Descriptive Alt Text"
					className="w-screen overflow-hidden md:h-[640px] lg:h-[480px]"
				>
					<div className="container space-y-10 ">
						<p className=" w-1/3">
							Via Nova offers a 10-month, live-in experience of intensive
							intellectual, professional, and spiritual formation for Catholics
							ages 18-21. Formation at Via Nova is centered in the ancient
							formula of <b>study</b>, <b>work</b>, & <b>prayer</b>.
						</p>
						<p className="w-1/3">
							Through seminars, apprenticeships, spiritual regimens, and more,
							Via Nova offers participants a via nova, that is, a "new way" of
							forming life-changing habits, acquiring practical knowledge, and
							ultimately enjoying a life of freedom and mission.
						</p>
					</div>
				</ImageOverlay>
			</section>
			<section className="mb-20 flex flex-col gap-24">
				<div className="container flex flex-row gap-16">
					<div className="w-1/3 text-center text-xl leading-7 text-accent-dark md:text-left md:text-6xl md:leading-[5.25rem]">
						Via Fellows live a life of <span className="font-bold">study</span>,{' '}
						<span className="font-bold">work</span>, &{' '}
						<span className="font-bold">prayer</span>.
					</div>
					<div className=" container flex w-2/3 flex-col place-content-between">
						<div className="flex flex-row items-center gap-8">
							<div className="flex h-20 w-20 items-center justify-center rounded-full border-4 bg-gray-400">
								<StudyIcon className="h-12 w-12 text-gray-100" />
							</div>
							<p className="flex-1 text-lg">
								Seminars exploring the literary and philosophical foundations of
								Western society, beginning with Ancient Israel, Greece, and
								Rome.
							</p>
						</div>
						<div className="flex flex-row items-center gap-8">
							<div className="flex h-20 w-20 items-center justify-center rounded-full border-4 bg-gray-400">
								<WorkIcon className="h-12 w-12 text-gray-100" />
							</div>
							<p className="flex-1 text-lg">
								Apprenticeships with Catholic professionals who are dedicated to
								preparing Fellows for success in their respective career path of
								interest.
							</p>
						</div>
						<div className="flex flex-row items-center gap-8">
							<div className="flex h-20 w-20 items-center justify-center rounded-full border-4 bg-gray-400">
								<PrayIcon className="h-12 w-12 text-gray-100" />
							</div>
							<p className="flex-1 text-lg">
								Frequent time in silent prayer, spiritual reading, and the
								sacraments with the guidance of spiritual directors.
							</p>
						</div>
					</div>
				</div>
				<div className="flex h-72 flex-row gap-0">
					<ImageOverlay
						src="/img/work.jpg"
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
				<div className="mx-auto w-fit space-y-4 text-center">
					<h3 className=" leading-[2.7rem  text-4xl font-light">
						“Let him that would move the world, first move himself.”
					</h3>
					<p className=" text-lg  md:text-right md:text-2xl">- Socrates</p>
				</div>
			</section>
			<section className="w-full bg-background-img">
				<div className="container flex flex-wrap pr-0">
					<div className="flex-1 py-12 pr-4 lg:w-2/3">
						<div className=" text-gray-100">
							<h2 className="pb-8 text-center text-3xl font-light">
								The richness of life at Via
							</h2>
							<p className="pb-12 text-center text-xl font-light">
								is the fullness of Catholics with various backgrounds
								<br />
								coming together with a shared desire for largely the same
								things:
							</p>
							<ul className="m-auto grid list-disc grid-flow-row grid-cols-2 gap-x-24 gap-y-6 px-12 text-xl font-light">
								<li>
									Knowledge of oneself,
									<br /> the world, and God
								</li>
								<li>
									Habits of order
									<br />
									and self-mastery
								</li>
								<li>
									Meaningful work <br />
									in a potential career
								</li>
								<li>
									An abiding love of God
									<br /> and neighbor
								</li>
								<li>
									A deep capacity for
									<br /> prayer and meditation
								</li>
								<li>
									Freedom from vice
									<br /> and attachment
								</li>
								<li>
									An ability to share
									<br /> the faith with confidence
								</li>
								<li>
									A clear understanding
									<br /> of one's calling
								</li>
							</ul>
						</div>
					</div>
					<ImageSlider
						className="flex-1 lg:w-1/3"
						timeInterval={5000}
						images={images}
						// rightFade={true}
					/>
				</div>
			</section>
			<section className="pb-0 pt-16">
				<div className="container">
					<Tab.Group selectedIndex={selectedIndex} onChange={setSelectedIndex}>
						<Tab.List className="mb-10 grid grid-cols-3 gap-10">
							<Tab data-headlessui-state="selected" className="hidden"></Tab>
							<Tab className="flex flex-col place-items-center gap-2">
								<h3 className="font-sans text-2xl">Apply to Via</h3>
								<div className=" rounded-full border-4 border-background-img p-4">
									<Icon name="file-text" className="h-12 w-12" />
								</div>
								<p className="text-lg font-light leading-8">
									Begin the application process to be a part of Via's 2024-2025
									cohort.
								</p>
							</Tab>
							<Tab className="flex flex-col place-items-center gap-2">
								<h3 className="font-sans text-2xl">Support Us</h3>
								<div className=" rounded-full border-4 border-background-img p-4">
									<Icon name="trash" className="h-12 w-12" />
								</div>
								<p className="text-lg font-light leading-8">
									Support Via through prayer, a donation, or both.
								</p>
							</Tab>
							<Tab className="flex flex-col place-items-center gap-2">
								<h3 className="font-sans text-2xl">Learn More</h3>
								<div className=" rounded-full border-4 border-background-img p-4">
									<Icon name="magnifying-glass" className="h-12 w-12" />
								</div>
								<p className="text-lg font-light leading-8">
									Request more information about Via.
								</p>
							</Tab>
						</Tab.List>
						<Tab.Panels className="mx-auto w-fit">
							<Tab.Panel></Tab.Panel>
							<Tab.Panel>Check back soon.</Tab.Panel>
							<Tab.Panel>Check back soon.</Tab.Panel>
							<Tab.Panel>Check back soon.</Tab.Panel>
						</Tab.Panels>
					</Tab.Group>
				</div>
			</section>
			<section className="flex flex-col space-y-4 bg-background px-20 pb-4  ">
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
