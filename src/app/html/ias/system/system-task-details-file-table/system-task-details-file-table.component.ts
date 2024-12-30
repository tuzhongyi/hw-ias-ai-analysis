import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input } from '@angular/core';
import { UploadControlFileInfo } from '../../../../common/components/upload-control/upload-control.model';
import { Language } from '../../../../common/tools/language';
import { FileProgress } from '../system-task-manager/system-task-manager.model';
import { SystemTaskDetailsFileBusiness } from './system-task-details-file-table.business';
import { SystemTaskDetailsFileConverter } from './system-task-details-file-table.converter';
import { SystemTaskDetailsFileModel } from './system-task-details-file-table.model';

@Component({
  selector: 'ias-system-task-details-file-table',
  imports: [CommonModule],
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
    this.datas = this.business.load(this.data);
    if (this.progress) {
      this.progress.subscribe((progress) => {
        let index = this.datas.findIndex(
          (x) => x.filename === progress.filename
        );
        if (index < 0) return;
        this.datas[index].progress = progress.progress;
      });
    }
  }

  onselect(item: SystemTaskDetailsFileModel) {
    this.selected = item;
  }
}
