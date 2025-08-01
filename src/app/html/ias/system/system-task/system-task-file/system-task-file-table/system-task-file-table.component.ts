import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AnalysisTask } from '../../../../../../common/data-core/models/arm/analysis/task/analysis-task.model';
import { FileInfo } from '../../../../../../common/data-core/models/arm/file/file-info.model';
import { TableSorterDirective } from '../../../../../../common/directives/table-sorter/table-soater.directive';
import { Sort } from '../../../../../../common/directives/table-sorter/table-sorter.model';
import { LocaleCompare } from '../../../../../../common/tools/compare-tool/compare.tool';
import { Language } from '../../../../../../common/tools/language-tool/language';
import { SystemTaskFileTableBusiness } from './system-task-file-table.business';

@Component({
  selector: 'ias-system-task-file-table',
  imports: [CommonModule, TableSorterDirective],
  templateUrl: './system-task-file-table.component.html',
  styleUrl: './system-task-file-table.component.less',
  providers: [SystemTaskFileTableBusiness],
})
export class SystemTaskFileTableComponent implements OnInit {
  @Input() data?: AnalysisTask;
  @Output() video = new EventEmitter<FileInfo>();
  @Output() error = new EventEmitter<Error>();
  @Input() selecteds: FileInfo[] = [];
  @Output() selectedsChange = new EventEmitter<FileInfo[]>();
  @Input() selectmax = 2;
  constructor(private business: SystemTaskFileTableBusiness) {}

  datas: FileInfo[] = [];
  widths = ['100px', '100px', 'auto', '25%', '15%', '150px'];
  Language = Language;

  ngOnInit(): void {
    if (this.data) {
      this.load(this.data);
    }
  }

  load(data: AnalysisTask) {
    if (data.Files) {
      this.business
        .load(data.Files)
        .then((x) => {
          this.datas = x;
        })
        .catch((e) => {
          this.error.emit(e);
        });
    }
  }

  onselect(item: FileInfo) {
    if (this.selecteds.includes(item)) {
      this.selecteds = this.selecteds.filter((x) => x !== item);
    } else {
      this.selecteds.push(item);
      while (this.selecteds.length > this.selectmax) {
        this.selecteds.shift();
      }
    }
    this.selectedsChange.emit(this.selecteds);
  }

  onvideo(item: FileInfo, e: Event) {
    this.video.emit(item);
    if (this.selecteds.includes(item)) {
      e.stopImmediatePropagation();
    }
  }
  ondownload(item: FileInfo, e: Event) {
    let url = this.business.path(item);
    window.open(url, '_blank');
    if (this.selecteds.includes(item)) {
      e.stopImmediatePropagation();
    }
  }
  onsort(sort: Sort) {
    this.datas = this.datas.sort((a: any, b: any) => {
      return LocaleCompare.compare(
        a[sort.active],
        b[sort.active],
        sort.direction === 'asc'
      );
    });
  }
}
