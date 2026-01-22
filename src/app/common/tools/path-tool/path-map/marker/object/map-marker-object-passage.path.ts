import { MapMarkerPathAbstract } from '../map-marker.path.abstract';

export class MapMarkerObjectPassagePath extends MapMarkerPathAbstract {
  constructor(base: string) {
    super(`${base}-passage`);
  }
}
