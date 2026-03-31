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
import { GeoTool } from '../../../../../../../common/tools/geo-tool/geo.tool';
import { wait } from '../../../../../../../common/tools/wait';
import { IASMapRoadBusiness } from '../../../../../share/map/business/ias-map-road.business';
import { SystemModuleRoadPointDetailsMapController } from './controller/system-module-road-point-details-map.controller';

@Component({
  selector: 'ias-system-module-road-point-details-map',
  imports: [],
  templateUrl: './system-module-road-point-details-map.component.html',
  styleUrl: './system-module-road-point-details-map.component.less',
  providers: [IASMapRoadBusiness],
})
export class SystemModuleRoadPointDetailsMapComponent
  implements OnChanges, OnInit, OnDestroy
{
  @Input() location: [number, number] = [0, 0];
  @Output() locationChange = new EventEmitter<[number, number]>();
  @Input() raduis? = 15;
  @Output() raduisChange = new EventEmitter<number>();

  constructor(private business: IASMapRoadBusiness) {}

  private subscription = new Subscription();
  private controller = new SystemModuleRoadPointDetailsMapController(
    this.subscription
  );
  private inited = false;

  private change = {
    location: (simple: SimpleChange) => {
      if (simple) {
        if (GeoTool.point.check(this.location)) {
          this.controller.map.move(this.location);
        }
      }
    },
  };

  ngOnChanges(changes: SimpleChanges): void {
    this.change.location(changes['location']);
    this.load.raduis();
  }

  private load = {
    road: async () => {
      let datas = await this.business.road();
      let polylines = await this.controller.road.load(datas);
      let center = await this.controller.map.focus(polylines, true);
      if (!GeoTool.point.check(this.location)) {
        this.location = center;
        this.locationChange.emit(center);
      }
      this.inited = true;
    },
    raduis: async () => {
      await wait(() => {
        return this.inited;
      });
      if (GeoTool.point.check(this.location)) {
        this.controller.circle.set({
          radius: this.raduis,
          center: this.location,
        });
      }
    },
  };

  ngOnInit(): void {
    this.regist();
    this.load.road();
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
    this.controller.map.destroy();
  }

  private regist() {
    let sub_1 = this.controller.event.circel.change.subscribe((x) => {
      this.raduis = x;
      this.raduisChange.emit(x);
    });
    this.subscription.add(sub_1);
    let sub_2 = this.controller.event.circel.move.subscribe((x) => {
      this.location = x;
      this.locationChange.emit(x);
    });
    this.subscription.add(sub_2);
  }
}
