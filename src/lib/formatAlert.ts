import { formatValue } from './formatValue'
import { SENSOR_META } from './sensors'
import type { FarmAlert, Measures } from '@/types/spacefarm'

export interface AlertText {
  title: string
  detail: string
}

/** Builds the French wording of an alert, using the live measure when available. */
export function formatAlert(alert: FarmAlert, measures: Measures): AlertText {
  const { sensor } = alert
  if (alert.kind === 'sensor_silent' || sensor === 'device') {
    return { title: 'Capteur muet', detail: "Plus de données de l'ESP32, mode sûr activé" }
  }

  const { label, unit } = SENSOR_META[sensor]
  const feminine = sensor !== 'waterLevel'
  const isHigh = alert.kind === 'above_max'
  const adjective = isHigh ? (feminine ? 'élevée' : 'élevé') : feminine ? 'basse' : 'bas'

  const value = measures[sensor] ?? alert.value
  const measured = value === null ? '--' : formatValue(sensor, value)
  const limit = alert.limit === null ? '' : `, ${isHigh ? 'maximum' : 'minimum'} ${formatValue(sensor, alert.limit)} ${unit}`

  return { title: `${label} trop ${adjective}`, detail: `${measured} ${unit}${limit}` }
}
