import { NitroModules } from 'react-native-nitro-modules'
import type { Retraining as RetrainingSpec } from './specs/retraining.nitro'

export const Retraining =
  NitroModules.createHybridObject<RetrainingSpec>('Retraining')