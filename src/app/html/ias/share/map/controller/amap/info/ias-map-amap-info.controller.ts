import { IIASMapAMapInfo } from './ias-map-amap-info.model';

export class IASMapAMapInfoController {
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

  add(data: IIASMapAMapInfo, zoom?: number, offset?: [number, number]) {
    if (data && data.Location) {
      let content = `<div class="amap-info-window">
                        <div class="amap-info-window-content">${data.Name}</div>                      
                        <div class="amap-info-sharp"></div>
                    </div>`;
      this.marker.setContent(content);

      this.set.offset(zoom ?? 50);
      if (offset) {
        let pixel = new AMap.Pixel(...offset);
        this.marker.setOffset(pixel);
      }

      this.marker.setPosition(data.Location);
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
