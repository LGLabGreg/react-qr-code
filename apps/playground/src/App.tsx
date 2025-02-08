import {
  type DataModulesStyle,
  type DownloadOptions,
  type FinderPatternInnerStyle,
  type FinderPatternOuterStyle,
  ReactQRCode,
  type ReactQRCodeProps,
  type ReactQRCodeRef,
} from '@lglab/react-qr-code'
import { useRef, useState } from 'react'

import { Select } from './components/ui/select'
import {
  DATA_MODULES_STYLES,
  FINDER_PATTERN_INNER_STYLES,
  FINDER_PATTERN_OUTER_STYLES,
} from './constants'

function App() {
  const [finderPatternOuterStyle, setFinderPatternOuterStyle] =
    useState<FinderPatternOuterStyle>('square')
  const [finderPatternInnerStyle, setFinderPatternInnerStyle] =
    useState<FinderPatternInnerStyle>('square')
  const [dataModulesStyle, setDataModulesStyle] = useState<DataModulesStyle>('square')
  const [dataModulesRandomSize, setDataModulesRandomSize] = useState<boolean>(false)

  const ref = useRef<ReactQRCodeRef>(null)

  const qrCodeOptions: ReactQRCodeProps = {
    ref,
    value: 'https://github.com/LGLabGreg/react-qr-code.git',
    size: 500,
    marginSize: 3,
    //background: '#f9f9f9',
    gradient: {
      type: 'linear',
      rotation: 0,
      stops: [
        { offset: '0%', color: '#4568DC' },
        { offset: '100%', color: '#B06AB3' },
      ],
    },
    dataModulesSettings: {
      color: '#560bad',
      style: dataModulesStyle,
      randomSize: dataModulesRandomSize,
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
      x: 100,
      y: 100,
    },
  }

  const download = ({ format = 'svg', size = 400 }: DownloadOptions) => {
    ref.current?.download({ format, size })
  }

  return (
    <div className='max-w-4xl mx-auto px-5 py-8'>
      <h1 className='text-4xl font-semibold mb-8 text-center'>React QR Code</h1>
      <div className='flex flex-row justify-between'>
        <div>
          <form className='flex flex-col items-start mb-5 space-y-4'>
            <Select
              {...{
                label: 'Finder Pattern Outer Style',
                options: FINDER_PATTERN_OUTER_STYLES,
                value: finderPatternOuterStyle,
                onChange: (e) => {
                  setFinderPatternOuterStyle(e.target.value as FinderPatternOuterStyle)
                },
              }}
            />
            <Select
              {...{
                label: 'Finder Pattern Inner Style',
                options: FINDER_PATTERN_INNER_STYLES,
                value: finderPatternInnerStyle,
                onChange: (e) => {
                  setFinderPatternInnerStyle(e.target.value as FinderPatternInnerStyle)
                },
              }}
            />
            <Select
              {...{
                label: 'Data Modules Style',
                options: DATA_MODULES_STYLES,
                value: dataModulesStyle,
                onChange: (e) => {
                  setDataModulesStyle(e.target.value as DataModulesStyle)
                },
              }}
            />
            <label className='font-medium mb-1' htmlFor='data-modules-random-size'>
              Random Data Modules Size
            </label>
            <input
              checked={dataModulesRandomSize}
              id='data-modules-random-size'
              onChange={(e) => setDataModulesRandomSize(e.target.checked)}
              type='checkbox'
            />
          </form>
          <button onClick={() => download({ format: 'svg' })}>Download SVG</button>
          <button onClick={() => download({ format: 'png' })}>Download PNG</button>
          <button onClick={() => download({ format: 'jpeg' })}>Download JPEG</button>
        </div>
        <ReactQRCode {...qrCodeOptions} />
      </div>
    </div>
  )
}

export default App
