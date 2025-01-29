import {
	type FinderPatternInnerStyle,
	type FinderPatternOuterStyle,
	ReactQRCode,
	type ReactQRCodeProps,
} from '@lglab/react-qr-code';
import { useState } from 'react';

import { Select } from './components/ui/select';
import {
	FINDER_PATTERN_INNER_STYLES,
	FINDER_PATTERN_OUTER_STYLES,
} from './constants';

function App() {
	const [finderPatternOuterStyle, setFinderPatternOuterStyle] =
		useState<FinderPatternOuterStyle>('square');
	const [finderPatternInnerStyle, setFinderPatternInnerStyle] =
		useState<FinderPatternInnerStyle>('square');

	const qrCodeOptions: ReactQRCodeProps = {
		value: 'https://github.com/LGLabGreg/react-qr-code.git',
		size: 400,
		marginSize: 3,
		bgColor: '#f1f1f1',
		dataModulesSettings: {
			color: '#16697a',
		},
		finderPatternOuterSettings: {
			color: '#16697a',
			style: finderPatternOuterStyle,
		},
		finderPatternInnerSettings: {
			color: '#ee964b',
			style: finderPatternInnerStyle,
		},
		imageSettings: {
			src: 'https://jd279l8p5w.ufs.sh/f/9xWilHEwGmJB6M4WMqmNVvfeTgSFGJm94uCp2xbtk87Zs1a3',
			width: 60,
			height: 60,
			excavate: true,
		},
	};
	return (
		<div className="max-w-7xl mx-auto px-5 py-8 flex flex-col items-center">
			<div>
				<h1 className="text-4xl font-semibold mb-8 text-center">
					React QR Code
				</h1>
				<form className="flex flex-col items-start mb-5 space-y-4">
					<Select
						{...{
							label: 'Finder Pattern Outer Style',
							options: FINDER_PATTERN_OUTER_STYLES,
							value: finderPatternOuterStyle,
							onChange: (e) => {
								setFinderPatternOuterStyle(
									e.target.value as FinderPatternOuterStyle,
								);
							},
						}}
					/>
					<Select
						{...{
							label: 'Finder Pattern Inner Style',
							options: FINDER_PATTERN_INNER_STYLES,
							value: finderPatternInnerStyle,
							onChange: (e) => {
								setFinderPatternInnerStyle(
									e.target.value as FinderPatternInnerStyle,
								);
							},
						}}
					/>
				</form>

				<ReactQRCode {...qrCodeOptions} />
			</div>
		</div>
	);
}

export default App;
