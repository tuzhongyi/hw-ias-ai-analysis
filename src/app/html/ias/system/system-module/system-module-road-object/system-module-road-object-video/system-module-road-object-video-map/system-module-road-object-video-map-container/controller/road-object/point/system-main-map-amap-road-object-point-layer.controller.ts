import { EventEmitter } from '@angular/core';
import { RoadObject } from '../../../../../../../../../common/data-core/models/arm/geographic/road-object.model';
import { ColorTool } from '../../../../../../../../../common/tools/color/color.tool';

import { RoadObjectType } from '../../../../../../../../../common/data-core/enums/road/road-object/road-object-type.enum';
import { SystemMainMapAMapRoadObjectPointController } from './system-main-map-amap-road-object-point.controller';

export class SystemMainMapAMapRoadObjectPointLayerController {
  event = {
    move: new EventEmitter<RoadObject>(),
  };
  constructor(container: Loca.Container) {
    this.firehydrant = new SystemMainMapAMapRoadObjectPointController(
      container,
      ColorTool.red
    );
    this.busstation = new SystemMainMapAMapRoadObjectPointController(
      container,
      ColorTool.blue
    );
    this.trashcan = new SystemMainMapAMapRoadObjectPointController(
      container,
      ColorTool.green
    );
    this.passage = new SystemMainMapAMapRoadObjectPointController(
      container,
      ColorTool.orange
    );
    this.regist();
  }

  private firehydrant: SystemMainMapAMapRoadObjectPointController;
  private busstation: SystemMainMapAMapRoadObjectPointController;
  private trashcan: SystemMainMapAMapRoadObjectPointController;
  private passage: SystemMainMapAMapRoadObjectPointController;

  private regist() {
    this.firehydrant.event.move.subscribe((x) => {
      this.event.move.emit(x as RoadObject);
    });
    this.busstation.event.move.subscribe((x) => {
      this.event.move.emit(x as RoadObject);
    });
    this.trashcan.event.move.subscribe((x) => {
      this.event.move.emit(x as RoadObject);
    });
    this.passage.event.move.subscribe((x) => {
      this.event.move.emit(x as RoadObject);
    });
  }

  async load(datas: RoadObject[]) {
    let point = {
      firehydrant: datas.filter(
        (x) => x.ObjectType === RoadObjectType.FireHydrant
      ),
      busstation: datas.filter(
        (x) => x.ObjectType === RoadObjectType.BusStation
      ),
      trashcan: datas.filter((x) => x.ObjectType === RoadObjectType.TrashCan),
      passage: datas.filter((x) => x.ObjectType === RoadObjectType.Passage),
    };

    if (point.firehydrant.length > 0) {
      this.firehydrant.load(point.firehydrant);
    }
    if (point.busstation.length > 0) {
      this.busstation.load(point.busstation);
    }
    if (point.trashcan.length > 0) {
      this.trashcan.load(point.trashcan);
    }
    if (point.passage.length > 0) {
      this.passage.load(point.passage);
    }
  }

  clear() {
    this.firehydrant.clear();
    this.busstation.clear();
    this.trashcan.clear();
    this.passage.clear();
  }

  moving(position: [number, number]) {
    this.firehydrant.moving(position);
    this.busstation.moving(position);
    this.trashcan.moving(position);
    this.passage.moving(position);
  }
}
