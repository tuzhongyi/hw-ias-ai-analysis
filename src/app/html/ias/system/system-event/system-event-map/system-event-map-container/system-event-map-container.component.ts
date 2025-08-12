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
import { SystemEventMapContainerBusiness } from './business/system-event-map-container.business';
import { SystemEventMapContainerController } from './controller/system-event-map-container.controller';

@Component({
  selector: 'ias-system-event-map-container',
  imports: [],
  templateUrl: './system-event-map-container.component.html',
  styleUrl: './system-event-map-container.component.less',
  providers: [
    SystemEventMapContainerController,
    SystemEventMapContainerBusiness,
  ],
})
export class SystemEventMapContainerComponent
  implements OnInit, OnChanges, OnDestroy
{
  @Input() records: MobileEventRecord[] = [];

  @Output() selected = new EventEmitter<MobileEventRecord>();
  @Input() focus?: EventEmitter<MobileEventRecord>;
  @Input() over?: EventEmitter<MobileEventRecord>;
  @Input() out?: EventEmitter<MobileEventRecord>;

  constructor(
    public controller: SystemEventMapContainerController,
    private business: SystemEventMapContainerBusiness
  ) {}
  private subscription = new Subscription();
  ngOnChanges(changes: SimpleChanges): void {
    this.change.records(changes['records']);
  }
  ngOnInit(): void {
    this.regist();
    this.load.road();
  }
  ngOnDestroy(): void {
    this.controller.amap.map.destory();
    this.subscription.unsubscribe();
  }
  private load = {
    road: () => {
      return this.business.road.load().then((x) => {
        return this.controller.amap.road.load(x, true);
      });
    },
  };
  private change = {
    records: (simple: SimpleChange) => {
      if (simple && !simple.firstChange) {
        this.controller.amap.point.clear().then(() => {
          if (this.records && this.records.length > 0) {
            this.controller.amap.point.load(this.records);
          }
        });
      }
    },
  };
  private regist() {
    if (this.focus) {
      let sub = this.focus.subscribe((x) => {
        this.controller.amap.point.focus(x);
      });
      this.subscription.add(sub);
    }
    if (this.over) {
      let sub = this.over.subscribe((x) => {
        this.controller.amap.point.over(x);
      });
      this.subscription.add(sub);
    }
    if (this.out) {
      let sub = this.out.subscribe((x) => {
        this.controller.amap.point.out(x);
      });
      this.subscription.add(sub);
    }
    this.controller.amap.event.point.click.subscribe((x) => {
      this.selected.emit(x);
    });
  }
}
