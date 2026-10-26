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
import { GisPoint } from '../../../../../../../common/data-core/models/arm/gis-point.model';
import { SystemModuleRoadAreaDetailsMapAMapController } from './controller/amap/system-module-road-area-details-map-amap.controller';
import { SystemModuleRoadAreaDetailsMapPositionController } from './controller/system-module-road-area-details-map-position.controller';
import { SystemModuleRoadAreaDetailsMapController } from './controller/system-module-road-area-details-map.controller';
import { SystemModuleRoadAreaDetailsMapBusiness } from './system-module-road-area-details-map.business';

@Component({
  selector: 'ias-system-module-road-area-details-map',
  imports: [CommonModule],
  templateUrl: './system-module-road-area-details-map.component.html',
  styleUrl: './system-module-road-area-details-map.component.less',
  providers: [
    SystemModuleRoadAreaDetailsMapController,
    SystemModuleRoadAreaDetailsMapAMapController,
    SystemModuleRoadAreaDetailsMapPositionController,
    SystemModuleRoadAreaDetailsMapBusiness,
  ],
})
export class SystemModuleRoadAreaDetailsMapComponent
  implements OnChanges, OnInit, OnDestroy
{
  @Input() creating = false;
  @Input() editing = false;

  @Input() datas: GisPoint[] = [];
  @Output() create = new EventEmitter<[number, number][]>();
  @Output('change') _change = new EventEmitter<[number, number][]>();

  constructor(
    public controller: SystemModuleRoadAreaDetailsMapController,
    private business: SystemModuleRoadAreaDetailsMapBusiness,
  ) {}

  private subscription = new Subscription();
  private load = {
    road: () => {
      this.business
        .road()
        .then((datas) => {
          this.controller.road.load(datas).then((x) => {
            if (this.creating) {
              this.controller.map.focus(x);
            }
          });
        })
        .catch((e) => {
          this.business.fallback().then(({ division, locator }) => {
            this.controller.map.city(division, locator);
          });
        });
    },
    areas: () => {
      // 只有新建时才铺：编辑时地图上要干净的只留正在改的那一个区域
      if (!this.creating) {
        return;
      }
      this.business
        .areas()
        .then((datas) => {
          this.controller.areas.load(datas);
        })
        .catch(() => {
          // 参考层拿不到就当没有，别挡着画图
        });
    },
  };
  ngOnInit(): void {
    this.controller.amap.creator.get().then((creator) => {
      let sub = creator.create.subscribe((x) => {
        this.create.emit(x);
      });
      this.subscription.add(sub);
    });
    this.controller.amap.editor.get().then((editor) => {
      let sub = editor.change.subscribe((x) => {
        this._change.emit(x);
      });
      this.subscription.add(sub);
    });

    this.load.road();
    this.load.areas();
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
    this.controller.map.destroy();
  }
  ngOnChanges(changes: SimpleChanges): void {
    this.change.datas(changes['datas']);
    this.change.creating(changes['creating']);
    this.change.editing(changes['editing']);
  }

  change = {
    datas: (data: SimpleChange) => {
      if (data) {
        if (this.datas.length > 0) {
          this.controller.amap.load(this.datas).then((x) => {
            this.controller.map.focus(x);
            // load() 内部才开始建这个多边形，编辑控件必须等它建好再挂，否则拿不到 target
            if (this.editing) {
              this.controller.amap.editor.get().then((editor) => {
                editor.open();
              });
            }
          });
        }
      }
    },
    creating: (data: SimpleChange) => {
      if (data) {
        this.controller.amap.creator.get().then((creator) => {
          if (this.creating) {
            creator.open();
          } else {
            creator.clear();
            creator.close();
          }
        });
      }
    },
    editing: (data: SimpleChange) => {
      if (data) {
        this.controller.amap.editor.get().then((editor) => {
          if (this.editing) {
            editor.open();
          } else {
            editor.close();
          }
        });
      }
    },
  };
}
