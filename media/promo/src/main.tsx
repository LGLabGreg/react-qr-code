import { memo, useMemo, useState } from 'react'
import { flushSync } from 'react-dom'
import { createRoot } from 'react-dom/client'

import { ReactQRCode } from '../../../packages/react-qr-code/src'
import { QrCode, QrSegment, Ecc } from '../../../packages/react-qr-code/src/lib/qrcodegen'
import {
  clamp,
  easeInBack,
  easeInOutCubic,
  easeInOutQuart,
  easeOutBack,
  easeOutCubic,
  easeOutExpo,
  lerp,
  mixColor,
  mulberry32,
  prog,
} from './anim'
import { CYAN, INK, LOOKS, type Look, type QRLook, WALL_LOOKS } from './looks'

const params = new URLSearchParams(location.search)
export const FPS = Number(params.get('fps') || 60)
export const DURATION = 15.3
const W = Number(params.get('w') || 1920)
const H = Number(params.get('h') || 1080)

const VALUE = 'https://reactqrcode.com'
const LEVEL = 'H' as const
const MARGIN = 3
const CARD = 600
const RADIUS = 44
const WIPE = 0.42

// Timeline (seconds)
const T_WALL_OUT = 9.2
const T_WALL_HOLD = 10.5
const T_WALL_IN = 11.6
const T_WALL_END = 12.8
const T_LOGO = 12.85
const T_OUTRO = 14.45

