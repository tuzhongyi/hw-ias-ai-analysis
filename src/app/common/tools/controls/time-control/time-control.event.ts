import { TimeControl } from './time-control'

export interface TimeControlEvent {
  change(time: TimeControl): void
}
