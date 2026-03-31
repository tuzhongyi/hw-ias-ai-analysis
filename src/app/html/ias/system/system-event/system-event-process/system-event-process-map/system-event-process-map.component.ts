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
import { MobileEventRecord } from '../../../../../../common/data-core/models/arm/event/mobile-event-record.model';
import { SystemEventProcessMapController } from './controller/system-event-process-map.controller';

@Component({
  selector: 'ias-system-event-process-map',
  imports: [],
  templateUrl: './system-event-process-map.component.html',
  styleUrl: './system-event-process-map.component.less',
})
export class SystemEventProcessMapComponent
  implements OnChanges, OnInit, OnDestroy
{
  @Input() data?: MobileEventRecord;
  @Input() raduis? = 15;
  @Output() raduisChange = new EventEmitter<number>();
  @Input() changing = false;

  constructor() {}

  private subscription = new Subscription();
  private controller = new SystemEventProcessMapController(this.subscription);

  private change = {
    changing: async (simple: SimpleChange) => {
      if (simple && !simple.firstChange) {
        if (!this.data || !this.data.Location) return;
        let gcj02 = this.data.Location.GCJ02;
        let center = [gcj02.Longitude, gcj02.Latitude] as [number, number];
        if (this.changing) {
          await this.controller.marker.remove();
          await this.controller.circle.set({
            radius: this.raduis,
            center: center,
          });
        } else {
          await this.controller.circle.clear();
          await this.controller.marker.add(this.data);
        }
      }
    },
    raduis: (simple: SimpleChange) => {
      if (simple) {
        if (!this.data || !this.data.Location) return;
        let gcj02 = this.data.Location.GCJ02;
        let center = [gcj02.Longitude, gcj02.Latitude] as [number, number];
        if (this.changing) {
          this.controller.circle.set({
            radius: this.raduis,
            center: center,
          });
        }
      }
    },
    data: async (simple: SimpleChange) => {
      if (simple) {
        if (this.data) {
          let marker = await this.controller.marker.add(this.data);
          this.controller.map.focus(marker);
        } else {
          this.controller.marker.remove();
        }
      }
    },
  };

  ngOnChanges(changes: SimpleChanges): void {
    this.change.data(changes['data']);
    this.change.changing(changes['changing']);
    this.change.raduis(changes['raduis']);
  }
  ngOnInit(): void {
    this.regist();
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
    this.controller.map.destroy();
  }

  private regist() {
    let sub = this.controller.event.circel.change.subscribe((x) => {
      this.raduis = x;
      this.raduisChange.emit(x);
    });
    this.subscription.add(sub);
  }
}
