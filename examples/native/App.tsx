import {
  ReactQRCode,
  type ReactQRCodeProps,
  type ReactQRCodeRef,
} from '@lglab/react-qr-code'
import { useRef, useState } from 'react'
import { Image, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native'

const value = 'https://reactqrcode.com'
// oxlint-disable-next-line typescript/no-require-imports -- Metro bundles assets through require()
const logo = require('./assets/logo.png')

const gradient: ReactQRCodeProps['gradient'] = {
  type: 'linear',
  rotation: 45,
  stops: [
    { offset: '0%', color: '#2563eb' },
    { offset: '100%', color: '#db2777' },
  ],
}

// Each entry exercises one area that differs between the DOM and react-native-svg.
const examples: Array<[string, Omit<ReactQRCodeProps, 'value'>]> = [
  ['Default', {}],
  [
    'Rotated finder patterns (leaf / inpoint)',
    {
      finderPatternOuterSettings: { style: 'leaf', color: '#1d4ed8' },
      finderPatternInnerSettings: { style: 'inpoint', color: '#b91c1c' },
    },
  ],
  [
    'Outpoint + diamond',
    {
      finderPatternOuterSettings: { style: 'outpoint-lg' },
      finderPatternInnerSettings: { style: 'diamond', color: '#be123c' },
    },
  ],
  ['Rounded data modules', { dataModulesSettings: { style: 'rounded' } }],
  [
    'Circuit board',
    { dataModulesSettings: { style: 'circuit-board', color: '#0f766e' } },
  ],
  [
    'Hearts, random size',
    { dataModulesSettings: { style: 'heart', randomSize: true, color: '#be123c' } },
  ],
  ['Linear gradient', { gradient, finderPatternOuterSettings: { style: 'rounded' } }],
  [
    'Radial gradient',
    {
      gradient: {
        type: 'radial',
        stops: [
          { offset: '0%', color: '#f59e0b' },
          { offset: '100%', color: '#7c3aed' },
        ],
      },
    },
  ],
  [
    'Gradient background',
    {
      background: {
        type: 'linear',
        rotation: 90,
        stops: [
          { offset: '0%', color: '#ecfeff' },
          { offset: '100%', color: '#67e8f9' },
        ],
      },
    },
  ],
  [
    'Bundled logo, excavated',
    { level: 'H', imageSettings: { src: logo, width: 44, height: 44, excavate: true } },
  ],
  ['Frame: banner', { frameSettings: { style: 'banner-bottom', text: 'Scan me!' } }],
  [
    'Frame: ticket (mask)',
    { frameSettings: { style: 'ticket', text: 'Tickets', color: '#0f766e' } },
  ],
  ['Frame: bubble', { frameSettings: { style: 'bubble', text: 'Hello' } }],
  ['Frame: border', { frameSettings: { style: 'border', text: 'Menu' } }],
  [
    'Frame: long label',
    {
      frameSettings: {
        style: 'banner-top',
        text: 'Scan this code to open the documentation',
      },
    },
  ],
  [
    'Frame + gradient',
    { gradient, frameSettings: { style: 'bubble', text: 'Gradient' } },
  ],
]

export default function App() {
  const ref = useRef<ReactQRCodeRef>(null)
  const [png, setPng] = useState<string | null>(null)

  return (
    <View style={styles.screen}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>@lglab/react-qr-code on React Native</Text>

        <View style={styles.card}>
          <Text style={styles.label}>ref.toDataURL()</Text>
          <ReactQRCode ref={ref} value={value} size={160} marginSize={2} />
          <Pressable
            style={styles.button}
            onPress={() => ref.current?.toDataURL({ size: 512 }).then(setPng)}
          >
            <Text style={styles.buttonText}>Export PNG</Text>
          </Pressable>
          {png && (
            <Image
              style={styles.exported}
              source={{ uri: `data:image/png;base64,${png}` }}
            />
          )}
        </View>

        {examples.map(([label, props]) => (
          <View key={label} style={styles.card}>
            <Text style={styles.label}>{label}</Text>
            <ReactQRCode value={value} size={220} marginSize={2} {...props} />
          </View>
        ))}
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: '#f1f5f9' },
  content: { padding: 16, gap: 16, alignItems: 'center' },
  title: { fontSize: 18, fontWeight: '700', marginTop: 48 },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    gap: 12,
    alignItems: 'center',
    alignSelf: 'stretch',
  },
  label: { fontSize: 14, fontWeight: '600', color: '#334155' },
  button: {
    backgroundColor: '#0f172a',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  buttonText: { color: '#fff', fontWeight: '600' },
  exported: { width: 160, height: 160 },
})
