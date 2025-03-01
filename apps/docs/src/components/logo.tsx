import Link from 'next/link'

export const LogoSVG = () => (
  <svg
    fill='#000000'
    width='200px'
    height='200px'
    viewBox='0 0 24 24'
    xmlns='http://www.w3.org/2000/svg'
  >
    <path
      id='secondary'
      d='M12,13v4a1,1,0,0,1-1,1H7a1,1,0,0,1-1-1V13a1,1,0,0,1,1-1h4A1,1,0,0,1,12,13ZM7,10H9a1,1,0,0,0,1-1V7A1,1,0,0,0,9,6H7A1,1,0,0,0,6,7V9A1,1,0,0,0,7,10Zm10,4H15a1,1,0,0,0-1,1v2a1,1,0,0,0,1,1h2a1,1,0,0,0,1-1V15A1,1,0,0,0,17,14Zm0-8H13a1,1,0,0,0-1,1v4a1,1,0,0,0,1,1h4a1,1,0,0,0,1-1V7A1,1,0,0,0,17,6Z'
      fill='#00C2CB'
    ></path>
    <path
      id='primary'
      d='M21,9a1,1,0,0,1-1-1V4H16a1,1,0,0,1,0-2h4a2,2,0,0,1,2,2V8A1,1,0,0,1,21,9Zm1,11V16a1,1,0,0,0-2,0v4H16a1,1,0,0,0,0,2h4A2,2,0,0,0,22,20ZM4,8V4H8A1,1,0,0,0,8,2H4A2,2,0,0,0,2,4V8A1,1,0,0,0,4,8ZM9,21a1,1,0,0,0-1-1H4V16a1,1,0,0,0-2,0v4a2,2,0,0,0,2,2H8A1,1,0,0,0,9,21Z'
      fill='#000'
    ></path>
  </svg>
)

export const Logo = () => (
  <Link href='/' className='flex items-center gap-1 [&>svg]:w-[36px] [&>svg]:h-[36px]'>
    <LogoSVG />
    <span className='text-xl font-semibold'>React QR Code</span>
  </Link>
)
