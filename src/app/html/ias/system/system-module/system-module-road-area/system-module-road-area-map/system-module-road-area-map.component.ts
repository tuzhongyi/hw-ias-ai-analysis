import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  SimpleChange,
  SimpleChanges,
} from '@angular/core';
import { Subscription } from 'rxjs';
import { RoadArea } from '../../../../../../common/data-core/models/arm/geographic/road-area.model';
import { SystemModuleRoadAreaMapAMapController } from './controller/amap/system-module-road-area-map-amap.controller';
import { SystemModuleRoadAreaMapPositionController } from './controller/system-module-road-area-map-position.controller';
import { SystemModuleRoadAreaMapController } from './controller/system-module-road-area-map.controller';
import { SystemModuleRoadAreaMapBusiness } from './system-module-road-area-map.business';

@Component({
  selector: 'ias-system-module-road-area-map',
  imports: [CommonModule],
  templateUrl: './system-module-road-area-map.component.html',
  styleUrl: './system-module-road-area-map.component.less',
  providers: [
    SystemModuleRoadAreaMapController,
    SystemModuleRoadAreaMapAMapController,
    SystemModuleRoadAreaMapPositionController,
    SystemModuleRoadAreaMapBusiness,
  ],
})
export class SystemModuleRoadAreaMapComponent
  implements OnChanges, OnInit, OnDestroy
{
  @Input() datas: RoadArea[] = [];
  /** 数据变化时要不要顺带重新定位视野（删完区域只是刷新列表，不该把地图拽走） */
  @Input() fit = true;
  @Input() selected?: RoadArea;
  /** 点中地图上的多边形时，把该区域报给外面（表格据此选中对应行） */
  @Output() selectedChange = new EventEmitter<RoadArea>();

  constructor(
    public controller: SystemModuleRoadAreaMapController,
    private business: SystemModuleRoadAreaMapBusiness,
  ) {}

  private subscription = new Subscription();

  /**
   * 用当前用户所属城市兜底。地图建出来时 AMap 的缺省视野在 [0,0]（海面，
   * 一张瓦片都没有），没人给它定过视野的话看着就跟「地图没加载出来」一样。
   * 兜底自带 500ms 观察期（LastResortTool），路网/区域一旦画出来并 claim() 就自动作废
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

    this.regist.output.load();
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

  private regist = {
    output: {
      load: () => {
        let sub = this.controller.amap.event.area.click.subscribe((x) => {
          this.selected = x;
          this.selectedChange.emit(x);
        });
        this.subscription.add(sub);
      },
    },
  };

  change = {
    datas: (data: SimpleChange) => {
      if (data && !data.firstChange) {
        this.controller.amap.load(this.datas, this.fit);
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