const LOGO_SVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="2 2 20 20"><path d="M12,13v4a1,1,0,0,1-1,1H7a1,1,0,0,1-1-1V13a1,1,0,0,1,1-1h4A1,1,0,0,1,12,13ZM7,10H9a1,1,0,0,0,1-1V7A1,1,0,0,0,9,6H7A1,1,0,0,0,6,7V9A1,1,0,0,0,7,10Zm10,4H15a1,1,0,0,0-1,1v2a1,1,0,0,0,1,1h2a1,1,0,0,0,1-1V15A1,1,0,0,0,17,14Zm0-8H13a1,1,0,0,0-1,1v4a1,1,0,0,0,1,1h4a1,1,0,0,0,1-1V7A1,1,0,0,0,17,6Z" fill="${CYAN}"/><path d="M21,9a1,1,0,0,1-1-1V4H16a1,1,0,0,1,0-2h4a2,2,0,0,1,2,2V8A1,1,0,0,1,21,9Zm1,11V16a1,1,0,0,0-2,0v4H16a1,1,0,0,0,0,2h4A2,2,0,0,0,22,20ZM4,8V4H8A1,1,0,0,0,8,2H4A2,2,0,0,0,2,4V8A1,1,0,0,0,4,8ZM9,21a1,1,0,0,0-1-1H4V16a1,1,0,0,0-2,0v4a2,2,0,0,0,2,2H8A1,1,0,0,0,9,21Z" fill="${INK}"/></svg>`
const LOGO_URI = `data:image/svg+xml;base64,${btoa(LOGO_SVG)}`

/* ------------------------------------------------------------------ */
/* QR card (real library)                                              */
/* ------------------------------------------------------------------ */

const QR = ({ look, value = VALUE }: { look: QRLook; value?: string }) => (
  <ReactQRCode
    value={value}
    size={CARD}
    level={LEVEL}
    marginSize={MARGIN}
    svgProps={{ style: { display: 'block' } }}
    {...look}
  />
)

const cardStyle: React.CSSProperties = {
  position: 'absolute',
  width: CARD,
  height: CARD,
  borderRadius: RADIUS,
  overflow: 'hidden',
}

/* ------------------------------------------------------------------ */
/* Intro: modules assemble one by one                                  */
/* ------------------------------------------------------------------ */

const useModules = () =>
  useMemo(() => {
    const qr = QrCode.encodeSegments(QrSegment.makeSegments(VALUE), Ecc.HIGH, 1)
    return qr.getModules()
  }, [])

const isFinder = (x: number, y: number, n: number) =>
  (x < 7 && y < 7) || (x >= n - 7 && y < 7) || (x < 7 && y >= n - 7)

const Assemble = ({ t }: { t: number }) => {
  const modules = useModules()
  const n = modules.length
  const total = n + MARGIN * 2
  const cells = useMemo(() => {
    const rnd = mulberry32(7)
    const out: { x: number; y: number; delay: number }[] = []
    const c = (n - 1) / 2
    modules.forEach((row, y) =>
      row.forEach((on, x) => {
        if (!on || isFinder(x, y, n)) return
        const d = Math.hypot(x - c, y - c) / (c * Math.SQRT2)
        out.push({ x, y, delay: 0.3 + d * 0.85 + rnd() * 0.18 })
      }),
    )
    return out
  }, [modules, n])

  const finders = [
    [0, 0],
    [n - 7, 0],
    [0, n - 7],
  ]

  return (
    <svg
      width={CARD}
      height={CARD}
      viewBox={`0 0 ${total} ${total}`}
      style={{ display: 'block' }}
    >
      <rect width={total} height={total} fill='#FFFFFF' />
      <g shapeRendering='crispEdges'>
        {cells.map(({ x, y, delay }) => {
          const p = prog(t, delay, 0.5)
          if (p <= 0) return null
          const s = easeOutBack(p, 2.2)
          const fill = mixColor(CYAN, INK, easeOutCubic(prog(t, delay + 0.12, 0.45)))
          const cx = x + MARGIN + 0.5
          const cy = y + MARGIN + 0.5
          return (
            <rect
              key={`${x}-${y}`}
              x={-0.5}
              y={-0.5}
              width={1}
              height={1}
              fill={fill}
              transform={`translate(${cx} ${cy}) scale(${s})`}
            />
          )
        })}
      </g>
      {finders.map(([fx, fy], i) => {
        const p = prog(t, 0.15 + i * 0.12, 0.75)
        if (p <= 0) return null
        const s = easeOutBack(p, 1.6)
        const rot = -180 * (1 - easeOutExpo(p))
        const cx = fx + MARGIN + 3.5
        const cy = fy + MARGIN + 3.5
        const pi = prog(t, 0.45 + i * 0.12, 0.6)
        const fill = mixColor(CYAN, INK, easeOutCubic(prog(t, 0.6 + i * 0.12, 0.6)))
        return (
          <g key={i} transform={`translate(${cx} ${cy}) rotate(${rot}) scale(${s})`}>
            <path
              d='M-3.5,-3.5h7v7h-7z M-2.5,-2.5v5h5v-5z'
              fillRule='evenodd'
              fill={fill}
            />
            {pi > 0 && (
              <rect
                x={-1.5}
                y={-1.5}
                width={3}
                height={3}
                fill={fill}
                transform={`scale(${easeOutBack(pi, 2.5)})`}
              />
            )}
          </g>
        )
      })}
    </svg>
  )
}

/* ------------------------------------------------------------------ */
/* Hero card: style morphs via radial wipes                            */
/* ------------------------------------------------------------------ */

const origin = (o: Look['origin']) => {
  switch (o) {
    case 'tl':
      return [0, 0]
    case 'tr':
      return [CARD, 0]
    case 'bl':
      return [0, CARD]
    case 'br':
      return [CARD, CARD]
    default:
      return [CARD / 2, CARD / 2]
  }
}

const lookIndexAt = (t: number) => {
  let i = 0
  LOOKS.forEach((l, k) => {
    if (l.at <= t) i = k
  })
  return i
}

export const wipeState = (t: number) => {
  const i = lookIndexAt(t)
  const look = LOOKS[i]
  const p = i === 0 ? 1 : prog(t, look.at, WIPE)
  return { i, look, prev: LOOKS[Math.max(0, i - 1)], p }
}

const logoSize = (t: number) => {
  const p = prog(t, T_LOGO, 0.7)
  return 150 * easeOutBack(p, 2)
}

const withLogo = (look: QRLook, t: number): QRLook => {
  const s = logoSize(t)
  if (s < 1) return look
  return {
    ...look,
    imageSettings: { src: LOGO_URI, width: s, height: s, excavate: true },
  }
}

const HeroFace = ({ t }: { t: number }) => {
  if (t < LOOKS[1].at) {
    // Hand over from the hand-rolled intro to the real component once settled
    return t < 2.0 ? <Assemble t={t} /> : <QR look={LOOKS[0].props(t)} />
  }
  const { look, prev, p } = wipeState(t)
  const [ox, oy] = origin(look.origin)
  const maxR = Math.max(
    ...[
      [0, 0],
      [CARD, 0],
      [0, CARD],
      [CARD, CARD],
    ].map(([x, y]) => Math.hypot(x - ox, y - oy)),
  )
  const e = easeInOutQuart(p)
  const r = e * maxR
  return (
    <>
      {p < 1 && <QR look={prev.props(t)} />}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          clipPath: p < 1 ? `circle(${r}px at ${ox}px ${oy}px)` : undefined,
        }}
      >
        <QR look={withLogo(look.props(t), t)} />
      </div>
      {p > 0 && p < 1 && (
        <div
          style={{
            position: 'absolute',
            left: ox - r,
            top: oy - r,
            width: r * 2,
            height: r * 2,
            borderRadius: '50%',
            border: `${lerp(10, 2, e)}px solid ${look.accent}`,
            boxShadow: `0 0 40px ${look.accent}, inset 0 0 40px ${look.accent}`,
            opacity: Math.sin(Math.PI * p) * 0.95,
            boxSizing: 'border-box',
          }}
        />
      )}
    </>
  )
}

const Sheen = ({ t, at }: { t: number; at: number }) => {
  const p = prog(t, at, 0.9)
  if (p <= 0 || p >= 1) return null
  const x = lerp(-CARD * 1.2, CARD * 1.2, easeInOutCubic(p))
  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        background:
          'linear-gradient(105deg, transparent 35%, rgba(255,255,255,0.55) 50%, transparent 65%)',
        transform: `translateX(${x}px)`,
        mixBlendMode: 'soft-light',
        pointerEvents: 'none',
      }}
    />
  )
}

/* ------------------------------------------------------------------ */
/* Wall of cards                                                       */
/* ------------------------------------------------------------------ */

const COLS = 11
const ROWS = 11
const PITCH = CARD + 90
const WALL_VALUES = [
  'https://reactqrcode.com/demo',
  'https://reactqrcode.com/examples',
  'https://reactqrcode.com/ref-api',
  'https://reactqrcode.com/installation',
  'https://reactqrcode.com/quick-start',
  'https://reactqrcode.com/image-settings',
]

const WallCard = memo(({ look, value }: { look: QRLook; value: string }) => (
  <QR look={{ level: 'L', ...look }} value={value} />
))

const wallCells = (() => {
  const rnd = mulberry32(42)
  const out: { col: number; row: number; look: QRLook; value: string; jitter: number }[] =
    []
  let prev = -1
  for (let row = 0; row < ROWS; row++) {
    for (let col = 0; col < COLS; col++) {
      let k = Math.floor(rnd() * WALL_LOOKS.length)
      if (k === prev) k = (k + 1) % WALL_LOOKS.length
      prev = k
      out.push({
        col,
        row,
        look: WALL_LOOKS[k],
        value: WALL_VALUES[Math.floor(rnd() * WALL_VALUES.length)],
        jitter: rnd(),
      })
    }
  }
  return out
})()

const cameraP = (t: number) => {
  if (t < T_WALL_OUT || t > T_WALL_END) return 0
  if (t < T_WALL_HOLD)
    return easeInOutCubic(prog(t, T_WALL_OUT, T_WALL_HOLD - T_WALL_OUT))
  if (t < T_WALL_IN) return 1
  return 1 - easeInOutCubic(prog(t, T_WALL_IN, T_WALL_END - T_WALL_IN))
}

/* ------------------------------------------------------------------ */
/* Stage                                                               */
/* ------------------------------------------------------------------ */

const Backdrop = ({
  t,
  glow,
  glowPrev,
  glowP,
  presence,
}: {
  t: number
  glow: [string, string]
  glowPrev: [string, string]
  glowP: number
  presence: number
}) => {
  const blob = (colors: [string, string], opacity: number) => (
    <>
      <div
        style={{
          position: 'absolute',
          left: '50%',
          top: '50%',
          width: 760,
          height: 760,
          marginLeft: -380 + Math.sin(t * 0.8) * 90 - 120,
          marginTop: -380 + Math.cos(t * 0.6) * 60 - 40,
          borderRadius: '50%',
          background: colors[0],
          filter: 'blur(140px)',
          opacity: 0.42 * opacity,
        }}
      />
      <div
        style={{
          position: 'absolute',
          left: '50%',
          top: '50%',
          width: 700,
          height: 700,
          marginLeft: -350 + Math.cos(t * 0.7) * 100 + 140,
          marginTop: -350 + Math.sin(t * 0.9) * 70 + 60,
          borderRadius: '50%',
          background: colors[1],
          filter: 'blur(140px)',
          opacity: 0.38 * opacity,
        }}
      />
    </>
  )
  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        overflow: 'hidden',
        background: '#060608',
      }}
    >
      <div
        style={{
          position: 'absolute',
          inset: -64,
          backgroundImage:
            'radial-gradient(rgba(255,255,255,0.11) 1.4px, transparent 1.6px)',
          backgroundSize: '32px 32px',
          transform: `translate(${(t * 12) % 32}px, ${(t * 6) % 32}px)`,
          maskImage:
            'radial-gradient(ellipse 60% 70% at 50% 50%, black 20%, transparent 75%)',
          WebkitMaskImage:
            'radial-gradient(ellipse 60% 70% at 50% 50%, black 20%, transparent 75%)',
        }}
      />
      {glowP < 1 && blob(glowPrev, (1 - glowP) * presence)}
      {blob(glow, glowP * presence)}
    </div>
  )
}

const Stage = ({ frame }: { frame: number }) => {
  const t = frame / FPS
  const unit = Math.min(W / 1920, H / 1080) * (H > W * 0.75 ? 1.15 : 1)

  // Intro / outro envelope
  const intro = easeOutExpo(prog(t, 0, 0.8))
  const outroP = prog(t, T_OUTRO, 0.6)
  const outro = easeInBack(outroP, 2.2)
  const presence = intro * (1 - outroP)

  const { look, prev, p: wipeP, i } = wipeState(t)
  const kick = i > 0 && wipeP < 1 ? 0.03 * Math.sin(Math.PI * wipeP) : 0

  const camP = cameraP(t)
  const live = 1 - camP

  // Hero card transforms
  const settle = easeOutCubic(prog(t, 0, 1.9))
  const rx = 38 * (1 - settle) + Math.sin(t * 0.9) * 7 * live + outro * 25
  const ry = -32 * (1 - settle) + Math.sin(t * 0.7 + 1) * 10 * live
  const rz = -outro * 18
  const heroScale = (0.55 + 0.45 * intro) * (1 + kick) * (1 - outro)
  // Logo moment: a gentle push in
  const logoPush = 0.06 * easeInOutCubic(prog(t, T_LOGO, 1.2))

  // Wall camera
  const camTilt = camP
  const drift = (t - T_WALL_OUT) * 260

  return (
    <div style={{ position: 'absolute', inset: 0 }}>
      <Backdrop
        t={t}
        glow={look.glow}
        glowPrev={prev.glow}
        glowP={i === 0 ? 1 : easeInOutCubic(wipeP)}
        presence={presence * (1 - camP * 0.6)}
      />
      <div
        style={{
          position: 'absolute',
          left: '50%',
          top: '50%',
          width: 0,
          height: 0,
          perspective: 2200,
          transform: `scale(${unit * (1 + logoPush)})`,
        }}
      >
        <div
          style={{
            position: 'absolute',
            transformStyle: 'preserve-3d',
            transform: `rotateX(${52 * camTilt}deg) rotateZ(${-32 * camTilt}deg) scale(${1 - 0.6 * camTilt})`,
          }}
        >
          {camP > 0 &&
            wallCells.map(({ col, row, look: wl, value, jitter }) => {
              const dc = col - (COLS - 1) / 2
              const dr = row - (ROWS - 1) / 2
              if (dc === 0 && dr === 0) return null
              const d = Math.hypot(dc, dr)
              const appear = easeOutCubic(clamp(camP * 2.2 - d * 0.18 - jitter * 0.15))
              if (appear <= 0) return null
              const colShift = (col % 2 === 0 ? 1 : -1) * drift * camP
              return (
                <div
                  key={`${col}-${row}`}
                  style={{
                    ...cardStyle,
                    left: dc * PITCH - CARD / 2,
                    top: dr * PITCH - CARD / 2 + colShift,
                    opacity: appear,
                    transform: `scale(${0.7 + 0.3 * appear})`,
                    boxShadow: '0 30px 60px rgba(0,0,0,0.45)',
                  }}
                >
                  <WallCard look={wl} value={value} />
                </div>
              )
            })}
          {/* Hero */}
          <div
            style={{
              ...cardStyle,
              overflow: 'visible',
              left: -CARD / 2,
              top: -CARD / 2 + (((COLS - 1) / 2) % 2 === 0 ? 1 : -1) * drift * camP,
              transform: `rotateX(${rx}deg) rotateY(${ry}deg) rotateZ(${rz}deg) scale(${heroScale})`,
              opacity: clamp(intro * 1.5) * (1 - clamp((outroP - 0.7) / 0.3)),
            }}
          >
            <div
              style={{
                ...cardStyle,
                left: 0,
                top: 0,
                boxShadow: `0 50px 120px rgba(0,0,0,0.55), 0 0 0 1px rgba(255,255,255,0.08)`,
              }}
            >
              <HeroFace t={t} />
              <Sheen t={t} at={1.75} />
              <Sheen t={t} at={T_LOGO + 0.55} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

const App = () => {
  const [frame, setFrame] = useState(Number(params.get('frame') || 0))
  ;(window as any).__setFrame = (f: number) =>
    new Promise<void>((resolve) => {
      flushSync(() => setFrame(f))
      requestAnimationFrame(() => requestAnimationFrame(() => resolve()))
    })
  ;(window as any).__meta = {
    fps: FPS,
    duration: DURATION,
    frames: Math.round(DURATION * FPS),
  }
  return (
    <div
      style={{
        position: 'absolute',
        left: 0,
        top: 0,
        width: W,
        height: H,
        overflow: 'hidden',
      }}
    >
      <Stage frame={frame} />
    </div>
  )
}

// Preload the logo so the first logo frame is not blank
const img = new Image()
img.src = LOGO_URI

createRoot(document.getElementById('root')!).render(<App />)
