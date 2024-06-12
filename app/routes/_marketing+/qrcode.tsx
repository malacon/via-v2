import QrCodeWithLogo from 'qrcode-with-logos'

import compass from './public/img/compass.png'

export default function Qrcode() {
	if (typeof document === 'undefined') {
		// running in a server environment
	} else {
		let qrcode = new QrCodeWithLogo({
			// canvas: document.getElementById('canvas') as HTMLCanvasElement,
			content: 'https://via.studyworkpray.org/',
			width: 480,
			//   download: true,
			image: document.getElementById('image') as HTMLImageElement,
			logo: {
				src: './public/img/compass.png',
				// logoSize: 0.2,
			},
		})
	}

	return (
		<div className="mt-10 flex flex-row place-content-center">
			<img src="" alt="" id="image" />
		</div>
	)
}
