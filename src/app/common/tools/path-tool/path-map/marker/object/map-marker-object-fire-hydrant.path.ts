import { MapMarkerPathAbstract } from '../map-marker.path.abstract';

export class MapMarkerObjectFireHydrantPath extends MapMarkerPathAbstract {
  constructor(base: string) {
    super(`${base}-fire-hydrant`);
  }
}
