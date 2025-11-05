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
import { FormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';
import { GisPoint } from '../../../../../../../common/data-core/models/arm/gis-point.model';
import { wait } from '../../../../../../../common/tools/wait';
import { SystemModuleGpsTaskDetailsAMapController } from './controller/system-module-gps-task-details-amap.controller';

@Component({
  selector: 'ias-system-module-gps-task-details-map',
  imports: [CommonModule, FormsModule],
  templateUrl: './system-module-gps-task-details-map.component.html',
  styleUrl: './system-module-gps-task-details-map.component.less',
  providers: [SystemModuleGpsTaskDetailsAMapController],
})
export class SystemModuleGpsTaskDetailsMapComponent
  implements OnInit, OnChanges, OnDestroy
{
  @Input() data?: GisPoint;
  @Output() dataChange = new EventEmitter<GisPoint>();

  @Input() load?: EventEmitter<GisPoint>;

  @Input() resetable: boolean = false;

  constructor(private controller: SystemModuleGpsTaskDetailsAMapController) {}

  private original?: GisPoint;
  private subscription = new Subscription();

  get same() {
    if (!this.data || !this.original) return true;
    return (
      this.data.Latitude === this.original.Latitude &&
      this.data.Longitude === this.original.Longitude
    );
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.change.data(changes['data']);
    this.change.resetable(changes['resetable']);
  }

  private change = {
    data: (simple: SimpleChange) => {
      if (simple) {
        if (this.data) {
          this.controller.load(this.data);
        }
      }
    },
    resetable: (simple: SimpleChange) => {
      if (simple) {
        if (this.resetable) {
          wait(() => {
            return !!this.data;
          }).then(() => {
            this.original = Object.assign(new GisPoint(), this.data);
          });
        }
      }
    },
  };

  ngOnInit(): void {
    if (this.load) {
      let sub = this.load.subscribe((x) => {
        this.controller.load(x);
      });
      this.subscription.add(sub);
    }
    this.controller.dragging.subscribe((x) => {
      if (this.data) {
        this.data.Longitude = x[0];
        this.data.Latitude = x[1];
        this.dataChange.emit(this.data);
      }
    });
    this.controller.dragend.subscribe((x) => {
      if (this.data) {
        this.data.Longitude = x[0];
        this.data.Latitude = x[1];
        this.dataChange.emit(this.data);
      }
    });
  }

  ngOnDestroy(): void {
    this.controller.destroy();
    this.subscription.unsubscribe();
  }

  on = {
    reset: (e: Event) => {
      if (this.original) {
        this.controller.load(this.original);
        this.data = Object.assign(new GisPoint(), this.original);
        this.dataChange.emit(this.data);
      }
    },
  };
}
