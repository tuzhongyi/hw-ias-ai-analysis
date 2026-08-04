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
import { RoadObjectState } from '../../../../../../../common/data-core/enums/road/road-object/road-object-state.enum';
import { RoadObjectType } from '../../../../../../../common/data-core/enums/road/road-object/road-object-type.enum';
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
  @Input() type?: RoadObjectType;
  @Input() state = RoadObjectState.None;
  @Input() get?: {
    address?: EventEmitter<[number, number]>;
    locate?: EventEmitter<[number, number]>;
  };
  @Output() address = new EventEmitter<string>();
  @Output() error = new EventEmitter<Error>();

  constructor(private business: SystemModuleRoadObjectMapBusiness) {}

  private subscription = new Subscription();
  public controller = new SystemModuleRoadObjectDetailsMapController(
    this.subscription,
  );
  private loaded = false;
  private center?: [number, number];
  private load = {
    road: async () => {
      try {
        let datas = await this.business.road();
        let polylines = await this.controller.road.load(datas);
        if (polylines.length > 0) {
          this.center = await this.controller.map.focus(polylines);
        }
      } catch (e) {
        console.warn('road data load failed, map will use default view', e);
      }
      if (!GeoTool.point.check(this.position) && this.center) {
        this.position = [...this.center];
        this.positionChange.emit(this.position);
      }
      this.loaded = true;
    },
  };
  private regist() {
    let sub_pos = this.controller.event.position.subscribe((x) => {
      this.position = [...x];
      this.positionChange.emit(this.position);
    });
    this.subscription.add(sub_pos);

    let sub_dbl = this.controller.event.dblclick.subscribe((x) => {
      this.position = [...x];
      this.positionChange.emit(this.position);
      this.controller.object.load(x, this.type);
    });
    this.subscription.add(sub_dbl);

    if (this.get) {
      if (this.get.address) {
        let sub = this.get.address.subscribe((x) => {
          this.business
            .address(x)
            .then((address) => {
              this.address.emit(address);
            })
            .catch((e) => {
              this.error.emit(e);
            });
        });
        this.subscription.add(sub);
      }
      if (this.get.locate) {
        let sub = this.get.locate.subscribe((x) => {
          this.controller.map.move(x);
        });
        this.subscription.add(sub);
      }
    }
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
            if (change.firstChange) {
              this.controller.map.move(this.position);
            }
          });
        }
      }
    },
    type: (change: SimpleChange) => {
      if (change) {
        this.controller.object.set.type(this.type);
      }
    },
    state: (change: SimpleChange) => {
      if (change) {
        this.controller.object.set.state(this.state);
      }
    },
  };
  ngOnChanges(changes: SimpleChanges): void {
    this.change.position(changes['position']);
    this.change.state(changes['state']);
    this.change.type(changes['type']);
  }
}
