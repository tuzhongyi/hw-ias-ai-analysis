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
import { RoadObject } from '../../../../../../common/data-core/models/arm/geographic/road-object.model';
import { SystemModuleRoadObjectMapController } from './controller/system-module-road-object-map.controller';
import { SystemModuleRoadObjectMapBusiness } from './system-module-road-object-map.business';

@Component({
  selector: 'ias-system-module-road-object-map',
  imports: [CommonModule],
  templateUrl: './system-module-road-object-map.component.html',
  styleUrl: './system-module-road-object-map.component.less',
  providers: [SystemModuleRoadObjectMapBusiness],
})
export class SystemModuleRoadObjectMapComponent
  implements OnChanges, OnInit, OnDestroy
{
  @Input() datas: RoadObject[] = [];
  @Input() selected?: RoadObject;
  @Output() selectedChange = new EventEmitter<RoadObject>();
  @Output() itemdblclick = new EventEmitter<RoadObject>();

  @Input() itemover?: EventEmitter<RoadObject>;
  @Input() itemout?: EventEmitter<RoadObject>;

  constructor(private business: SystemModuleRoadObjectMapBusiness) {}
  private subscription = new Subscription();
  public controller = new SystemModuleRoadObjectMapController(
    this.subscription
  );
  private load = {
    road: async () => {
      let datas = await this.business.road();
      let polylines = await this.controller.road.load(datas);
      let center = await this.controller.map.focus(polylines);
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
        let sub = this.controller.object.event.dblclick.subscribe((x) => {
          this.itemdblclick.emit(x);
        });
        this.subscription.add(sub);
      },
    },
  };
}
