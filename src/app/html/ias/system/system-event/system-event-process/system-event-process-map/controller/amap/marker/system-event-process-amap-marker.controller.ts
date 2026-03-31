import { MobileEventRecord } from '../../../../../../../../../common/data-core/models/arm/event/mobile-event-record.model';
import { PathTool } from '../../../../../../../../../common/tools/path-tool/path.tool';
import { SizeTool } from '../../../../../../../../../common/tools/size-tool/size.tool';

export class SystemEventProcessAMapMarkerController {
  constructor(private map: AMap.Map) {}

  private marker?: AMap.Marker;

  add(data: MobileEventRecord) {
    if (data.Location) {
      let gcj02 = data.Location.GCJ02;
      this.marker = new AMap.Marker({
        position: [gcj02.Longitude, gcj02.Latitude] as [number, number],
        icon: new AMap.Icon({
          image: PathTool.image.map.point.red,
          imageSize: SizeTool.map.point.normal.get(),
        }),

        size: SizeTool.map.point.normal.get(),
        anchor: 'bottom-center',
      });
      this.map.add(this.marker);
      return this.marker;
    }
    return undefined;
  }
  remove() {
    if (this.marker) {
      this.map.remove(this.marker);
      this.marker = undefined;
    }
  }
}
