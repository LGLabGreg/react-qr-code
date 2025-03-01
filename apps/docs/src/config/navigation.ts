import type { MenuItemProps } from '@/types/navigation'

export const mainNav: MenuItemProps[] = [
  {
    title: 'Getting Started',
    url: '/',
    items: [
      {
        title: 'Overview',
        url: '/',
      },
      {
        title: 'Installation',
        url: '/installation',
      },
      {
        title: 'Quick Start',
        url: '/quick-start',
      },
      {
        title: 'Demo',
        url: '/demo',
      },
    ],
  },
  {
    title: 'API Reference',
    url: '/react-qr-code-props',
    items: [
      {
        title: 'ReactQRCode',
        url: '/react-qr-code-props',
      },
      {
        title: 'DataModulesSettings',
        url: '/data-modules-settings',
      },
      {
        title: 'FinderPatternOuterSettings',
        url: '/finder-pattern-outer-settings',
      },
      {
        title: 'FinderPatternInnerSettings',
        url: '/finder-pattern-inner-settings',
      },
      {
        title: 'GradientSettings',
        url: '/gradient-settings',
      },
      {
        title: 'ImageSettings',
        url: '/image-settings',
      },
      {
        title: 'ReactQRCodeRef',
        url: '/ref-api',
      },
    ],
  },
  {
    title: 'Examples',
    url: '/examples/basic',
    items: [
      {
        title: 'Basic',
        url: '/examples/basic',
      },
      {
        title: 'Data Modules',
        url: '/examples/data-modules',
      },
      {
        title: 'Finder Patterns',
        url: '/examples/finder-patterns',
      },
      {
        title: 'Background',
        url: '/examples/background',
      },
      {
        title: 'Image',
        url: '/examples/image',
      },
      {
        title: 'Download',
        url: '/examples/download',
      },
    ],
  },
  {
    title: 'Help',
    url: '/ref-api',
    items: [
      {
        title: 'Report issue',
        url: 'https://github.com/LGLabGreg/react-qr-code/issues',
        external: true,
      },
      {
        title: 'Request feature',
        url: 'https://github.com/LGLabGreg/react-qr-code/discussions',
        external: true,
      },
    ],
  },
]
