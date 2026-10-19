import { CommonModule } from '@angular/common';
import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  SimpleChange,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { Subscription } from 'rxjs';
import { IRoadObject } from '../../../../../../common/data-core/models/arm/geographic/road-object.interface';
import { RoadObject } from '../../../../../../common/data-core/models/arm/geographic/road-object.model';
import { GlobalStorage } from '../../../../../../common/storage/global.storage';
import { PromiseValue } from '../../../../../../common/view-models/value.promise';
import { SystemModuleRoadObjectMapController } from './controller/system-module-road-object-map.controller';
import { SystemModuleRoadObjectMapBusiness } from './system-module-road-object-map.business';

@Component({
  selector: 'ias-system-module-road-object-map',
  imports: [CommonModule],
  templateUrl: './system-module-road-object-map.component.html',
  styleUrl: './system-module-road-object-map.component.less',
  providers: [SystemModuleRoadObjectMapBusiness],
})
export class SystemModuleRoadObjectMapComponent<
  TRoadObject extends IRoadObject<any> = RoadObject,
>
  implements OnChanges, OnInit, OnDestroy
{
  @Input() datas: TRoadObject[] = [];
  @Input() selected?: TRoadObject;
  @Output() selectedChange = new EventEmitter<TRoadObject>();
  @Output() itemdblclick = new EventEmitter<TRoadObject>();

  @Input() itemover?: EventEmitter<TRoadObject>;
  @Input() itemout?: EventEmitter<TRoadObject>;

  constructor(
    private business: SystemModuleRoadObjectMapBusiness,
    private global: GlobalStorage,
  ) {}

  @ViewChild('container')
  set container(value: ElementRef<HTMLDivElement>) {
    if (value) {
      let controller = new SystemModuleRoadObjectMapController<TRoadObject>(
        value.nativeElement,
        this.subscription,
      );
      this.controller.set(controller);
    }
  }

  private subscription = new Subscription();
  /** 数据第一次装进来的时候定过视野没有 */
  private focused = false;

  private controller = new PromiseValue<
    SystemModuleRoadObjectMapController<TRoadObject>
  >();
  // public controller = new SystemModuleRoadObjectMapController<TRoadObject>(

  //   this.subscription,
  // );
  private load = {
    road: async () => {
      let controller = await this.controller.get();
      try {
        let datas = await this.business.road();
        let polylines = await controller.road.load(datas);
        if (polylines.length > 0) {
          await controller.map.focus(polylines);
        }
      } catch (e) {
        let user = await this.global.user.get();
        if (user.Description) {
          controller.map.city(user.Description);
        }
      }
    },
  };

  ngOnInit(): void {
    this.regist.input.load();
    this.regist.output.load();
    this.load.road();
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
    if (this.controller.existed) {
      this.controller.get().then((x) => {
        x.map.destroy();
        this.controller.clear();
      });
    }
  }
  private change = {
    selected: async (change: SimpleChange) => {
      if (change) {
        if (this.selected) {
          let position: [number, number] = [
            this.selected.Location.GCJ02.Longitude,
            this.selected.Location.GCJ02.Latitude,
          ];
          let controller = await this.controller.get();
          controller.map.move(position, 19);
          controller.object.select(this.selected);
        }
      }
    },
    datas: async (change: SimpleChange) => {
      if (change) {
        let controller = await this.controller.get();
        await controller.object.clear();
        let markers = await controller.object.load(this.datas);
        // 只看 firstChange 是赌：首次变更时表格通常还是空的（firstChange 为真但没数据），
        // 等上面两步 await 走完数据才回来，那就永远轮不到定位。
        // 改成「数据第一次不为空时定一次」，翻页/筛选换数据不再动视野。
        if (this.datas.length > 0 && !this.focused) {
          this.focused = true;
          controller.map.focus(markers);
        }
      }
    },
  };
  ngOnChanges(changes: SimpleChanges): void {
    this.change.selected(changes['selected']);
    this.change.datas(changes['datas']);
  }

  private regist = {
    input: {
      load: () => {
        this.regist.input.item.over();
        this.regist.input.item.out();
      },
      item: {
        over: () => {
          if (this.itemover) {
            let sub = this.itemover.subscribe((x) => {
              this.controller.get().then((ctr) => {
                ctr.object.over(x);
              });
            });
            this.subscription.add(sub);
          }
        },
        out: () => {
          if (this.itemout) {
            let sub = this.itemout.subscribe((x) => {
              this.controller.get().then((ctr) => {
                ctr.object.out(x);
              });
            });
            this.subscription.add(sub);
          }
        },
      },
    },
    output: {
      load: () => {
        this.regist.output.roadobject();
      },
      roadobject: async () => {
        let ctr = await this.controller.get();
        let sub_dblclick = ctr.object.event.dblclick.subscribe((x) => {
          this.itemdblclick.emit(x);
        });
        this.subscription.add(sub_dblclick);

        let sub_click = ctr.object.event.click.subscribe((x) => {
          this.selected = x;
          this.selectedChange.emit(x);
        });
        this.subscription.add(sub_click);
      },
    },
  };
}
