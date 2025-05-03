import { type LoaderFunctionArgs, json } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import ImageOverlay from '#app/components/image-overlay.tsx'
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from '#app/components/ui/accordion.tsx'

type Faq = {
	title: string
	answer: string
	img?: string
}
const faqs: Faq[] = [
	// {
	// 	title: 'Is this a school?',
	// 	answer:
	// 		'In so far as learning and growth occur, yes, Via is a school.  However, the academic formation is only one of several parts of the overall experience, so we think of it as a formation program or a bridge year.',
	// },
	// {
	// 	title: 'What are the ages of Via Fellows?',
	// 	answer:
	// 		"Fellows applying to the 2025-2026 cohort should be between ages 18 and 21 by August 2024.  Some of Via's current Fellows graduated from high school the spring prior to beginning the program, while others were already full-time university students before beginning Via.",
	// },
	{
		title: 'How old do I need to be to apply to Via?',
		answer:
			'Fellows applying to the 2025-2026 cohort should be between ages 18 and 22 by August of 2025.',
	},
	{
		title: 'Is Via co-ed?',
		answer:
			"Via has both a men's cohort and a women's cohort. Each cohort has their own house but the cohorts come together for most of the week's events.",
	},
	{
		title: 'What does a typical week look like at Via?',
		answer: 'Below is an example of a typical week at Via.',
		img: '/img/weekly-schedule.png',
	},
	{
		title: 'What do Via Fellows study?',
		answer:
			'Via’s seminars focus on the foundations of Western civilization, featuring the literature and philosophy of ancient Israel, Babylon, Greece, Rome, and Christianity.  Major attention is given throughout the year to the Old Testament, the Homeric epics, the philosophy of Plato and Aristotle, selected readings from various Latin poets and philosophers, the New Testament, and the Church Fathers.',
	},
	{
		title: 'How much does it cost?',
		answer:
			"Regarding costs for the year, the program of Via itself does not cost money.  We believe that the experience of Via is so important that financial barriers should be removed as much as possible to make the formation of Via happen.  The experience of Via is a gift to equip the future of the church for a life of self-gift back to the church.  However, the Fellows do pay for rent and have the normal personal expenses of a college student (e.g. food, phone bill, gas, etc.).  Fellows' food expenses are offset by a few things Via covers, namely: communal meals, meals at events, some standard grocery items like milk and eggs, and the meal prep option.  The meal prep option refers to the opportunity each Fellow has to prepare meals each weekend for the week ahead using funds from a donation pool.",
	},
]

export async function loader({ request }: LoaderFunctionArgs) {
	return json({ faqs })
}

export default function FAQRoute() {
	const { faqs } = useLoaderData<typeof loader>()

	return (
		<section id="faq" className="bg-section relative min-h-[1250px]">
			<ImageOverlay src="/img/via4.png" position="46% 78%" opacity="0.0" />
			<div className="relative z-20 mx-auto flex w-[800px] flex-col space-y-10 p-6 font-serif md:p-12">
				<Accordion type="single" collapsible className="w-full">
					{faqs.map(({ answer, img, title }) => (
						<AccordionItem key={title} value={title}>
							<AccordionTrigger className="pb-8 font-serif text-3xl">
								{title}
							</AccordionTrigger>
							<AccordionContent className="text-2xl leading-8">
								{answer}
								{img ? <img src={img} alt="schedule" /> : null}
							</AccordionContent>
						</AccordionItem>
					))}
				</Accordion>
			</div>
		</section>
	)
}
