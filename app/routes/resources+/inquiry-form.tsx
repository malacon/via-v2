import { getFormProps, getInputProps, useForm } from '@conform-to/react'
import { getZodConstraint, parseWithZod } from '@conform-to/zod'
import { json, type ActionFunctionArgs } from '@remix-run/node'
import { useActionData, useFetcher, type MetaFunction } from '@remix-run/react'
import * as React from 'react'
import { z } from 'zod'
import { Field, TextareaField } from '#app/components/forms.js'
import { StatusButton } from '#app/components/ui/status-button.js'
import { sendEmail } from '#app/utils/email.server.js'
import { redirectWithToast } from '#app/utils/toast.server.js'
import {
	EmailSchema,
	MessageSchema,
	NameSchema,
} from '#app/utils/user-validation.js'

const ACTION = '/resources/inquiry-form'

export const meta: MetaFunction = () => {
	return [{ title: 'Contact Us :: VIA NOVA' }]
}

const InquirySchema = z.object({
	name: NameSchema,
	email: EmailSchema,
	message: MessageSchema,
})

export async function action({ request }: ActionFunctionArgs) {
	const formData = await request.formData()
	const submission = await parseWithZod(formData, {
		schema: InquirySchema,
	})

	if (submission.status !== 'success') {
		return json(
			{ results: submission.reply({ formErrors: [] }) },
			{ status: submission.status === 'error' ? 400 : 200 },
		)
	}

	const response = await sendEmail({
		to: process.env.SEND_EMAIL,
		subject: 'VIA::Inquiry Form Submission',
		text: `
	New inquiry from ${submission.payload.name} (${submission.payload.email})
	${submission.payload.message}
`,
		html: `<div>
New inquiry from ${submission.payload.name} (${submission.payload.email})<br />

Message: ${submission.payload.message}
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

export default function InquiryForm({
	formSuccess,
}: {
	formSuccess: React.Dispatch<React.SetStateAction<boolean>>
}) {
	const fetcher = useFetcher<typeof action>()
	const actionData = useActionData<typeof action>()
	const [form, fields] = useForm({
		id: 'change-email-form',
		constraint: getZodConstraint(InquirySchema),
		lastResult: actionData?.results,
		onValidate({ formData }) {
			return parseWithZod(formData, { schema: InquirySchema })
		},
	})

	React.useEffect(() => {
		if (fetcher.state === 'loading') {
			formSuccess(false)
		}
	}, [fetcher.state, formSuccess])

	return (
		<div className="w-full">
			<h3 className="pb-6 font-serif text-2xl">Learn More</h3>
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
				<TextareaField
					className="w-full"
					labelProps={{
						children: 'How did you hear about us?',
						className: 'text-base font-light leading-8',
					}}
					textareaProps={{
						name: 'message',
						placeholder: 'Your message',
					}}
					errors={fields.message.errors}
				/>
				<StatusButton
					type="submit"
					className="w-full bg-slate-500 font-light leading-8 text-white"
					status="idle"
				>
					Send Message
				</StatusButton>
			</fetcher.Form>
		</div>
	)
}
