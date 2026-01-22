import { MapMarkerPathAbstract } from '../map-marker.path.abstract';

export class MapMarkerObjectBusStationPath extends MapMarkerPathAbstract {
  constructor(base: string) {
    super(`${base}-bus-station`);
  }
}
