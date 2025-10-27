import { EventEmitter, Injectable } from '@angular/core';
import { GisPoint } from '../../../../../../../../common/data-core/models/arm/gis-point.model';
import { MapHelper } from '../../../../../../../../common/helper/map/map.helper';
import { PathTool } from '../../../../../../../../common/tools/path-tool/path.tool';
import { SizeTool } from '../../../../../../../../common/tools/size-tool/size.tool';
import { PromiseValue } from '../../../../../../../../common/view-models/value.promise';

@Injectable()
export class SystemModuleGpsTaskDetailsAMapController {
  dragging = new EventEmitter<number[]>();
  dragend = new EventEmitter<number[]>();

  constructor() {
    MapHelper.amap
      .get('system-module-gps-task-details-map-container', undefined, true)
      .then((x) => {
        this.map.set(x);
        let loca = new Loca.Container({ map: x });
      });
  }

  private map = new PromiseValue<AMap.Map>();
  private marker = new PromiseValue<AMap.Marker>();

  private _load(data: GisPoint) {
    let position: [number, number] = [data.Longitude, data.Latitude];
    let size: [number, number] = [
      SizeTool.map.point.normal.width,
      SizeTool.map.point.normal.width,
    ];
    let icon = new AMap.Icon({
      imageSize: size,

      size: size,
      image: PathTool.image.map.point.red,
      anchor: 'bottom-center',
    });
    let marker = new AMap.Marker({
      position: position,
      draggable: true,
      icon: icon,
      offset: new AMap.Pixel(-size[0] / 2, -size[1]),
    });
    marker.on('dragging', (e: any) => {
      let position = [e.lnglat.lng, e.lnglat.lat];
      this.dragging.emit(position);
    });
    marker.on('dragend', (e: any) => {
      let position = [e.lnglat.lng, e.lnglat.lat];
      this.dragend.emit(position);
    });

    this.marker.set(marker);
    this.map.get().then((x) => {
      x.add(marker);
      x.setCenter(position);
    });
  }

  async load(data: GisPoint) {
    let map = await this.map.get();
    if (this.marker.exists) {
      let marker = await this.marker.get();
      map.remove(marker);
    }
    this._load(data);
  }

  destroy() {
    this.map.get().then((x) => {
      x.destroy();
      this.map.clear();
    });
  }
}
