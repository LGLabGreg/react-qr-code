import {
  type DataModulesStyle,
  type FinderPatternInnerStyle,
  type FinderPatternOuterStyle,
  ReactQRCode,
  type ReactQRCodeProps,
} from '@lglab/react-qr-code'
import { useState } from 'react'

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

  const qrCodeOptions: ReactQRCodeProps = {
    value: 'https://github.com/LGLabGreg/react-qr-code.git',
    size: 500,
    marginSize: 3,
    bgColor: '#f1f1f1',
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
    },
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
        </div>
        <ReactQRCode {...qrCodeOptions} />
      </div>
    </div>
  )
}

export default App
