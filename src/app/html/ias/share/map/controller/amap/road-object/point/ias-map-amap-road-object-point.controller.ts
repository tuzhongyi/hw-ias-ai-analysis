import { IASMapAMapPointAbstract } from '../../point/ias-map-amap-point.abstract';

export class IASMapAMapRoadObjectPointController extends IASMapAMapPointAbstract {
  constructor(container: Loca.Container, private color: string) {
    super(container);
  }
  protected get style() {
    return {
      radius: 5,
      unit: 'px',
      color: this.color,
      borderWidth: 0,
      blurWidth: 3,
    };
  }
}
