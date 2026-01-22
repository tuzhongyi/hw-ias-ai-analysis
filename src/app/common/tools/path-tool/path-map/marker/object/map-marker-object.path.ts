import { MapMarkerObjectBusStationPath } from './map-marker-object-bus-station.path';
import { MapMarkerObjectFireHydrantPath } from './map-marker-object-fire-hydrant.path';
import { MapMarkerObjectPassagePath } from './map-marker-object-passage.path';
import { MapMarkerObjectTrashCanPath } from './map-marker-object-trash-can.path';
import { MapMarkerObjectUnknowPath } from './map-marker-object-unknow.path';

export class MapMarkerObjectPath {
  constructor(path: string) {
    this.basic = `${path}/marker`;
  }

  private basic: string;

  get passage() {
    return new MapMarkerObjectPassagePath(this.basic);
  }
  get busstation() {
    return new MapMarkerObjectBusStationPath(this.basic);
  }
  get firehydrant() {
    return new MapMarkerObjectFireHydrantPath(this.basic);
  }
  get trashcan() {
    return new MapMarkerObjectTrashCanPath(this.basic);
  }
  get unknow() {
    return new MapMarkerObjectUnknowPath(this.basic);
  }
}
