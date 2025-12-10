import { EventEmitter } from '@angular/core';
import { MobileEventRecord } from '../../../../../../../../common/data-core/models/arm/event/mobile-event-record.model';
import { ILocation } from '../../../../../../../../common/data-core/models/model.interface';
import { PathTool } from '../../../../../../../../common/tools/path-tool/path.tool';
import { IASMapAMapConverter } from '../../../../../../share/map/controller/amap/ias-map-amap.converter';

export class SystemMainMapAMapAlarmScatterController {
  event = {
    move: new EventEmitter<ILocation | undefined>(),
    click: new EventEmitter<MobileEventRecord>(),
  };
  constructor(private container: Loca.Container, private timeout: boolean) {
    this.layer = this.init();
  }

  private layer: Loca.ScatterLayer;
  private over?: ILocation;
  private converter = new IASMapAMapConverter();

  private init() {
    var scatter = new Loca.ScatterLayer({
      zIndex: 111,
      opacity: 1,
      visible: true,
      zooms: [0, 50],
    });
    return scatter;
  }

  private get style(): Loca.ScatterLayerStyle {
    return {
      unit: 'px',
      size: [100, 100],
      borderWidth: 0,
      texture: this.texture,
      duration: 500,
      animate: true,
    };
  }

  private get texture() {
    if (this.timeout) {
      return PathTool.image.map.alarm.breath.red;
    }
    return PathTool.image.map.alarm.breath.orange;
  }

  load(datas: MobileEventRecord[]) {
    let points = datas
      .filter((x) => !!x.Location)
      .map(
        (x) =>
          [x.Location!.GCJ02.Longitude, x.Location!.GCJ02.Latitude] as [
            number,
            number
          ]
      );
    let geo = this.converter.geo.point(points, datas);
    this.layer.setSource(geo);
    this.layer.setStyle(this.style);
    this.container.add(this.layer);
  }

  clear() {
    this.container.remove(this.layer);
  }
  moving(position: [number, number]) {
    let point = this.layer.queryFeature(position);
    if (point) {
      this.over = point.properties as MobileEventRecord;
      this.event.move.emit(this.over);
    } else {
      if (this.over) {
        this.over = undefined;
        this.event.move.emit();
      }
    }
  }
  click(position: [number, number]) {
    let point = this.layer.queryFeature(position);
    if (point) {
      let data = point.properties as MobileEventRecord;
      if (data) {
        this.event.click.emit(data);
      }
    }
  }
}
