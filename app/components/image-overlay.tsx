export default function ImageOverlay({
	src,
	position,
	opacity,
}: {
	src: string
	position?: string
	opacity?: string
}) {
	return (
		<div className="absolute inset-0 top-0 z-10 h-full w-full object-cover">
			<img
				src={src}
				className="absolute inset-0 z-10 h-full w-full object-cover"
				style={{ objectPosition: position || '50% 50%' }}
				alt="via nova"
			/>
			<div
				className="absolute bottom-0 left-0 right-0 top-0 z-30 bg-black"
				style={{ opacity: opacity || '0.2' }}
			></div>
		</div>
	)
}
