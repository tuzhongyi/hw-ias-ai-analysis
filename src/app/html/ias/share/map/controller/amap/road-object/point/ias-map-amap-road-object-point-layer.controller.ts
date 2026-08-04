import { EventEmitter } from '@angular/core';
import { RoadObjectState } from '../../../../../../../../common/data-core/enums/road/road-object/road-object-state.enum';
import { IRoadObject } from '../../../../../../../../common/data-core/models/arm/geographic/road-object.interface';
import { RoadObject } from '../../../../../../../../common/data-core/models/arm/geographic/road-object.model';
import { ArrayTool } from '../../../../../../../../common/tools/array-tool/array.tool';
import { ColorTool } from '../../../../../../../../common/tools/color/color.tool';
import { EnumTool } from '../../../../../../../../common/tools/enum-tool/enum.tool';
import { IASMapAMapPathHelper } from '../../path/ias-map-amap-path.helper';
import { IASMapAMapRoadObjectPointController } from './ias-map-amap-road-object-point.controller';

export class IASMapAMapRoadObjectPointLayerController<
  TRoadObject extends IRoadObject = RoadObject,
> {
  event = {
    move: new EventEmitter<TRoadObject>(),
  };
  constructor(container: Loca.Container, init = true) {
    this.unknow = new IASMapAMapRoadObjectPointController(
      container,
      ColorTool.map.gray,
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
        this.event.move.emit(x as TRoadObject);
      });
    });

    this.unknow.event.move.subscribe((x) => {
      this.event.move.emit(x as TRoadObject);
    });
  }

  protected init(container: Loca.Container) {
    let states = EnumTool.values(RoadObjectState);

    states.forEach((type) => {
      let color = this.get.color(type);
      let controller = new IASMapAMapRoadObjectPointController(
        container,
        color,
      );
      this.controllers.set(type, controller);
    });

    this.regist();
  }

  async load(datas: TRoadObject[]) {
    if (datas.length == 0) {
      this.clear();
      return;
    }
    let group = ArrayTool.groupBy(datas, (data) => {
      return (data as any).ObjectState;
    });

    Object.keys(group).forEach((key) => {
      let state = parseInt(key);
      let items = group[key];
      if (items && items.length > 0) {
        if (!isNaN(state) && this.controllers.has(state)) {
          this.controllers.get(state)?.load(items);
        } else {
          this.unknow.load(items);
        }
      }
    });
  }

  clear() {
    this.controllers.forEach((controller) => {
      controller.clear();
    });
    this.unknow.clear();
  }

  moving(position: [number, number], pixel = true) {
    this.controllers.forEach((controller) => {
      controller.moving(position, pixel);
    });
    this.unknow.moving(position, pixel);
  }

  protected get = {
    color: (state: RoadObjectState) => {
      return IASMapAMapPathHelper.color.from.road.object.state(state);
    },
  };
}
