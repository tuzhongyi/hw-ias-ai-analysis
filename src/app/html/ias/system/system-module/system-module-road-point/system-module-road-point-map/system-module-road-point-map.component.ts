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
import { RoadPoint } from '../../../../../../common/data-core/models/arm/geographic/road-point.model';
import { SystemModuleRoadPointMapController } from './controller/system-module-road-point-map.controller';
import { SystemModuleRoadPointMapBusiness } from './system-module-road-point-map.business';

@Component({
  selector: 'ias-system-module-road-point-map',
  imports: [CommonModule],
  templateUrl: './system-module-road-point-map.component.html',
  styleUrl: './system-module-road-point-map.component.less',
  providers: [SystemModuleRoadPointMapBusiness],
})
export class SystemModuleRoadPointMapComponent
  implements OnChanges, OnInit, OnDestroy
{
  @Input() datas: RoadPoint[] = [];
  @Input() selected?: RoadPoint;

  constructor(private business: SystemModuleRoadPointMapBusiness) {}

  private subscription = new Subscription();
  private controller = new SystemModuleRoadPointMapController(
    this.subscription,
  );

  private load = {
    road: async () => {
      // 城市兜底先安排上，再去取路网：兜底自带 500ms 观察期（LastResortTool），
      // 路网画出了线就由 focus() 接管视野，兜底自动作废。
      // 不能反过来写（等路网回来再决定要不要兜底）—— 那中间有个空档：
      // 路网请求慢、卡住或者报错的时候，地图建出来后一直没人给它定过视野，
      // 就停在 AMap 的默认位置上（那儿什么都没有），看着就跟「地图没加载出来」一样
      let city = this.business.division().then((division) => {
        this.controller.map.city(division.Name);
      });

      let polylines: AMap.Polyline[] = [];
      try {
        let datas = await this.business.road();
        polylines = await this.controller.road.load(datas);
      } catch (e) {}

      if (polylines.length > 0) {
        // 路网接管视野：这一步会 claim，城市兜底随即作废
        await this.controller.map.focus(polylines);
      }
      await city;
    },
  };

  private change = {
    datas: (change: SimpleChange) => {
      if (change) {
        this.controller.scatter.clear().then(() => {
          if (this.datas.length > 0) {
            this.controller.scatter.load(this.datas);
          }
        });
      }
    },
    selected: (change: SimpleChange) => {
      if (change && !change.firstChange) {
        if (this.selected) {
          this.controller.scatter.select(this.selected);
        } else {
          this.controller.scatter.blur();
        }
      }
    },
  };

  ngOnChanges(changes: SimpleChanges): void {
    this.change.datas(changes['datas']);
    this.change.selected(changes['selected']);
  }
  ngOnInit(): void {
    this.load.road();
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
    this.controller.map.destroy();
  }
}
