import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input } from '@angular/core';
import { UploadControlFileInfo } from '../../../../common/components/upload-control/upload-control.model';
import { TableSorterDirective } from '../../../../common/directives/table-sorter/table-soater.directive';
import { Sort } from '../../../../common/directives/table-sorter/table-sorter.model';
import { LocaleCompare } from '../../../../common/tools/compare-tool/compare.tool';
import { Language } from '../../../../common/tools/language';
import { FileProgress } from '../system-task-manager/system-task-manager.model';
import { SystemTaskDetailsFileBusiness } from './system-task-details-file-table.business';
import { SystemTaskDetailsFileConverter } from './system-task-details-file-table.converter';
import { SystemTaskDetailsFileModel } from './system-task-details-file-table.model';

@Component({
  selector: 'ias-system-task-details-file-table',
  imports: [CommonModule, TableSorterDirective],
  templateUrl: './system-task-details-file-table.component.html',
  styleUrl: './system-task-details-file-table.component.less',
  providers: [SystemTaskDetailsFileConverter, SystemTaskDetailsFileBusiness],
})
export class SystemTaskDetailsFileTableComponent {
  @Input() data: UploadControlFileInfo[] = [];
  @Input() progress?: EventEmitter<FileProgress>;

  constructor(private business: SystemTaskDetailsFileBusiness) {}

  widths = ['60px', 'auto', '150px', '100px'];
  datas: SystemTaskDetailsFileModel[] = [];
  Language = Language;
  selected?: SystemTaskDetailsFileModel;

  ngOnInit(): void {
    if (this.progress) {
      this.progress.subscribe((progress) => {
        let index = this.datas.findIndex(
          (x) => x.filename === progress.filename
        );
        if (index < 0) return;
        this.datas[index].progress = progress.progress;
      });
    }
    this.load(this.data);
  }

  load(datas: UploadControlFileInfo[]) {
    this.business.load(datas).then((x) => {
      this.datas = x;
    });
  }

  onselect(item: SystemTaskDetailsFileModel) {
    this.selected = item;
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