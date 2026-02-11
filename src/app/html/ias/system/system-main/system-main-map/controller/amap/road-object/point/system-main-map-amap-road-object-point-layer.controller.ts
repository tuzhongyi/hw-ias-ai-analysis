import { EventEmitter } from '@angular/core';
import { RoadObject } from '../../../../../../../../../common/data-core/models/arm/geographic/road-object.model';
import { ColorTool } from '../../../../../../../../../common/tools/color/color.tool';

import { RoadObjectState } from '../../../../../../../../../common/data-core/enums/road/road-object/road-object-state.enum';
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
    let states = EnumTool.values(RoadObjectState);

    states.forEach((state) => {
      let color = this.get.color(state);
      let controller = new SystemMainMapAMapRoadObjectPointController(
        container,
        color
      );
      this.controllers.set(state, controller);
    });
  }

  async load(datas: RoadObject[]) {
    let group = ArrayTool.groupBy(datas, (data) => {
      return data.ObjectState;
    });

    Object.keys(group).forEach((key) => {
      let state = parseInt(key);
      let datas = group[state];
      if (datas && datas.length > 0) {
        if (this.controllers.has(state)) {
          this.controllers.get(state)?.load(group[state]);
        } else {
          this.unknow.load(group[state]);
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
    color: (state: RoadObjectState) => {
      switch (state) {
        case RoadObjectState.None:
          return ColorTool.map.green;
        case RoadObjectState.Normal:
          return ColorTool.map.cyan;
        case RoadObjectState.Breakage:
          return ColorTool.map.orange;
        case RoadObjectState.Disappear:
          return ColorTool.map.red;
        default:
          return ColorTool.map.gray;
      }
    },
  };
}
