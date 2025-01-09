import { ShopSign } from '../../../../../common/data-core/models/arm/analysis/shop-sign.model';
import { SystemTaskResultAMapIconController } from './system-task-result-amap-icon.controller';

declare var AMap: any;
export class SystemTaskResultAMapPointController {
  selected = false;
  constructor(public data: ShopSign) {
    this.marker = this.create(data);
  }

  private icon = new SystemTaskResultAMapIconController();
  marker: any;

  create(data: ShopSign) {
    if (data.Location) {
      let position = [data.Location.Longitude, data.Location.Latitude];
      let icon = this.icon.create();
      const marker = new AMap.LabelMarker({
        icon: icon,
        position: [...position],
        title: data.Text,
        name: data.Id,
        extData: data,
      });
      return marker;
    }
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
