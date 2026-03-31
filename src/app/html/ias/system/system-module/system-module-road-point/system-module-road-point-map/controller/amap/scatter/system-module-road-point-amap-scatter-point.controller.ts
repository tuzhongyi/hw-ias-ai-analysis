import { IASMapAMapPointAbstract } from '../../../../../../../share/map/controller/amap/point/ias-map-amap-point.abstract';

export class SystemModuleRoadPointAMapScatterPointController extends IASMapAMapPointAbstract {
  constructor(container: Loca.Container) {
    super(container);
  }
  protected get style() {
    return {
      radius: 5,
      unit: 'px',
      color: '#fde546aa',
      borderWidth: 0,
      blurWidth: 3,
    };
  }
}
