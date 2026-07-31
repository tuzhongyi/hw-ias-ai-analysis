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
import { RoadObjectStock } from '../../../../../../common/data-core/models/arm/geographic/road-object-stock.model';
import { SystemModuleRoadObjectStockMapController } from './controller/system-module-road-object-stock-map.controller';
import { SystemModuleRoadObjectStockMapBusiness } from './system-module-road-object-stock-map.business';

@Component({
  selector: 'ias-system-module-road-object-stock-map',
  imports: [CommonModule],
  templateUrl: './system-module-road-object-stock-map.component.html',
  styleUrl: './system-module-road-object-stock-map.component.less',
  providers: [SystemModuleRoadObjectStockMapBusiness],
})
export class SystemModuleRoadObjectStockMapComponent
  implements OnChanges, OnInit, OnDestroy
{
  @Input() datas: RoadObjectStock[] = [];
  @Input() selected?: RoadObjectStock;
  @Output() selectedChange = new EventEmitter<RoadObjectStock>();
  @Output() itemdblclick = new EventEmitter<RoadObjectStock>();

  @Input() itemover?: EventEmitter<RoadObjectStock>;
  @Input() itemout?: EventEmitter<RoadObjectStock>;

  constructor(private business: SystemModuleRoadObjectStockMapBusiness) {}
  private subscription = new Subscription();
  public controller = new SystemModuleRoadObjectStockMapController(
    this.subscription
  );
  private load = {
    road: async () => {
      let datas = await this.business.road();
      let polylines = await this.controller.road.load(datas);
      if (polylines.length > 0) {
        await this.controller.map.focus(polylines);
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
    this.controller.map.destroy();
  }
  private change = {
    selected: (change: SimpleChange) => {
      if (change) {
        if (this.selected) {
          let position: [number, number] = [
            this.selected.Location.GCJ02.Longitude,
            this.selected.Location.GCJ02.Latitude,
          ];
          this.controller.map.move(position, 19);
          this.controller.object.select(this.selected);
        }
      }
    },
    datas: (change: SimpleChange) => {
      if (change) {
        this.controller.object.clear().then((x) => {
          this.controller.object.load(this.datas);
        });
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
              this.controller.object.over(x);
            });
            this.subscription.add(sub);
          }
        },
        out: () => {
          if (this.itemout) {
            let sub = this.itemout.subscribe((x) => {
              this.controller.object.out(x);
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
      roadobject: () => {
        let sub_dblclick = this.controller.object.event.dblclick.subscribe(
          (x) => {
            this.itemdblclick.emit(x);
          }
        );
        this.subscription.add(sub_dblclick);

        let sub_click = this.controller.object.event.click.subscribe((x) => {
          this.selected = x;
          this.selectedChange.emit(x);
        });
        this.subscription.add(sub_click);
      },
    },
  };
}
