import type { DownloadRasterProps, DownloadSVGProps } from '../types/utils'

export const downloadSVG = ({ svgRef, fileSize, fileName }: DownloadSVGProps) => {
  if (!svgRef.current) return

  const clonedSvg = svgRef.current.cloneNode(true) as SVGSVGElement
  clonedSvg.setAttribute('width', fileSize.toString())
  clonedSvg.setAttribute('height', fileSize.toString())

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
}: DownloadRasterProps) => {
  if (!svgRef.current) return

  const canvas = document.createElement('canvas')
  const ctx = canvas.getContext('2d')
  if (!ctx) return

  canvas.width = fileSize
  canvas.height = fileSize

  const svgData = new XMLSerializer().serializeToString(svgRef.current)
  const svgBlob = new Blob([svgData], { type: 'image/svg+xml;charset=utf-8' })
  const svgUrl = URL.createObjectURL(svgBlob)

  const qrImg = new Image()
  qrImg.crossOrigin = 'anonymous'
  qrImg.src = svgUrl

  qrImg.onload = () => {
    ctx.drawImage(qrImg, 0, 0, fileSize, fileSize)
    URL.revokeObjectURL(svgUrl)

    if (imageSettings?.src && calculatedImageSettings) {
      const logoImg = new Image()
      logoImg.crossOrigin = 'anonymous'
      logoImg.src = imageSettings.src

      logoImg.onload = () => {
        const ratio = fileSize / size
        const scale = numCells / fileSize

        const logoSize = imageSettings.width * ratio
        const logoX = imageSettings.x
          ? (calculatedImageSettings.x + margin) / scale
          : (fileSize - logoSize) / 2
        const logoY = imageSettings.y
          ? (calculatedImageSettings.y + margin) / scale
          : (fileSize - logoSize) / 2
        ctx.drawImage(logoImg, logoX, logoY, logoSize, logoSize)

        const imageType = fileFormat === 'png' ? 'image/png' : 'image/jpeg'
        const a = document.createElement('a')
        a.href = canvas.toDataURL(imageType)
        a.download = `${fileName}.${fileFormat}`
        document.body.appendChild(a)
        a.click()
        document.body.removeChild(a)
      }
      // eslint-disable-next-line no-console
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
  // eslint-disable-next-line no-console
  qrImg.onerror = (err) => console.error('Error loading QR code:', err)
}
