import type { SensorKey, Thresholds } from '../types/spacefarm.ts'

export interface SensorMeta {
  label: string
  unit: string
  decimals: number
}

export const SENSOR_KEYS: readonly SensorKey[] = ['temperature', 'humidity', 'luminosity', 'waterLevel']

export const SENSOR_META: Record<SensorKey, SensorMeta> = {
  temperature: { label: 'Température', unit: '°C', decimals: 1 },
  humidity: { label: 'Humidité', unit: '%', decimals: 0 },
  luminosity: { label: 'Luminosité', unit: 'lx', decimals: 0 },
  waterLevel: { label: "Niveau d'eau", unit: '%', decimals: 0 },
}

export const DEFAULT_THRESHOLDS: Thresholds = {
  temperature: { min: 18, max: 24 },
  humidity: { min: 50, max: 70 },
  luminosity: { min: null, max: null },
  waterLevel: { min: 30, max: null },
}
