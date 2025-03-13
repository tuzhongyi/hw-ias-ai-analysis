import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { Subscription } from 'rxjs';
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
export class SystemTaskDetailsFileTableComponent implements OnInit, OnDestroy {
  @Input() data: UploadControlFileInfo[] = [];
  @Input() progress?: EventEmitter<FileProgress>;
  @Output() error = new EventEmitter<Error>();
  constructor(private business: SystemTaskDetailsFileBusiness) {}

  widths = ['65px', 'auto', '150px', '100px'];
  datas: SystemTaskDetailsFileModel[] = [];
  selected?: SystemTaskDetailsFileModel;

  Language = Language;

  private subscription = new Subscription();

  ngOnInit(): void {
    if (this.progress) {
      let sub = this.progress.subscribe((progress) => {
        let index = this.datas.findIndex(
          (x) => x.filename === progress.filename
        );
        if (index < 0) return;
        this.datas[index].progress = progress.progress;
      });
      this.subscription.add(sub);
    }
    this.load(this.data);
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  load(datas: UploadControlFileInfo[]) {
    this.business
      .load(datas)
      .then((x) => {
        this.datas = x;
      })
      .catch((e) => {
        this.error.emit(e);
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
