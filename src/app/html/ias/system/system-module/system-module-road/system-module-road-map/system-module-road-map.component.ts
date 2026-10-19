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
import { Road } from '../../../../../../common/data-core/models/arm/geographic/road.model';
import { GlobalStorage } from '../../../../../../common/storage/global.storage';
import { SystemModuleRoadMapAMapController } from './controller/amap/system-module-road-map-amap.controller';
import { SystemModuleRoadMapPositionController } from './controller/system-module-road-map-position.controller';
import { SystemModuleRoadMapController } from './controller/system-module-road-map.controller';

@Component({
  selector: 'ias-system-module-road-map',
  imports: [CommonModule],
  templateUrl: './system-module-road-map.component.html',
  styleUrl: './system-module-road-map.component.less',
  providers: [
    SystemModuleRoadMapController,
    SystemModuleRoadMapAMapController,
    SystemModuleRoadMapPositionController,
  ],
})
export class SystemModuleRoadMapComponent
  implements OnChanges, OnInit, OnDestroy
{
  @Input() creating = false;
  @Input() editing = false;

  @Input() datas: Road[] = [];
  @Output() create = new EventEmitter<[number, number][]>();
  @Input() selected?: Road;
  @Output('change') _change = new EventEmitter<[number, number][]>();

  constructor(
    public controller: SystemModuleRoadMapController,
    private global: GlobalStorage,
  ) {}

  private subscription = new Subscription();

  /**
   * 用当前用户所属城市兜底。地图建出来时 AMap 的缺省视野在 [0,0]（海面，
   * 一张瓦片都没有），而表格那趟请求回来之前（或者它报错、一直不回来的时候）
   * 没有任何人给地图定过视野，看着就跟「地图没加载出来」一样。
   * 兜底自带 500ms 观察期（LastResortTool），路网一旦画出来并 claim() 就自动作废
   */
  private city() {
    this.global.user.get().then((user) => {
      if (user.Description) {
        this.controller.amap.city(user.Description);
      }
    });
  }

  ngOnInit(): void {
    // 先安排、后取数：不能等表格回来再决定要不要兜底，
    // 那中间的空档正是「地图空白」出现的地方
    this.city();

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
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
    this.controller.amap.destroy();
  }
  ngOnChanges(changes: SimpleChanges): void {
    this.change.datas(changes['datas']);
    this.change.creating(changes['creating']);
    this.change.selected(changes['selected']);
    this.change.editing(changes['editing']);
  }

  change = {
    datas: (data: SimpleChange) => {
      if (data && !data.firstChange) {
        if (this.datas.length > 0) {
          this.controller.amap.load(this.datas);
        } else {
          // 空结果也要把上一趟画的线抹掉，否则表格空了地图上还挂着旧线
          this.controller.amap.clear();
          this.city();
        }
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
    creating: (data: SimpleChange) => {
      if (data && !data.firstChange) {
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
      if (data && !data.firstChange) {
        this.controller.amap.editor.get().then((editor) => {
          if (this.editing && this.selected) {
            editor.open(this.selected.Id);
          } else {
            editor.close();
          }
        });
      }
    },
  };
}
