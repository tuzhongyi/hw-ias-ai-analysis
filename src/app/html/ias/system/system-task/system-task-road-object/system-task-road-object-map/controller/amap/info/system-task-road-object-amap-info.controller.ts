import { EventEmitter } from '@angular/core';
import { RoadObject } from '../../../../../../../../../common/data-core/models/arm/geographic/road-object.model';
import { RoadPoint } from '../../../../../../../../../common/data-core/models/arm/geographic/road-point.model';
import { RoadSection } from '../../../../../../../../../common/data-core/models/arm/geographic/road-section.model';
import { Size } from '../../../../../../../../../common/data-core/models/arm/size.model';
import { ComponentTool } from '../../../../../../../../../common/tools/component-tool/component.tool';
import { GeoTool } from '../../../../../../../../../common/tools/geo-tool/geo.tool';
import { IASMapAMapConfig } from '../../../../../../../share/map/controller/amap/ias-map-amap.config';
import { IIASMapAMapInfoController } from '../../../../../../../share/map/controller/amap/info/ias-map-amap-info.model';
import { SystemTaskRoadObjectMapInfoComponent } from '../../../../system-task-road-object-map-info/system-task-road-object-map-info.component';

export class SystemTaskRoadObjectAMapInfoController
  implements IIASMapAMapInfoController
{
  constructor(private map: AMap.Map, private tool: ComponentTool) {
    this.marker = this.init();
    this.regist();
  }

  private marker: AMap.Marker;
  private _size = new EventEmitter<Size>();
  private size?: [number, number];
  private timeout?: NodeJS.Timeout;

  private regist() {
    this._size.subscribe((size) => {
      this.size = [size.Width, size.Height];
      let x = -size.Width / 2 + 20.5;
      let y = -size.Height; // + 62
      let zoom = this.map.getZoom();
      if (zoom < IASMapAMapConfig.icon.zooms[0]) {
        y = y + 47;
      }

      this.set.offset([x, y]);
    });

    this.map.on('zoomchange', () => {
      if (!this.size) return;
      let x = -this.size[0] / 2 + 20.5;
      let y = -this.size[1]; // + 62
      let zoom = this.map.getZoom();
      if (zoom < IASMapAMapConfig.icon.zooms[0]) {
        y = y + 47;
      }

      this.set.offset([x, y]);
    });
  }

  private init() {
    return new AMap.Marker({
      anchor: 'bottom-center',
      offset: [0, 0],
    });
  }

  add(data: RoadObject | RoadPoint | RoadSection) {
    if (this.timeout) {
      clearTimeout(this.timeout);
      this.timeout = undefined;
    }
    let location = this.get.location.load(data);

    if (location) {
      let content = this.get.html(data);
      this.marker.setContent(content);
      this.marker.setPosition(location);
      this.map.add(this.marker);
    }
    return undefined;
  }
  remove(selected = false) {
    this.timeout = setTimeout(() => {
      if (selected) return;
      this.map.remove(this.marker);
    }, 200);
  }
  private get = {
    html: (data: RoadObject | RoadPoint | RoadSection) => {
      let component = this.tool.create(SystemTaskRoadObjectMapInfoComponent, {
        data: data,
        size: this._size,
      });
      let html = this.tool.get.html(component);
      return html.firstElementChild as HTMLElement;
    },
    location: {
      load: (data: RoadObject | RoadPoint | RoadSection) => {
        if (data instanceof RoadObject) {
          return this.get.location.by.object(data);
        } else if (data instanceof RoadPoint) {
          return this.get.location.by.point(data);
        } else if (data instanceof RoadSection) {
          return this.get.location.by.section(data);
        }
        return undefined;
      },
      by: {
        object: (data: RoadObject) => {
          let gcj02 = data.Location.GCJ02;
          return [gcj02.Longitude, gcj02.Latitude] as [number, number];
        },
        point: (data: RoadPoint) => {
          if (data.Location) {
            let gcj02 = data.Location.GCJ02;
            return [gcj02.Longitude, gcj02.Latitude] as [number, number];
          }
          return undefined;
        },
        section: (data: RoadSection) => {
          if (data.GeoLine) {
            let line = data.GeoLine.map<[number, number]>((x) => [
              x.Longitude,
              x.Latitude,
            ]);
            return GeoTool.polyline.center(line);
          }

          return undefined;
        },
      },
    },
  };

  set = {
    offset: (offset: [number, number]) => {
      let pixel = new AMap.Pixel(offset[0], offset[1]);
      this.marker.setOffset(pixel);
    },
  };
}
