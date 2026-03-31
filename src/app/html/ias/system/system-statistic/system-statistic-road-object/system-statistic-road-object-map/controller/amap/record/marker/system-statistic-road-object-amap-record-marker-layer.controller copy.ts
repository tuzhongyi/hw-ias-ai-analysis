import { RoadObjectEventRecord } from '../../../../../../../../../../common/data-core/models/arm/geographic/road-object-event-record.model';
import { ComponentTool } from '../../../../../../../../../../common/tools/component-tool/component.tool';
import { IIASMapMarkerEvent } from '../../../../../../../../share/map/ias-map.model';
import { SystemStatisticRoadObjectAMapRecordMarkerController } from './system-statistic-road-object-amap-record-marker.controller';

export class SystemStatisticRoadObjectAMapRecordMarkerLayerController {
  event: IIASMapMarkerEvent<RoadObjectEventRecord> = {};
  constructor(private map: AMap.Map, private tool: ComponentTool) {}

  private markers: AMap.Marker[] = [];
  private controllers: SystemStatisticRoadObjectAMapRecordMarkerController[] =
    [];
  private selected?: SystemStatisticRoadObjectAMapRecordMarkerController;

  load(datas: RoadObjectEventRecord[]) {
    datas.forEach((x) => {
      let controller = new SystemStatisticRoadObjectAMapRecordMarkerController(
        this.tool,
        x
      );
      this.regist(controller);
      this.controllers.push(controller);
      this.markers.push(controller.marker);
    });

    this.map.add(this.markers);
  }

  private regist(
    controller: SystemStatisticRoadObjectAMapRecordMarkerController
  ) {
    controller.event.click = (data) => {
      this.event.click && this.event.click(data);
    };
    controller.event.dblclick = (data) => {
      this.event.dblclick && this.event.dblclick(data);
    };
    controller.event.mouseover = (data) => {
      this.event.mouseover && this.event.mouseover(data);
    };
    controller.event.mouseout = (data) => {
      this.event.mouseout && this.event.mouseout(data);
    };
  }

  clear() {
    if (this.markers.length > 0) {
      this.map.remove(this.markers);
      this.markers = [];
    }
    if (this.controllers.length > 0) {
      this.controllers = [];
    }
  }

  select(data: RoadObjectEventRecord) {
    if (this.selected) {
      if (this.selected.data.Id === data.Id) {
        return;
      } else {
        this.selected.select(false);
      }
    }
    let selected = this.controllers.find((x) => {
      return x.data.Id === data.Id;
    });

    if (selected) {
      selected.select(true);
      this.map.setCenter(selected.marker.getPosition()!);
    }

    this.selected = selected;
  }

  blur() {
    if (this.selected) {
      this.selected.select(false);
      this.selected = undefined;
    }
  }
}
