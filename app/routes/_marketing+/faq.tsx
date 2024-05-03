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
	{
		title: 'What are the ages of Via Fellows?',
		answer:
			"Fellows applying to the 2024-2025 cohort should be between ages 18 and 21 by August 2024.  Some of Via's current Fellows graduated from high school the spring prior to beginning the program, while others were already full-time university students before beginning Via.",
	},
	{
		title: 'Is Via Catholic?',
		answer:
			'We believe that the Catholic Church is the Church founded by Christ Jesus. All of Via’s leadership and staff members are practicing Roman Catholics.',
	},
	{
		title: 'Is it co-ed?',
		answer:
			"Via has both a men's house and a women's house.  The men's and the women's cohorts come together for all of the seminars, and for all of the community events.",
	},
	{
		title: 'What does a typical week look like at Via?',
		answer: 'Below is an example of a typical week at Via.',
		img: '/img/weekly-schedule.png',
	},
	{
		title: 'What do Via Fellows study?',
		answer:
			'Via’s seminars focus on the foundations of Western civilization, featuring the literature and philosophy of ancient Babylon, Israel, Greece, Rome, and Christianity.',
	},
	{
		title: 'How much does it cost?',
		answer:
			'All of Via’s costs are covered by the generous donations of members of the wider Church.  Because Fellows’ formation is ultimately aimed at entering a life of service for the wider Church community, we believe their formation should be provided for by the wider Church community.',
	},
]

export async function loader({ request }: LoaderFunctionArgs) {
	return json({ faqs })
}

export default function FAQRoute() {
	const { faqs } = useLoaderData<typeof loader>()

	return (
		<section id="faq" className="relative min-h-[1250px] bg-section">
			<ImageOverlay src="/img/via4.png" position="46% 78%" opacity="0.0" />
			<div className="relative z-20 mx-auto flex w-[800px] flex-col space-y-10 p-6 md:p-12">
				<Accordion type="single" collapsible className="w-full">
					{faqs.map(({ answer, img, title }) => (
						<AccordionItem key={title} value={title}>
							<AccordionTrigger className="pb-8 font-title text-3xl">
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
