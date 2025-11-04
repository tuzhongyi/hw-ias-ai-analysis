import { ShopSign } from '../../../../../../../../common/data-core/models/arm/analysis/shop-sign.model';
import { GisPoint } from '../../../../../../../../common/data-core/models/arm/gis-point.model';
import { SystemTaskResultAMapIconController } from './system-task-result-amap-icon.controller';

export class SystemTaskResultAMapPointController {
  selected = false;
  constructor(public data: ShopSign, point: GisPoint) {
    this.marker = this.create(data, point);
  }

  private icon = new SystemTaskResultAMapIconController();
  marker: AMap.LabelMarker;

  create(data: ShopSign, point: GisPoint) {
    let icon = this.icon.create();
    const marker = new AMap.LabelMarker({
      icon: icon,
      position: [point.Longitude, point.Latitude],
      title: data.Text,
      name: data.Id,
      extData: data,
    });
    return marker;
  }

  select() {
    if (this.selected) return;
    let icon = this.icon.get(true);
    this.marker.setIcon(icon);
    this.marker.setTop(true);
    this.selected = true;
    return this.marker.getPosition();
  }

  blur() {
    if (!this.selected) return;
    let icon = this.icon.get(false);
    this.marker.setIcon(icon);
    this.marker.setTop(false);
    this.selected = false;
  }
}
