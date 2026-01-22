import { EventEmitter } from '@angular/core';
import { PathTool } from '../../../../../../../../../common/tools/path-tool/path.tool';
import { SizeTool } from '../../../../../../../../../common/tools/size-tool/size.tool';

export class SystemModuleRoadObjectDetailsAMapObjectController {
  event = {
    dragend: new EventEmitter<[number, number]>(),
  };
  constructor(private map: AMap.Map) {}

  private marker?: AMap.Marker;
  private type?: number;

  private regist(marker: AMap.Marker) {
    marker.on('dragend', (e) => {
      let position: [number, number] = [e.lnglat.lng, e.lnglat.lat];
      this.event.dragend.emit(position);
    });
    marker.on('mouseover', () => {
      if (this.marker) {
        let icon = this.get.icon();
        let img = this.get.image(this.type);
        icon.setImage(img.hover);
        this.marker.setIcon(icon);
      }
    });
    marker.on('mouseout', () => {
      if (this.marker) {
        let icon = this.get.icon();
        let img = this.get.image(this.type);
        icon.setImage(img.normal);
        this.marker.setIcon(icon);
      }
    });
  }

  add(position: [number, number], type?: number) {
    this.marker = new AMap.Marker({
      position: position,
      anchor: 'bottom-center',
      icon: this.get.icon(type),

      draggable: true,
    });
    this.regist(this.marker);
    this.map.add(this.marker);
  }

  clear() {
    if (this.marker) {
      this.map.remove(this.marker);
      this.marker = undefined;
    }
  }

  private get = {
    icon: (type?: number) => {
      let icon = new AMap.Icon({
        imageSize: this.get.size(),
        size: this.get.size(),
        image: this.get.image(type).normal,
      });
      return icon;
    },
    image: (type?: number) => {
      switch (type) {
        case 1:
          return PathTool.image.map.object.firehydrant;
        case 2:
          return PathTool.image.map.object.busstation;
        case 3:
          return PathTool.image.map.object.trashcan;
        case 4:
          return PathTool.image.map.object.passage;

        default:
          return PathTool.image.map.object.unknow;
      }
    },
    size: () => {
      return [SizeTool.map.object.width, SizeTool.map.object.height] as [
        number,
        number
      ];
    },
  };

  set = {
    type: (type: number) => {
      this.type = type;
      if (this.marker) {
        let icon = this.get.icon(type);
        this.marker.setIcon(icon);
      }
    },
    position: (position: [number, number]) => {
      if (this.marker) {
        this.marker.setPosition(position);
      }
    },
  };
}
