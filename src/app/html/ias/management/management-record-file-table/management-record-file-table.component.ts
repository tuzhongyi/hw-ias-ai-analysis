import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FileInfo } from '../../../../common/data-core/models/arm/file/file-info.model';
import { TableSorterDirective } from '../../../../common/directives/table-sorter/table-soater.directive';
import { Sort } from '../../../../common/directives/table-sorter/table-sorter.model';
import { LocaleCompare } from '../../../../common/tools/compare-tool/compare.tool';
import { Language } from '../../../../common/tools/language-tool/language';
import { ManagementRecordFileTableBusiness } from './management-record-file-table.business';

@Component({
  selector: 'ias-management-record-file-table',
  imports: [CommonModule, TableSorterDirective],
  templateUrl: './management-record-file-table.component.html',
  styleUrl: './management-record-file-table.component.less',
  providers: [ManagementRecordFileTableBusiness],
})
export class ManagementRecordFileTableComponent implements OnInit {
  @Output() video = new EventEmitter<FileInfo>();
  @Output() open = new EventEmitter<FileInfo>();
  @Input() root?: EventEmitter<void>;
  @Input() folder?: EventEmitter<string>;
  @Input() refresh?: EventEmitter<void>;

  constructor(private business: ManagementRecordFileTableBusiness) {}

  widths = ['auto', '25%', '15%', '15%', '150px'];
  datas: FileInfo[] = [];
  selected?: FileInfo;
  Language = Language;

  ngOnInit(): void {
    this.load();
    if (this.root) {
      this.root.subscribe(() => {
        this.load();
        this.open.emit();
      });
    }
    if (this.folder) {
      this.folder.subscribe((filename) => {
        this.selected = this.datas.find((x) => x.FileName === filename);
        this.business.folder(filename).then((x) => {
          this.datas = x;
          this.open.emit(this.selected);
        });
      });
    }
    if (this.refresh) {
      this.refresh.subscribe(() => {
        if (this.selected) {
          this.business.folder(this.selected).then((x) => {
            this.datas = x;
          });
        } else {
          this.business.load().then((x) => {
            this.datas = x;
          });
        }
      });
    }
  }

  private load() {
    this.business.load().then((x) => {
      this.datas = x;
    });
  }
  tofolder(data: FileInfo) {
    this.business.folder(data).then((x) => {
      this.datas = x;
      this.selected = data;
      this.open.emit(data);
    });
  }

  onfolder(data: FileInfo) {
    if (data.IsDirectory) {
      this.tofolder(data);
    } else {
      this.video.emit(data);
    }
  }

  ondownload(data: FileInfo) {
    let url = this.business.file(data);
    window.open(url);
  }

  onsort(sort: Sort) {
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
