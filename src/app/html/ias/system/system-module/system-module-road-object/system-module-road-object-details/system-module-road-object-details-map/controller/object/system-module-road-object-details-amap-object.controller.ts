import { EventEmitter } from '@angular/core';
import { RoadObjectState } from '../../../../../../../../../common/data-core/enums/road/road-object/road-object-state.enum';
import { RoadObjectType } from '../../../../../../../../../common/data-core/enums/road/road-object/road-object-type.enum';
import { PathTool } from '../../../../../../../../../common/tools/path-tool/path.tool';
import { SizeTool } from '../../../../../../../../../common/tools/size-tool/size.tool';

export class SystemModuleRoadObjectDetailsAMapObjectController {
  event = {
    dragend: new EventEmitter<[number, number]>(),
  };
  constructor(private map: AMap.Map) {}

  private marker?: AMap.Marker;
  private type?: RoadObjectType;

  private regist(marker: AMap.Marker) {
    marker.on('dragend', (e) => {
      let position: [number, number] = [e.lnglat.lng, e.lnglat.lat];
      this.event.dragend.emit(position);
    });
    marker.on('mouseover', () => {
      if (this.marker) {
        let icon = this.get.icon();
        let img = PathTool.image.map.object.get(this.type);
        icon.setImage(img.hover);
        this.marker.setIcon(icon);
      }
    });
    marker.on('mouseout', () => {
      if (this.marker) {
        let icon = this.get.icon();
        let img = PathTool.image.map.object.get(this.type);
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
    state: RoadObjectState.None,
    icon: (type?: RoadObjectType) => {
      let icon = new AMap.Icon({
        imageSize: this.get.size(),
        size: this.get.size(),
        image: PathTool.image.map.object.get(type, this.get.state).normal,
      });
      return icon;
    },
    size: () => {
      return [SizeTool.map.object.width, SizeTool.map.object.height] as [
        number,
        number
      ];
    },
  };

  set = {
    type: (type: RoadObjectType) => {
      this.type = type;

      if (this.marker) {
        let icon = this.get.icon(type);
        this.marker.setIcon(icon);
      }
    },
    state: (state: RoadObjectState) => {
      this.get.state = state;
    },
    position: (position: [number, number]) => {
      if (this.marker) {
        this.marker.setPosition(position);
      }
    },
  };
}
