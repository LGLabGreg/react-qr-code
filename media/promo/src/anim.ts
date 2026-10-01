export const clamp = (v: number, min = 0, max = 1) => Math.min(max, Math.max(min, v))
export const lerp = (a: number, b: number, t: number) => a + (b - a) * t
export const prog = (t: number, start: number, dur: number) => clamp((t - start) / dur)

export const easeOutCubic = (x: number) => 1 - Math.pow(1 - x, 3)
export const easeInCubic = (x: number) => x * x * x
export const easeInOutCubic = (x: number) =>
  x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2
export const easeInOutQuart = (x: number) =>
  x < 0.5 ? 8 * x * x * x * x : 1 - Math.pow(-2 * x + 2, 4) / 2
export const easeOutExpo = (x: number) => (x === 1 ? 1 : 1 - Math.pow(2, -10 * x))
export const easeInOutExpo = (x: number) =>
  x === 0
    ? 0
    : x === 1
      ? 1
      : x < 0.5
        ? Math.pow(2, 20 * x - 10) / 2
        : (2 - Math.pow(2, -20 * x + 10)) / 2
export const easeOutBack = (x: number, s = 1.70158) =>
  1 + (s + 1) * Math.pow(x - 1, 3) + s * Math.pow(x - 1, 2)
export const easeInBack = (x: number, s = 1.70158) => (s + 1) * x * x * x - s * x * x
export const easeOutElastic = (x: number) => {
  const c4 = (2 * Math.PI) / 3
  return x === 0
    ? 0
    : x === 1
      ? 1
      : Math.pow(2, -10 * x) * Math.sin((x * 10 - 0.75) * c4) + 1
}

export const mulberry32 = (seed: number) => () => {
  let t = (seed += 0x6d2b79f5)
  t = Math.imul(t ^ (t >>> 15), t | 1)
  t ^= t + Math.imul(t ^ (t >>> 7), t | 61)
  return ((t ^ (t >>> 14)) >>> 0) / 4294967296
}

const hex = (c: string) => [1, 3, 5].map((i) => parseInt(c.slice(i, i + 2), 16))
export const mixColor = (a: string, b: string, t: number) => {
  const ca = hex(a)
  const cb = hex(b)
  const m = ca.map((v, i) => Math.round(lerp(v, cb[i], t)))
  return `rgb(${m[0]},${m[1]},${m[2]})`
}
