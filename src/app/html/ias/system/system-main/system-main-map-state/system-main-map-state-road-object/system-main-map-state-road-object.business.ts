import { Injectable } from '@angular/core';
import { RoadObjectState } from '../../../../../../common/data-core/enums/road/road-object/road-object-state.enum';
import { RoadObject } from '../../../../../../common/data-core/models/arm/geographic/road-object.model';
import { ColorTool } from '../../../../../../common/tools/color/color.tool';
import { LanguageTool } from '../../../../../../common/tools/language-tool/language.tool';
import { SystemMainMapStateItem } from '../system-main-map-state-item/system-main-map-state-item.model';

@Injectable()
export class SystemMainMapStateRoadObjectBusiness {
  constructor(private language: LanguageTool) {}

  load(datas: RoadObject[]) {
    let data = {
      none: datas.filter((x) => x.ObjectState == RoadObjectState.None),
      normal: datas.filter((x) => x.ObjectState == RoadObjectState.Normal),
      disappear: datas.filter(
        (x) => x.ObjectState == RoadObjectState.Disappear
      ),
      breakage: datas.filter((x) => x.ObjectState == RoadObjectState.Breakage),
    };

    return Promise.all([
      this.convert(RoadObjectState.None, data.none.length),
      this.convert(RoadObjectState.Normal, data.normal.length),
      this.convert(RoadObjectState.Breakage, data.breakage.length),
      this.convert(RoadObjectState.Disappear, data.disappear.length),
    ]);
  }

  private async convert(state: RoadObjectState, count: number) {
    let item = new SystemMainMapStateItem(state);
    item.name = await this.language.road.object.ObjectStates(state);
    item.color = this.get.color(state);
    item.value = count;
    item.state = state;
    return item;
  }

  private get = {
    color: (state: RoadObjectState) => {
      switch (state) {
        case RoadObjectState.None:
          return ColorTool.green;
        case RoadObjectState.Normal:
          return ColorTool.cyan;
        case RoadObjectState.Breakage:
          return ColorTool.redlight;
        case RoadObjectState.Disappear:
          return ColorTool.red;

        default:
          return ColorTool.gray;
      }
    },
  };
}
