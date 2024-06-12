import QrCodeWithLogo from 'qrcode-with-logos'

export default function Qrcode() {
	if (typeof document === 'undefined') {
		// running in a server environment
	} else {
		new QrCodeWithLogo({
			canvas: document.getElementById('canvas') as HTMLCanvasElement,
			content: 'https://via.studyworkpray.org/',
			width: 480,
			//   download: true,
			// image: document.getElementById('image') as HTMLImageElement,
			logo: {
				src: './img/compass.png',
				// logoSize: 0.2,
			},
		})
	}

	return (
		<div className="mt-10 flex flex-row place-content-center">
			{/* <img src="" alt="" id="image" /> */}
			<canvas id="canvas"></canvas>
		</div>
	)
}
