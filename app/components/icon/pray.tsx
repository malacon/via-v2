import * as React from 'react'
import { type JSX } from 'react/jsx-runtime'

function PrayIcon(
	props: JSX.IntrinsicAttributes & React.SVGProps<SVGSVGElement>,
) {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width={24}
			height={24}
			viewBox="0 0 24 24"
			{...props}
		>
			<path fill="currentColor" d="M10.5 2h3v6H19v3h-5.5v11h-3V11H5V8h5.5V2z" />
		</svg>
	)
}

export default PrayIcon
