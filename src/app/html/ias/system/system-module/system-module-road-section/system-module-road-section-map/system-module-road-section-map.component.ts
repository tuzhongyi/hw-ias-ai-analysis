import { CommonModule } from '@angular/common';
import {
  Component,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChange,
  SimpleChanges,
} from '@angular/core';
import { Subscription } from 'rxjs';
import { RoadSection } from '../../../../../../common/data-core/models/arm/geographic/road-section.model';
import { SystemModuleRoadSectionMapAMapController } from './controller/amap/system-module-road-section-map-amap.controller';
import { SystemModuleRoadSectionMapPositionController } from './controller/system-module-road-section-map-position.controller';
import { SystemModuleRoadSectionMapController } from './controller/system-module-road-section-map.controller';
import { SystemModuleRoadSectionMapBusiness } from './system-module-road-section-map.business';

@Component({
  selector: 'ias-system-module-road-section-map',
  imports: [CommonModule],
  templateUrl: './system-module-road-section-map.component.html',
  styleUrl: './system-module-road-section-map.component.less',
  providers: [
    SystemModuleRoadSectionMapController,
    SystemModuleRoadSectionMapAMapController,
    SystemModuleRoadSectionMapPositionController,
    SystemModuleRoadSectionMapBusiness,
  ],
})
export class SystemModuleRoadSectionMapComponent
  implements OnChanges, OnInit, OnDestroy
{
  @Input() datas: RoadSection[] = [];
  @Input() selected?: RoadSection;

  constructor(
    public controller: SystemModuleRoadSectionMapController,
    private business: SystemModuleRoadSectionMapBusiness,
  ) {}

  private subscription = new Subscription();

  /**
   * 用当前用户所属城市兜底。地图建出来时 AMap 的缺省视野在 [0,0]（海面，
   * 一张瓦片都没有），没人给它定过视野的话看着就跟「地图没加载出来」一样。
   * 兜底自带 500ms 观察期（LastResortTool），路网/路段一旦画出来并 claim() 就自动作废
   */
  private city() {
    this.business.fallback().then(({ division, locator }) => {
      this.controller.map.city(division, locator);
    });
  }

  private load = {
    road: async () => {
      try {
        let datas = await this.business.road();
        await this.controller.road.load(datas);
      } catch (e) {}
    },
  };
  ngOnInit(): void {
    // 先安排、后取数：不能等路网/表格回来再决定要不要兜底，
    // 那中间的空档正是「地图空白」出现的地方
    this.city();

    this.load.road();
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
    this.controller.map.destroy();
  }
  ngOnChanges(changes: SimpleChanges): void {
    this.change.datas(changes['datas']);
    this.change.selected(changes['selected']);
  }

  change = {
    datas: (data: SimpleChange) => {
      if (data && !data.firstChange) {
        this.controller.amap.load(this.datas);
      }
    },
    selected: (data: SimpleChange) => {
      if (data && !data.firstChange) {
        if (this.selected) {
          this.controller.amap.select(this.selected.Id);
        } else {
          this.controller.amap.blur();
          this.controller.amap.focus();
        }
      }
    },
  };
}
