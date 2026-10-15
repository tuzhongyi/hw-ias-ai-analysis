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
import { GlobalStorage } from '../../../../../../common/storage/global.storage';
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
    private global: GlobalStorage,
  ) {}

  private subscription = new Subscription();
  private load = {
    road: () => {
      this.business
        .road()
        .then((datas) => {
          this.controller.road.load(datas);
        })
        .catch((e) => {
          this.global.user.get().then((user) => {
            this.controller.map.city(user.GroupName);
          });
        });
    },
  };
  ngOnInit(): void {
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
