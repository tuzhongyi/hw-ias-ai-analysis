import { MapMarkerPathAbstract } from '../map-marker.path.abstract';

export class MapMarkerObjectUnknowPath extends MapMarkerPathAbstract {
  constructor(base: string) {
    super(`${base}-unknow`);
  }
}
