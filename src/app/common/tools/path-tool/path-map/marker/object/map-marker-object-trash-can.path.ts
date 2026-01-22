import { MapMarkerPathAbstract } from '../map-marker.path.abstract';

export class MapMarkerObjectTrashCanPath extends MapMarkerPathAbstract {
  constructor(base: string) {
    super(`${base}-trash-can`);
  }
}
