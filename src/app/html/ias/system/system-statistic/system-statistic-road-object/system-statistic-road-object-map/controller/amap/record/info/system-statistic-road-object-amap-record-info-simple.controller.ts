import { RoadObjectEventRecord } from '../../../../../../../../../../common/data-core/models/arm/geographic/road-object-event-record.model';
import { ComponentTool } from '../../../../../../../../../../common/tools/component-tool/component.tool';
import { SystemStatisticRoadObjectMapInfoSimpleComponent } from '../../../../../system-statistic-road-object-map-info/system-statistic-road-object-map-info-simple/system-statistic-road-object-map-info-simple.component';

export class SystemStatisticRoadObjectAMapRecordInfoSimpleController {
  constructor(private map: AMap.Map, private tool: ComponentTool) {
    this.marker = this.init();
  }

  private marker: AMap.Marker;

  private init() {
    return new AMap.Marker({
      anchor: 'bottom-center',
      offset: [0, -62],
    });
  }

  add(data: RoadObjectEventRecord) {
    if (data.Location) {
      let content = this.get.html(data);
      this.marker.setContent(content);

      let position = [
        data.Location.GCJ02.Longitude,
        data.Location.GCJ02.Latitude,
      ] as [number, number];

      this.marker.setPosition(position);
      this.map.add(this.marker);
    }
    return undefined;
  }
  remove() {
    this.map.remove(this.marker);
  }

  private get = {
    html: (data: RoadObjectEventRecord) => {
      let component = this.tool.create(
        SystemStatisticRoadObjectMapInfoSimpleComponent,
        { data: data, anchor: 'bottom' }
      );
      let html = this.tool.get.html(component);
      return html.firstElementChild as HTMLElement;
    },
  };
}
