import type { MetadataRoute } from 'next'

const BASE_URL = 'https://reactqrcode.com'
const DEFAULT_OPTIONS = {
  lastModified: new Date(),
  changeFrequency: 'monthly' as const,
}
const PAGES = [
  { path: '', priority: 1 },
  { path: '/installation', priority: 0.8 },
  { path: '/quick-start', priority: 0.8 },
  { path: '/demo', priority: 0.9 },
  { path: '/react-qr-code-props', priority: 0.7 },
  { path: '/data-modules-settings', priority: 0.7 },
  { path: '/finder-pattern-outer-settings', priority: 0.7 },
  { path: '/finder-pattern-inner-settings', priority: 0.7 },
  { path: '/gradient-settings', priority: 0.7 },
  { path: '/image-settings', priority: 0.7 },
  { path: '/ref-api', priority: 0.7 },
  { path: '/examples/basic', priority: 0.7 },
  { path: '/examples/data-modules', priority: 0.7 },
  { path: '/examples/finder-patterns', priority: 0.7 },
  { path: '/examples/background', priority: 0.7 },
  { path: '/examples/image', priority: 0.7 },
  { path: '/examples/download', priority: 0.7 },
]

export default function sitemap(): MetadataRoute.Sitemap {
  return PAGES.map(({ path, priority }) => ({
    url: `${BASE_URL}${path}`,
    priority,
    ...DEFAULT_OPTIONS,
  }))
}
