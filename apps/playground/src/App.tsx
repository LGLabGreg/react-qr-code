import { ReactQRCode, ReactQRCodeProps } from '@lglab/react-qr-code';

function App() {
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
      style: 'classy',
    },
    finderPatternInnerSettings: {
      color: '#ee964b',
    },
    imageSettings: {
      src: 'https://jd279l8p5w.ufs.sh/f/9xWilHEwGmJB6M4WMqmNVvfeTgSFGJm94uCp2xbtk87Zs1a3',
      width: 60,
      height: 60,
      excavate: true,
    },
  };
  return (
    <div className='max-w-7xl mx-auto px-5 py-8 flex flex-col items-center'>
      <h1 className='text-4xl font-medium mb-8'>React QR Code</h1>
      <ReactQRCode {...qrCodeOptions} />
    </div>
  );
}

export default App;
