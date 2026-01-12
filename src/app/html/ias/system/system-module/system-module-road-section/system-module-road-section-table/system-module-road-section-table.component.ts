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
import { RoadSection } from '../../../../../../common/data-core/models/arm/geographic/road-section.model';
import { SystemModuleRoadSectionTableBusiness } from './system-module-road-section-table.business';
import {
  SystemModuleRoadSectionTableArgs,
  SystemModuleRoadSectionTableItem,
} from './system-module-road-section-table.model';
import { SystemModuleRoadSectionTableSource } from './system-module-road-section-table.source';

@Component({
  selector: 'ias-system-module-road-section-table',
  imports: [CommonModule],
  templateUrl: './system-module-road-section-table.component.html',
  styleUrl: './system-module-road-section-table.component.less',
  providers: [
    SystemModuleRoadSectionTableBusiness,
    SystemModuleRoadSectionTableSource,
  ],
})
export class SystemModuleRoadSectionTableComponent
  implements OnInit, OnChanges, OnDestroy
{
  @Input() operable = true;
  @Input() args = new SystemModuleRoadSectionTableArgs();
  @Input('load') _load?: EventEmitter<SystemModuleRoadSectionTableArgs>;
  @Output() modify = new EventEmitter<RoadSection>();
  @Output() delete = new EventEmitter<RoadSection>();
  @Output() error = new EventEmitter<Error>();
  @Output() loaded = new EventEmitter<RoadSection[]>();
  @Input() selected?: RoadSection;
  @Output() selectedChange = new EventEmitter<RoadSection>();

  constructor(
    private business: SystemModuleRoadSectionTableBusiness,
    public source: SystemModuleRoadSectionTableSource
  ) {}

  datas: SystemModuleRoadSectionTableItem[] = [];

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

  private load(args: SystemModuleRoadSectionTableArgs) {
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

  onselect(item: SystemModuleRoadSectionTableItem) {
    if (this.selected === item) {
      this.selected = undefined;
    } else {
      this.selected = item;
    }
    this.selectedChange.emit(this.selected);
  }

  onmodify(item: SystemModuleRoadSectionTableItem, e: Event) {
    this.modify.emit(item);
    if (this.selected === item) {
      e.stopPropagation();
    }
  }

  ondelete(item: RoadSection, e: Event) {
    this.delete.emit(item);
    if (this.selected === item) {
      e.stopPropagation();
    }
  }
}
