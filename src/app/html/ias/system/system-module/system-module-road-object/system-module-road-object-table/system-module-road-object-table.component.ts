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
import { SystemModuleRoadObjectTableBusiness } from './system-module-road-object-table.business';
import {
  SystemModuleRoadObjectTableArgs,
  SystemModuleRoadObjectTableItem,
} from './system-module-road-object-table.model';

@Component({
  selector: 'ias-system-module-road-object-table',
  imports: [CommonModule],
  templateUrl: './system-module-road-object-table.component.html',
  styleUrl: './system-module-road-object-table.component.less',
  providers: [SystemModuleRoadObjectTableBusiness],
})
export class SystemModuleRoadObjectTableComponent
  implements OnInit, OnChanges, OnDestroy
{
  @Input() operable = true;
  @Input() args = new SystemModuleRoadObjectTableArgs();
  @Input('load') _load?: EventEmitter<SystemModuleRoadObjectTableArgs>;
  @Output() modify = new EventEmitter<RoadObject>();
  @Output() delete = new EventEmitter<RoadObject>();
  @Output() error = new EventEmitter<Error>();
  @Output() loaded = new EventEmitter<RoadObject[]>();
  @Input() selected?: RoadObject;
  @Output() selectedChange = new EventEmitter<RoadObject>();

  constructor(private business: SystemModuleRoadObjectTableBusiness) {}

  datas: SystemModuleRoadObjectTableItem[] = [];

  widths = ['65px', '200px', '100px', 'auto', '100px'];
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

  private load(args: SystemModuleRoadObjectTableArgs) {
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

  onselect(item: SystemModuleRoadObjectTableItem) {
    if (this.selected === item) {
      this.selected = undefined;
    } else {
      this.selected = item;
    }
    this.selectedChange.emit(this.selected);
  }

  onmodify(item: SystemModuleRoadObjectTableItem, e: Event) {
    this.modify.emit(item);
    if (this.selected === item) {
      e.stopPropagation();
    }
  }

  ondelete(item: RoadObject, e: Event) {
    this.delete.emit(item);
    if (this.selected === item) {
      e.stopPropagation();
    }
  }
}
