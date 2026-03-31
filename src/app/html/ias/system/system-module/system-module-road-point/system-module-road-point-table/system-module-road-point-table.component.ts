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
import { RoadPoint } from '../../../../../../common/data-core/models/arm/geographic/road-point.model';
import { SystemModuleRoadPointTableBusiness } from './system-module-road-point-table.business';
import {
  SystemModuleRoadPointTableArgs,
  SystemModuleRoadPointTableItem,
} from './system-module-road-point-table.model';

@Component({
  selector: 'ias-system-module-road-point-table',
  imports: [CommonModule],
  templateUrl: './system-module-road-point-table.component.html',
  styleUrl: './system-module-road-point-table.component.less',
  providers: [SystemModuleRoadPointTableBusiness],
})
export class SystemModuleRoadPointTableComponent
  implements OnInit, OnChanges, OnDestroy
{
  @Input() operable = true;
  @Input() args = new SystemModuleRoadPointTableArgs();
  @Input('load') _load?: EventEmitter<SystemModuleRoadPointTableArgs>;
  @Output() modify = new EventEmitter<RoadPoint>();
  @Output() delete = new EventEmitter<RoadPoint>();
  @Output() error = new EventEmitter<Error>();
  @Output() loaded = new EventEmitter<RoadPoint[]>();
  @Input() selected?: RoadPoint;
  @Output() selectedChange = new EventEmitter<RoadPoint>();

  constructor(private business: SystemModuleRoadPointTableBusiness) {}

  datas: SystemModuleRoadPointTableItem[] = [];

  widths = ['65px', 'auto', '100px', 'auto', 'auto', '65px', '100px'];
  private subscription = new Subscription();

  private change = {
    operable: (simple: SimpleChange) => {
      if (simple) {
        if (!this.operable) {
          this.widths = ['65px', 'auto', 'auto', '0px'];
        }
      }
    },
  };
  ngOnChanges(changes: SimpleChanges): void {
    this.change.operable(changes['operable']);
  }

  ngOnInit(): void {
    if (this._load) {
      let sub = this._load.subscribe((x) => {
        this.load(this.args);
      });
      this.subscription.add(sub);
    }
    this.load(this.args);
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  private load(args: SystemModuleRoadPointTableArgs) {
    this.business
      .load(args)
      .then((x) => {
        this.datas = x;
        this.loaded.emit(x);
      })
      .catch((e) => {
        this.error.emit(e);
      });
  }

  onselect(item: SystemModuleRoadPointTableItem) {
    if (this.selected === item) {
      this.selected = undefined;
    } else {
      this.selected = item;
    }
    this.selectedChange.emit(this.selected);
  }

  onmodify(item: SystemModuleRoadPointTableItem, e: Event) {
    this.modify.emit(item);
    if (this.selected === item) {
      e.stopPropagation();
    }
  }

  ondelete(item: RoadPoint, e: Event) {
    this.delete.emit(item);
    if (this.selected === item) {
      e.stopPropagation();
    }
  }
}
