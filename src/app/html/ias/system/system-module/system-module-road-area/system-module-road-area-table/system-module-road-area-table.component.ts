import { CommonModule } from '@angular/common';
import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  QueryList,
  SimpleChange,
  SimpleChanges,
  ViewChildren,
} from '@angular/core';
import { Subscription } from 'rxjs';
import { RoadArea } from '../../../../../../common/data-core/models/arm/geographic/road-area.model';
import { SystemModuleRoadAreaTableBusiness } from './system-module-road-area-table.business';
import {
  SystemModuleRoadAreaTableArgs,
  SystemModuleRoadAreaTableItem,
} from './system-module-road-area-table.model';
import { SystemModuleRoadAreaTableSource } from './system-module-road-area-table.source';

@Component({
  selector: 'ias-system-module-road-area-table',
  imports: [CommonModule],
  templateUrl: './system-module-road-area-table.component.html',
  styleUrl: './system-module-road-area-table.component.less',
  providers: [
    SystemModuleRoadAreaTableBusiness,
    SystemModuleRoadAreaTableSource,
  ],
})
export class SystemModuleRoadAreaTableComponent
  implements OnInit, OnChanges, OnDestroy
{
  @Input() operable = true;
  @Input() args = new SystemModuleRoadAreaTableArgs();
  @Input('load') _load?: EventEmitter<SystemModuleRoadAreaTableArgs>;
  @Output() modify = new EventEmitter<RoadArea>();
  @Output() delete = new EventEmitter<RoadArea>();
  @Output() error = new EventEmitter<Error>();
  @Output() loaded = new EventEmitter<RoadArea[]>();
  /** 表格外的选中（比如点了地图上的多边形）传进来，也要能选中对应行 */
  @Input() selected?: RoadArea;
  @Output() selectedChange = new EventEmitter<RoadArea>();
  @ViewChildren('row') rows?: QueryList<ElementRef<HTMLTableRowElement>>;

  constructor(
    private business: SystemModuleRoadAreaTableBusiness,
    public source: SystemModuleRoadAreaTableSource
  ) {}

  datas: SystemModuleRoadAreaTableItem[] = [];

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
    selected: (simple: SimpleChange) => {
      if (simple && this.selected) {
        this.scroll(this.selected);
      }
    },
  };
  ngOnChanges(changes: SimpleChanges): void {
    this.change.operable(changes['operable']);
    this.change.selected(changes['selected']);
  }

  /** 选中行可能在可视区外，滚过去（已经在视野里就不动） */
  private scroll(target: RoadArea) {
    let index = this.datas.indexOf(target as SystemModuleRoadAreaTableItem);
    if (index < 0) {
      return;
    }
    let row = this.rows?.get(index);
    row?.nativeElement.scrollIntoView({ block: 'nearest' });
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

  private load(args: SystemModuleRoadAreaTableArgs) {
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

  onselect(item: SystemModuleRoadAreaTableItem) {
    if (this.selected === item) {
      this.selected = undefined;
    } else {
      this.selected = item;
    }
    this.selectedChange.emit(this.selected);
  }

  onmodify(item: SystemModuleRoadAreaTableItem, e: Event) {
    this.modify.emit(item);
    if (this.selected === item) {
      e.stopPropagation();
    }
  }

  ondelete(item: RoadArea, e: Event) {
    this.delete.emit(item);
    if (this.selected === item) {
      e.stopPropagation();
    }
  }
}
