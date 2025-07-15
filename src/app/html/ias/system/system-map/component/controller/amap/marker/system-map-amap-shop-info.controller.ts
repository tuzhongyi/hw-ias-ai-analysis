import { ISystemAMapShopMarkerInfo } from './system-map-amap-shop-marker.model';

export class SystemAMapShopInfoController {
  constructor(private map: AMap.Map) {
    this.marker = this.init();
  }

  private marker: AMap.Marker;

  private init() {
    return new AMap.Marker({
      anchor: 'bottom-center',
      offset: [0, -70],
    });
  }

  add(data: ISystemAMapShopMarkerInfo, zoom: number) {
    if (data && data.Location) {
      let content = `<div class="amap-info-window">
                        <div class="amap-info-window-content">${data.Name}</div>                      
                        <div class="amap-info-sharp"></div>
                    </div>`;
      this.marker.setContent(content);

      let position: [number, number] = [
        data.Location.Longitude,
        data.Location.Latitude,
      ];
      this.set.offset(zoom);
      this.marker.setPosition(position);
      this.map.add(this.marker);
    }
    return undefined;
  }
  remove() {
    this.map.remove(this.marker);
  }

  set = {
    offset: (zoom: number) => {
      let offset: [number, number] = [0, -70];
      if (zoom < 19) {
        offset = [0, -10];
      }
      let pixel = new AMap.Pixel(...offset);
      this.marker.setOffset(pixel);
    },
    position: (position: [number, number]) => {
      this.marker.setPosition(position);
    },
  };
}
