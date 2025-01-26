import { ReactQRCode } from '@lglab/react-qr-code';

function App() {
  return (
    <div className='max-w-7xl mx-auto px-5 py-8 flex flex-col items-center'>
      <h1 className='text-4xl font-medium mb-8'>React QR Code</h1>
      <ReactQRCode
        value='https://github.com/LGLabGreg/react-qr-code.git'
        size={400}
        bgColor='#f1f1f1'
      />
    </div>
  );
}

export default App;
