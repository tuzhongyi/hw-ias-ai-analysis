import { EventEmitter } from '@angular/core';
import { RoadObjectState } from '../../../../../../../../common/data-core/enums/road/road-object/road-object-state.enum';
import { RoadObject } from '../../../../../../../../common/data-core/models/arm/geographic/road-object.model';
import { ArrayTool } from '../../../../../../../../common/tools/array-tool/array.tool';
import { ColorTool } from '../../../../../../../../common/tools/color/color.tool';
import { EnumTool } from '../../../../../../../../common/tools/enum-tool/enum.tool';
import { IASMapAMapRoadObjectPointController } from './ias-map-amap-road-object-point.controller';

export class IASMapAMapRoadObjectPointLayerController {
  event = {
    move: new EventEmitter<RoadObject>(),
  };
  constructor(container: Loca.Container, init = true) {
    this.unknow = new IASMapAMapRoadObjectPointController(
      container,
      ColorTool.map.gray
    );
    if (init) {
      this.init(container);
    }
  }

  private controllers = new Map<number, IASMapAMapRoadObjectPointController>();
  private unknow: IASMapAMapRoadObjectPointController;

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

  protected init(container: Loca.Container) {
    let states = EnumTool.values(RoadObjectState);

    states.forEach((type) => {
      let color = this.get.color(type);
      let controller = new IASMapAMapRoadObjectPointController(
        container,
        color
      );
      this.controllers.set(type, controller);
    });

    this.regist();
  }

  async load(datas: RoadObject[]) {
    if (datas.length == 0) {
      this.clear();
      return;
    }
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

  protected get = {
    color: (state: RoadObjectState) => {
      switch (state) {
        case RoadObjectState.Normal:
          return ColorTool.map.cyan;
        case RoadObjectState.Disappear:
          return ColorTool.map.red;
        case RoadObjectState.Breakage:
          return ColorTool.map.yellow;
        case RoadObjectState.None:
          return ColorTool.map.green;
        default:
          return ColorTool.map.gray;
      }
    },
  };
}
