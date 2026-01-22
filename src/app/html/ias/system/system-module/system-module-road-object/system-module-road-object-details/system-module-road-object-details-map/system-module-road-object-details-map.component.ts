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
import { GeoTool } from '../../../../../../../common/tools/geo-tool/geo.tool';
import { wait } from '../../../../../../../common/tools/wait';
import { SystemModuleRoadObjectMapBusiness } from '../../system-module-road-object-map/system-module-road-object-map.business';
import { SystemModuleRoadObjectDetailsMapController } from './controller/system-module-road-object-details-map.controller';

@Component({
  selector: 'ias-system-module-road-object-details-map',
  imports: [CommonModule],
  templateUrl: './system-module-road-object-details-map.component.html',
  styleUrl: './system-module-road-object-details-map.component.less',
  providers: [SystemModuleRoadObjectMapBusiness],
})
export class SystemModuleRoadObjectDetailsMapComponent
  implements OnChanges, OnInit, OnDestroy
{
  @Input() position: [number, number] = [0, 0];
  @Output() positionChange = new EventEmitter<[number, number]>();
  @Input() type: number = 0;

  constructor(private business: SystemModuleRoadObjectMapBusiness) {}

  private subscription = new Subscription();
  public controller = new SystemModuleRoadObjectDetailsMapController(
    this.subscription
  );
  private loaded = false;
  private load = {
    road: async () => {
      let datas = await this.business.road();
      let polylines = await this.controller.road.load(datas);
      let center = await this.controller.map.focus(polylines);
      this.controller.object.load(this.type, center);
      if (!GeoTool.point.check(this.position)) {
        this.position = [...center];
        this.positionChange.emit(this.position);
      }
      this.loaded = true;
    },
  };
  private regist() {
    let sub = this.controller.event.position.subscribe((x) => {
      this.position = [...x];
      this.positionChange.emit(this.position);
    });
    this.subscription.add(sub);
  }
  ngOnInit(): void {
    this.load.road();
    this.regist();
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
    this.controller.map.destroy();
  }
  private change = {
    position: (change: SimpleChange) => {
      if (change) {
        if (GeoTool.point.check(this.position)) {
          wait(() => {
            return this.loaded;
          }).then(() => {
            this.controller.object.set.position(this.position);
            this.controller.map.move(this.position);
          });
        }
      }
    },
    type: (change: SimpleChange) => {
      if (change) {
        this.controller.object.set.type(this.type);
      }
    },
  };
  ngOnChanges(changes: SimpleChanges): void {
    this.change.position(changes['position']);
    this.change.type(changes['type']);
  }
}
