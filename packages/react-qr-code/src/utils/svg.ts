const rx = /\.?0+$/

export function numToAttr(value: number) {
  return value.toFixed(7).replace(rx, '')
}

export const calculateGradientVectors = (rotation: number) => {
  const angle = (rotation % 360) * (Math.PI / 180)

  const x1 = Math.max(0, Math.min(100, 50 - 50 * Math.cos(angle)))
  const y1 = Math.max(0, Math.min(100, 50 - 50 * Math.sin(angle)))
  const x2 = Math.max(0, Math.min(100, 50 + 50 * Math.cos(angle)))
  const y2 = Math.max(0, Math.min(100, 50 + 50 * Math.sin(angle)))

  return {
    x1: `${x1}%`,
    y1: `${y1}%`,
    x2: `${x2}%`,
    y2: `${y2}%`,
  }
}

export const star = (cx: number, cy: number, size: number, spikes: number): string => {
  const outerRadius = size / 2
  const innerRadius = outerRadius / 2
  const step = Math.PI / spikes
  let path = ''

  for (let i = 0; i < 2 * spikes; i++) {
    const angle = i * step - Math.PI / 2
    const radius = i % 2 === 0 ? outerRadius : innerRadius
    const px = cx + radius * Math.cos(angle)
    const py = cy + radius * Math.sin(angle)
    path += `${i === 0 ? 'M' : 'L'} ${px},${py} `
  }
  return path + 'Z'
}

export const pinchedSquare = (
  x: number,
  y: number,
  size: number,
  controlOffset: number,
) =>
  `M ${x} ${y}` +
  `Q ${x + controlOffset} ${y + size / 2}, ${x} ${y + size}` +
  `Q ${x + size / 2} ${y + size - controlOffset}, ${x + size} ${y + size}` +
  `Q ${x + size - controlOffset} ${y + size / 2}, ${x + size} ${y}` +
  `Q ${x + size / 2} ${y + controlOffset}, ${x} ${y}` +
  'z'

export const hashtag = (x: number, y: number, size: number) => {
  const eigth = size / 8
  return `M ${x + size} ${y + eigth * 3} 
   V ${y + eigth}
   h -${eigth}
   V ${y}
   H ${x + eigth * 5}
   v ${eigth}
   H ${x + eigth * 3}
   V ${y}
   H ${x + eigth}
   v ${eigth}
   H ${x}
   v ${eigth * 2}
   h ${eigth}
   v ${eigth * 2}
   H ${x}
   v ${eigth * 2}
   h ${eigth}
   v ${eigth}
   h ${eigth * 2}
   v -${eigth}
   h ${eigth * 2}
   v ${eigth}
   h ${eigth * 2}
   v -${eigth}
   h ${eigth}
   V ${y + eigth * 5}
   h -${eigth}
   V ${y + eigth * 3}
   h ${eigth}
   Z`
}

export const heart = (x: number, y: number, size: number) => {
  let move = false
  let i = 0
  return [
    'M',
    1,
    0.3262506,
    'c',
    0,
    0.0383376,
    -0.0064626,
    0.0758377,
    -0.0193751,
    0.1125001,
    's',
    -0.0356247,
    0.076875,
    -0.0681248,
    0.1206252,
    'c',
    -0.0325,
    0.0437499,
    -0.0762503,
    0.0931247,
    -0.1312501,
    0.1481249,
    'C',
    0.7262502,
    0.7625008,
    0.6566626,
    0.8279132,
    0.5724999,
    0.9037505,
    'L',
    0.5,
    0.9687506,
    'L',
    0.4275001,
    0.9037505,
    'C',
    0.3433374,
    0.8279132,
    0.2737499,
    0.7625005,
    0.21875,
    0.7075007,
    'C',
    0.1637501,
    0.6525008,
    0.1199999,
    0.6031258,
    0.0874999,
    0.5593758,
    'S',
    0.0322876,
    0.4754133,
    0.0193751,
    0.4387506,
    'S',
    0,
    0.3645881,
    0,
    0.3262506,
    'c',
    0,
    -0.0783374,
    0.0262499,
    -0.1437498,
    0.07875,
    -0.1962499,
    's',
    0.1179124,
    -0.07875,
    0.1962499,
    -0.07875,
    'c',
    0.0433376,
    0,
    0.0845875,
    0.0091625,
    0.12375,
    0.0274999,
    'S',
    0.4716623,
    0.1229131,
    0.5,
    0.1562506,
    'c',
    0.0283374,
    -0.0333375,
    0.0620874,
    -0.0591625,
    0.1012502,
    -0.0775,
    'c',
    0.0391627,
    -0.0183375,
    0.0804126,
    -0.0274999,
    0.12375,
    -0.0274999,
    'c',
    0.0783374,
    0,
    0.1437497,
    0.0262499,
    0.1962501,
    0.07875,
    'S',
    1,
    0.2479131,
    1,
    0.3262506,
    'z',
  ]
    .map((v) => {
      if (typeof v == 'string') {
        i = 0
        move = v.toUpperCase() == v
        return v
      }
      i++
      v = v * size
      if (move) {
        v += i % 2 == 1 ? x : y
      }
      return numToAttr(v)
    })
    .join(' ')
}
