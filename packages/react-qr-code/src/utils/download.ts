import { DEFAULT_BGCOLOR } from '../constants'
import type { DownloadRasterProps, DownloadSVGProps } from '../types/utils'

// Frames make the SVG non-square, so scale the height by the viewBox aspect ratio.
export const getFileHeight = (svg: SVGSVGElement, fileSize: number) => {
  const { width, height } = svg.viewBox.baseVal ?? {}
  return width && height ? Math.round((fileSize * height) / width) : fileSize
}

const toDataURL = async (src: string, credentials: RequestCredentials) => {
  const response = await fetch(src, { credentials })
  if (!response.ok) throw new Error(`Failed to fetch ${src}: ${response.status}`)
  const blob = await response.blob()
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => resolve(reader.result as string)
    reader.onerror = () => reject(reader.error)
    reader.readAsDataURL(blob)
  })
}

// Embed linked images so the downloaded file works offline; keep the link if the fetch fails (e.g. CORS).
export const inlineImages = async (svg: SVGSVGElement) => {
  const images = Array.from(svg.querySelectorAll('image'))
  await Promise.all(
    images.map(async (image) => {
      const href = image.getAttribute('href')
      if (!href || href.startsWith('data:')) return
      try {
        const credentials =
          image.getAttribute('crossorigin') === 'use-credentials'
            ? 'include'
            : 'same-origin'
        image.setAttribute('href', await toDataURL(href, credentials))
      } catch {
        // Keep the original href
      }
    }),
  )
}

export const downloadSVG = async ({ svgRef, fileSize, fileName }: DownloadSVGProps) => {
  if (!svgRef.current) return

  const clonedSvg = svgRef.current.cloneNode(true) as SVGSVGElement
  clonedSvg.setAttribute('width', fileSize.toString())
  clonedSvg.setAttribute('height', getFileHeight(svgRef.current, fileSize).toString())
  await inlineImages(clonedSvg)

  const serializer = new XMLSerializer()
  const svgBlob = new Blob([serializer.serializeToString(clonedSvg)], {
    type: 'image/svg+xml',
  })
  const url = URL.createObjectURL(svgBlob)
  const a = document.createElement('a')
  a.href = url
  a.download = `${fileName}.svg`
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
  URL.revokeObjectURL(url)
}

export const downloadRaster = ({
  svgRef,
  fileSize,
  fileName,
  fileFormat,
  imageSettings,
  calculatedImageSettings,
  size,
  numCells,
  margin,
  frameLayout,
}: DownloadRasterProps) => {
  if (!svgRef.current) return

  const canvas = document.createElement('canvas')
  const ctx = canvas.getContext('2d')
  if (!ctx) return

  canvas.width = fileSize
  const fileHeight = getFileHeight(svgRef.current, fileSize)
  canvas.height = fileHeight

  // JPEG has no alpha channel, so transparent areas would come out black.
  if (fileFormat === 'jpeg') {
    ctx.fillStyle = DEFAULT_BGCOLOR
    ctx.fillRect(0, 0, fileSize, fileHeight)
  }

  const svgData = new XMLSerializer().serializeToString(svgRef.current)
  const svgBlob = new Blob([svgData], { type: 'image/svg+xml;charset=utf-8' })
  const svgUrl = URL.createObjectURL(svgBlob)

  const qrImg = new Image()
  qrImg.crossOrigin = 'anonymous'
  qrImg.src = svgUrl

  qrImg.onload = () => {
    ctx.drawImage(qrImg, 0, 0, fileSize, fileHeight)
    URL.revokeObjectURL(svgUrl)

    if (imageSettings?.src && calculatedImageSettings) {
      const logoImg = new Image()
      logoImg.crossOrigin = 'anonymous'
      logoImg.src = imageSettings.src

      logoImg.onload = () => {
        const viewBoxWidth = frameLayout?.width ?? numCells
        const offsetX = frameLayout?.qrX ?? 0
        const offsetY = frameLayout?.qrY ?? 0
        const ratio = fileSize / size
        const scale = viewBoxWidth / fileSize
        const qrSize = numCells / scale

        const logoSize = imageSettings.width * ratio * (numCells / viewBoxWidth)
        const logoX = imageSettings.x
          ? (calculatedImageSettings.x + margin + offsetX) / scale
          : offsetX / scale + (qrSize - logoSize) / 2
        const logoY = imageSettings.y
          ? (calculatedImageSettings.y + margin + offsetY) / scale
          : offsetY / scale + (qrSize - logoSize) / 2
        ctx.drawImage(logoImg, logoX, logoY, logoSize, logoSize)

        const imageType = fileFormat === 'png' ? 'image/png' : 'image/jpeg'
        const a = document.createElement('a')
        a.href = canvas.toDataURL(imageType)
        a.download = `${fileName}.${fileFormat}`
        document.body.appendChild(a)
        a.click()
        document.body.removeChild(a)
      }
      // oxlint-disable-next-line no-console
      logoImg.onerror = (err) => console.error('Error loading logo:', err)
    } else {
      const imageType = fileFormat === 'png' ? 'image/png' : 'image/jpeg'
      const a = document.createElement('a')
      a.href = canvas.toDataURL(imageType)
      a.download = `${fileName}.${fileFormat}`
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
    }
  }
  // oxlint-disable-next-line no-console
  qrImg.onerror = (err) => console.error('Error loading QR code:', err)
}
