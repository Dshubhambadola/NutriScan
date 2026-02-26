import { type HybridObject } from 'react-native-nitro-modules'

export interface Retraining extends HybridObject<{ ios: 'swift', android: 'kotlin' }> {
  scheduleRetrainingJob(): void
}