import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Process } from '../../../../common/data-core/models/arm/process.model';
import { RunningStatus } from '../../../../common/data-core/models/arm/running-status.model';
import { TableSorterDirective } from '../../../../common/directives/table-sorter/table-soater.directive';
import { Sort } from '../../../../common/directives/table-sorter/table-sorter.model';
import { LocaleCompare } from '../../../../common/tools/compare-tool/compare.tool';
import { Language } from '../../../../common/tools/language-tool/language';
import { ManagementSystemStatusProcessTableBusiness } from './management-system-status-process-table.business';

@Component({
  selector: 'ias-management-system-status-process-table',
  imports: [CommonModule, TableSorterDirective],
  templateUrl: './management-system-status-process-table.component.html',
  styleUrl: './management-system-status-process-table.component.less',
  providers: [ManagementSystemStatusProcessTableBusiness],
})
export class ManagementSystemStatusProcessTableComponent
  implements OnInit, OnDestroy
{
  constructor(private business: ManagementSystemStatusProcessTableBusiness) {}

  datas: Process[] = [];
  status?: RunningStatus;
  widths: string[] = ['10%', '15%', '15%', '30%', '15%', '15%'];
  private handle?: NodeJS.Timeout;
  Language = Language;
  sort?: Sort;

  ngOnInit(): void {
    this.load();
    this.keep();
  }
  ngOnDestroy(): void {
    if (this.handle) {
      clearTimeout(this.handle);
    }
  }
  private keep() {
    this.handle = setTimeout(() => {
      this.load();
      this.keep();
    }, 1000 * 5);
  }
  private load() {
    this.business.load().then((x) => {
      this.status = x;
      if (x.Processes) {
        this.datas = x.Processes;
        if (this.sort) {
          this.onsort(this.sort);
        }
      }
    });
  }

  onsort(sort: Sort) {
    if (this.sort !== sort) {
      this.sort = sort;
    }
    this.datas = this.datas.sort((a, b) => {
      let _a: any = a;
      let _b: any = b;
      return LocaleCompare.compare(
        _a[sort.active],
        _b[sort.active],
        sort.direction === 'asc'
      );
    });
  }
}
