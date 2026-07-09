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
import { PatrolSection } from '../../../../../../common/data-core/models/arm/geographic/patrol/patrol-section.model';
import { TableSorterDirective } from '../../../../../../common/directives/table-sorter/table-soater.directive';
import { Sort } from '../../../../../../common/directives/table-sorter/table-sorter.model';
import { LocaleCompare } from '../../../../../../common/tools/compare-tool/compare.tool';
import { SystemModulePatrolSectionTableArgs } from '../system-module-patrol-section.model';
import { SystemModulePatrolSectionTableBusiness } from './system-module-patrol-section-table.business';

@Component({
  selector: 'ias-system-module-patrol-section-table',
  imports: [CommonModule, TableSorterDirective],
  templateUrl: './system-module-patrol-section-table.component.html',
  styleUrl: './system-module-patrol-section-table.component.less',
  providers: [SystemModulePatrolSectionTableBusiness],
})
export class SystemModulePatrolSectionTableComponent
  implements OnInit, OnChanges, OnDestroy
{
  @Input() operable = true;
  @Input() args = new SystemModulePatrolSectionTableArgs();
  @Input('load') _load?: EventEmitter<SystemModulePatrolSectionTableArgs>;
  @Output() modify = new EventEmitter<PatrolSection>();
  @Output() delete = new EventEmitter<PatrolSection>();
  @Output() error = new EventEmitter<Error>();
  @Output() loaded = new EventEmitter<PatrolSection[]>();
  @Input() selected?: PatrolSection;
  @Output() selectedChange = new EventEmitter<PatrolSection>();
  @Input() hover?: PatrolSection;
  @Output() hoverChange = new EventEmitter<PatrolSection>();

  constructor(private business: SystemModulePatrolSectionTableBusiness) {}

  datas: PatrolSection[] = [];
  widths = ['15%', 'auto', '100px'];

  private subscription = new Subscription();

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

  private load(args: SystemModulePatrolSectionTableArgs) {
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

  private change = {
    operable: (simple: SimpleChange) => {
      if (simple) {
        if (!this.operable) {
          this.widths = ['65px', 'auto', '0px'];
        }
      }
    },
  };

  on = {
    sort: (sort: Sort) => {
      this.datas = this.datas.sort((a, b) => {
        let _a: any = a;
        let _b: any = b;
        return LocaleCompare.compare(
          _a[sort.active],
          _b[sort.active],
          sort.direction == 'asc',
        );
      });
    },
    select: (item: PatrolSection) => {
      if (this.selected === item) {
        this.selected = undefined;
      } else {
        this.selected = item;
      }
      this.selectedChange.emit(this.selected);
    },
    modify: (item: PatrolSection, e: Event) => {
      this.modify.emit(item);
      if (this.selected === item) {
        e.stopPropagation();
      }
    },
    delete: (item: PatrolSection, e: Event) => {
      this.delete.emit(item);
      if (this.selected === item) {
        e.stopPropagation();
      }
    },
    mouse: {
      in: (item: PatrolSection) => {
        if (this.hover == item) return;
        this.hover = item;
        this.hoverChange.emit(this.hover);
      },
      out: (item: PatrolSection) => {
        if (this.hover == item) {
          this.hover = undefined;
          this.hoverChange.emit();
        }
      },
    },
  };
}
