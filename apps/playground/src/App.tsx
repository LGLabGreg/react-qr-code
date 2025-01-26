import { ReactQRCode } from '@lglab/react-qr-code';

function App() {
  return (
    <div className='max-w-7xl mx-auto text-center px-5 py-8'>
      <h1 className='text-4xl font-medium mb-8'>React QR Code</h1>
      <ReactQRCode data='QR Code data' />
    </div>
  );
}

export default App;
