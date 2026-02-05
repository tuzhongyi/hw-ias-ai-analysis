import { EventEmitter } from '@angular/core';
import { RoadObject } from '../../../../../../../../../common/data-core/models/arm/geographic/road-object.model';
import { ColorTool } from '../../../../../../../../../common/tools/color/color.tool';

import { RoadObjectType } from '../../../../../../../../../common/data-core/enums/road/road-object/road-object-type.enum';
import { ArrayTool } from '../../../../../../../../../common/tools/array-tool/array.tool';
import { EnumTool } from '../../../../../../../../../common/tools/enum-tool/enum.tool';
import { SystemMainMapAMapRoadObjectPointController } from './system-main-map-amap-road-object-point.controller';

export class SystemMainMapAMapRoadObjectPointLayerController {
  event = {
    move: new EventEmitter<RoadObject>(),
  };
  constructor(container: Loca.Container) {
    this.init(container);
    this.unknow = new SystemMainMapAMapRoadObjectPointController(
      container,
      ColorTool.map.gray
    );
    this.regist();
  }

  private controllers = new Map<
    number,
    SystemMainMapAMapRoadObjectPointController
  >();

  private unknow: SystemMainMapAMapRoadObjectPointController;

  private regist() {
    this.controllers.forEach((controller) => {
      controller.event.move.subscribe((x) => {
        this.event.move.emit(x as RoadObject);
      });
    });

    this.unknow.event.move.subscribe((x) => {
      this.event.move.emit(x as RoadObject);
    });
  }

  private init(container: Loca.Container) {
    let types = EnumTool.values(RoadObjectType);

    types.forEach((type) => {
      let color = this.get.color(type);
      let controller = new SystemMainMapAMapRoadObjectPointController(
        container,
        color
      );
      this.controllers.set(type, controller);
    });
  }

  async load(datas: RoadObject[]) {
    let group = ArrayTool.groupBy(datas, (data) => {
      return data.ObjectType;
    });

    Object.keys(group).forEach((key) => {
      let type = parseInt(key);
      let datas = group[type];
      if (datas && datas.length > 0) {
        if (this.controllers.has(type)) {
          this.controllers.get(type)?.load(group[type]);
        } else {
          this.unknow.load(group[type]);
        }
      }
    });
  }

  clear() {
    this.controllers.forEach((controller) => {
      controller.clear();
    });
  }

  moving(position: [number, number]) {
    this.controllers.forEach((controller) => {
      controller.moving(position);
    });
  }

  private get = {
    color: (type: RoadObjectType) => {
      switch (type) {
        case RoadObjectType.FireHydrant:
          return ColorTool.map.red;
        case RoadObjectType.BusStation:
          return ColorTool.map.blue;
        case RoadObjectType.TrashCan:
          return ColorTool.map.green;
        case RoadObjectType.Passage:
          return ColorTool.map.orange;
        default:
          return ColorTool.map.gray;
      }
    },
  };
}
