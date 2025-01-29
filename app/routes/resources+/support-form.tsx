import { getFormProps, getInputProps, useForm } from '@conform-to/react'
import { getZodConstraint, parseWithZod } from '@conform-to/zod'
import { json, type ActionFunctionArgs } from '@remix-run/node'
import { useActionData, useFetcher, type MetaFunction } from '@remix-run/react'
import * as React from 'react'
import { z } from 'zod'
import { Field } from '#app/components/forms.js'
import { Button } from '#app/components/ui/button.js'
import { Separator } from '#app/components/ui/separator.js'
import { StatusButton } from '#app/components/ui/status-button.js'
import { sendEmail } from '#app/utils/email.server.js'
import { redirectWithToast } from '#app/utils/toast.server.js'
import { EmailSchema, NameSchema } from '#app/utils/user-validation.js'

const ACTION = '/resources/support-form'

export const meta: MetaFunction = () => {
	return [{ title: 'Contact Us :: VIA NOVA' }]
}

const SupportSchema = z.object({
	name: NameSchema,
	email: EmailSchema,
})

export async function action({ request }: ActionFunctionArgs) {
	const formData = await request.formData()
	const submission = await parseWithZod(formData, {
		schema: SupportSchema,
	})

	if (submission.status !== 'success') {
		return json(
			{ results: submission.reply({ formErrors: [] }) },
			{ status: submission.status === 'error' ? 400 : 200 },
		)
	}

	const response = await sendEmail({
		to: process.env.SEND_EMAIL,
		subject: 'VIA::Support Form Submission',
		text: `
	New support from ${submission.payload.name} (${submission.payload.email})
	I would like to pray for you!
`,
		html: `<div>
New support from ${submission.payload.name} (${submission.payload.email})<br />

Message: I would like to pray for you!
</div>`,
	})

	if (response.status === 'success') {
		return redirectWithToast('/', {
			title: 'Success!',
			description: 'Your message has been sent.',
		})
	} else {
		return json(
			{ results: submission.reply({ formErrors: [response.error.message] }) },
			{ status: 400 },
		)
	}
}

export default function SupportForm({
	formSuccess,
}: {
	formSuccess: React.Dispatch<React.SetStateAction<boolean>>
}) {
	const fetcher = useFetcher<typeof action>()
	const actionData = useActionData<typeof action>()
	const [form, fields] = useForm({
		id: 'change-email-form',
		constraint: getZodConstraint(SupportSchema),
		lastResult: actionData?.results,
		onValidate({ formData }) {
			return parseWithZod(formData, { schema: SupportSchema })
		},
	})

	React.useEffect(() => {
		if (fetcher.state === 'loading') {
			formSuccess(false)
		}
	}, [fetcher.state, formSuccess])

	return (
		<div className="w-full">
			<h3 className="pb-6 font-serif text-2xl">Support Us</h3>
			<div className="flex w-full flex-col justify-center gap-1">
				<p>To go straight to our giving page, please click the button below.</p>
				<Button asChild size="lg" variant="default" className="text-xl">
					<a
						target="_blank"
						className="text-2xl"
						href="https://vianova.stellarwebsystems.com/donations/pool/79bdb7d4-264e-11ee-9cac-16118fddfe69"
						rel="noreferrer"
					>
						Give Now
					</a>
				</Button>
			</div>
			<Separator className="my-2" />
			<p className="pb-8">
				If you would like to support us through prayer, we would love to add you
				to our prayer intentions mailing list. Please fill out your information
				below so we can keep you posted on our prayer intentions.
			</p>
			<fetcher.Form
				method="post"
				action={ACTION}
				{...getFormProps(form)}
				className=" text-lg font-light leading-8"
			>
				<Field
					className="w-full"
					labelProps={{
						children: 'Name',
						className: 'text-base font-light leading-8',
					}}
					inputProps={{
						...getInputProps(fields.name, { type: 'text' }),
						placeholder: 'Your name',
					}}
					errors={fields.name.errors}
				/>
				{/* <ErrorList id={form.errorId} errors={form.errors} /> */}
				<Field
					className="w-full"
					labelProps={{
						children: 'Email',
						className: 'text-base font-light leading-8',
					}}
					inputProps={{
						name: 'email',
						placeholder: 'Your email',
						type: 'email',
					}}
					errors={fields.email.errors}
				/>
				<StatusButton
					type="submit"
					className="w-full bg-slate-500 font-light leading-8 text-white"
					status="idle"
				>
					Join Via's Prayer Team
				</StatusButton>
			</fetcher.Form>
		</div>
	)
}
