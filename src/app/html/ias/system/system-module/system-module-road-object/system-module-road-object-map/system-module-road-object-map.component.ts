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

  constructor(private business: SystemModuleRoadObjectMapBusiness) {}

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

  private controller = new PromiseValue<
    SystemModuleRoadObjectMapController<TRoadObject>
  >();
  // public controller = new SystemModuleRoadObjectMapController<TRoadObject>(

  //   this.subscription,
  // );
  private load = {
    road: async () => {
      let controller = await this.controller.get();
      let datas = await this.business.road();
      let polylines = await controller.road.load(datas);
      if (polylines.length > 0) {
        await controller.map.focus(polylines);
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
        controller.object.load(this.datas);
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
