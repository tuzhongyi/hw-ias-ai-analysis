import { RoadObjectEventRecord } from '../../../../../../../../../../common/data-core/models/arm/geographic/road-object-event-record.model';
import { ComponentTool } from '../../../../../../../../../../common/tools/component-tool/component.tool';
import { IIASMapMarkerEvent } from '../../../../../../../../share/map/ias-map.model';
import { SystemStatisticRoadObjectMapMarkerComponent } from '../../../../../system-statistic-road-object-map-marker/system-statistic-road-object-map-marker.component';

export class SystemStatisticRoadObjectAMapRecordMarkerController {
  event: IIASMapMarkerEvent<RoadObjectEventRecord> = {};

  constructor(private tool: ComponentTool, public data: RoadObjectEventRecord) {
    this.marker = this.init(data);
  }

  marker: AMap.Marker;
  selected = false;

  get size() {
    return this.selected ? 40 : 32;
  }
  get html() {
    let component = this.tool.create(
      SystemStatisticRoadObjectMapMarkerComponent,
      { data: this.data, selected: this.selected }
    );
    let html = this.tool.get.html(component);
    return html.firstElementChild as HTMLElement;
  }
  private init(data: RoadObjectEventRecord) {
    let position = [0, 0] as [number, number];
    if (data.Location) {
      position = [
        data.Location.GCJ02.Longitude,
        data.Location.GCJ02.Latitude,
      ] as [number, number];
    }

    let marker = new AMap.Marker({
      position: position,
      content: this.html,
      size: [this.size, this.size],
      anchor: 'center',
    });
    this.regist(marker);
    return marker;
  }

  private regist(marker: AMap.Marker) {
    marker.on('click', (e) => {
      if (this.event.click) {
        this.event.click(this.data);
      }
    });
    marker.on('dblclick', (e) => {
      if (this.event.dblclick) {
        this.event.dblclick(this.data);
      }
    });
    marker.on('mouseover', (e) => {
      if (this.event.mouseover) {
        this.event.mouseover(this.data);
      }
    });
    marker.on('mouseout', (e) => {
      if (this.event.mouseout) {
        this.event.mouseout(this.data);
      }
    });
  }

  select(value: boolean) {
    this.selected = value;
    this.marker.setSize(new AMap.Size(this.size, this.size));
    this.marker.setContent(this.html);
  }
}
