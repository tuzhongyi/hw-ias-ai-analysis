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
  @Output() picture = new EventEmitter<RoadObject>();

  @Output() position = new EventEmitter<RoadObject>();
  @Output() itemover = new EventEmitter<RoadObject>();
  @Output() itemout = new EventEmitter<RoadObject>();

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

  on = {
    picture: (item: RoadObject, e: Event) => {},
    delete: (item: RoadObject, e: Event) => {
      this.delete.emit(item);
      if (this.selected === item) {
        e.stopPropagation();
      }
    },
    modify: (item: SystemModuleRoadObjectTableItem, e: Event) => {
      this.modify.emit(item);
      if (this.selected === item) {
        e.stopPropagation();
      }
    },
    select: (item: SystemModuleRoadObjectTableItem) => {
      if (this.selected === item) {
        this.selected = undefined;
      } else {
        this.selected = item;
      }
      this.selectedChange.emit(this.selected);
    },
    position: (item: SystemModuleRoadObjectTableItem, e: Event) => {
      this.position.emit(item);
      if (this.selected === item) {
        e.stopImmediatePropagation();
      }
    },
    mouse: {
      over: (item?: SystemModuleRoadObjectTableItem) => {
        if (item) {
          this.itemover.emit(item);
        }
      },
      out: (item?: SystemModuleRoadObjectTableItem) => {
        if (item) {
          this.itemout.emit(item);
        }
      },
    },
  };
}
