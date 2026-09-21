import type { CrisisType } from '@/types/spacefarm'

export interface CrisisMeta {
  label: string
  description: string
}

export const CRISIS_TYPES: readonly CrisisType[] = ['overheat', 'earth_cut', 'sensor_mute', 'low_water']

export const CRISIS_META: Record<CrisisType, CrisisMeta> = {
  overheat: { label: 'Surchauffe', description: 'La serre chauffe, les ventilateurs doivent réagir' },
  earth_cut: { label: 'Coupure Terre', description: 'Lien coupé, les messages sont mis en attente' },
  sensor_mute: { label: 'Capteur muet', description: "Plus aucune donnée de l'ESP32" },
  low_water: { label: "Niveau d'eau bas", description: 'Le réservoir se vide sous le minimum' },
}
