import { Shop } from '../../../../../common/data-core/models/arm/analysis/shop.model';

export class SystemAMapPointInfoController {
  constructor(private map: any) {
    this.marker = this.init();
  }

  private marker: AMap.Marker;

  private init() {
    return new AMap.Marker({
      anchor: 'bottom-center',
      offset: [0, -50],
    });
  }

  add(data: Shop) {
    if (data.Location) {
      let content = `<div class="amap-info-window">
                        <div class="amap-info-window-content">${data.Name}</div>                      
                        <div class="amap-info-sharp"></div>
                    </div>`;
      this.marker.setContent(content);

      let position = [data.Location.Longitude, data.Location.Latitude];
      this.marker.setPosition(position);
      this.map.add(this.marker);
    }
    return undefined;
  }
  remove() {
    this.map.remove(this.marker);
  }
}
