import { CommonModule, KeyValue } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { Subscription } from 'rxjs';
import { FileInfo } from '../../../../../../common/data-core/models/arm/file/file-info.model';
import { TableSorterDirective } from '../../../../../../common/directives/table-sorter/table-soater.directive';
import { Sort } from '../../../../../../common/directives/table-sorter/table-sorter.model';
import { LocaleCompare } from '../../../../../../common/tools/compare-tool/compare.tool';
import { Language } from '../../../../../../common/tools/language-tool/language';
import { SystemMobuleFileTableBusiness } from './system-module-file-table.business';

@Component({
  selector: 'ias-system-module-file-table',
  imports: [CommonModule, TableSorterDirective],
  templateUrl: './system-module-file-table.component.html',
  styleUrl: './system-module-file-table.component.less',
  providers: [SystemMobuleFileTableBusiness],
})
export class SystemModuleFileTableComponent implements OnInit, OnDestroy {
  @Output() video = new EventEmitter<FileInfo>();
  @Output() error = new EventEmitter<Error>();
  @Input() selected?: FileInfo;
  @Output() selectedChange = new EventEmitter<FileInfo>();

  @Output() upload = new EventEmitter<void>();

  @Input('load') _load?: EventEmitter<void>;

  constructor(private business: SystemMobuleFileTableBusiness) {}

  datas: FileInfo[] = [];
  widths = ['100px', 'auto', '25%', '15%', '15%', '150px'];
  folders: KeyValue<string, string>[] = [];
  Language = Language;
  private subscription = new Subscription();
  private sort: Sort = {
    active: 'ModifiedTime',
    direction: 'desc',
  };

  ngOnInit(): void {
    this.load();
    this.regist();
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
  private regist() {
    if (this._load) {
      let sub = this._load.subscribe((x) => {
        this.load();
      });
      this.subscription.add(sub);
    }
  }

  private load(path?: string) {
    this.business
      .load(path)
      .then((x) => {
        this.datas = x;
        if (this.sort) {
          this.on.sort(this.sort);
        }
      })
      .catch((e) => {
        this.error.emit(e);
      });
  }

  on = {
    select: (item: FileInfo) => {
      if (this.selected == item) {
        return;
      }
      this.selected = item;
      this.selectedChange.emit(this.selected);
    },
    video: (item: FileInfo, e: Event) => {
      this.video.emit(item);
      if (this.selected == item) {
        e.stopImmediatePropagation();
      }
    },
    download: (item: FileInfo, e: Event) => {
      let url = this.business.path(item);
      window.open(url, '_blank');
      if (this.selected == item) {
        e.stopImmediatePropagation();
      }
    },
    sort: (sort: Sort) => {
      this.datas = this.datas.sort((a: any, b: any) => {
        return LocaleCompare.compare(
          a[sort.active],
          b[sort.active],
          sort.direction === 'asc'
        );
      });
    },
    dblclick: (item: FileInfo, e: Event) => {
      if (!item.IsDirectory) {
        this.on.video(item, e);
      } else {
        this.folders = item.FileName.split('/').map((x) => {
          let index = item.FileName.indexOf(x);
          let value = item.FileName.substring(0, index + x.length);
          return { key: x, value: value };
        });
        this.load(item.FileName);
      }
    },
    up: () => {
      if (this.folders.length > 0) {
        this.folders.pop();
        let path =
          this.folders.length > 0
            ? this.folders[this.folders.length - 1].value
            : undefined;
        this.load(path);
      }
    },
    path: (path?: string) => {
      if (path) {
        this.folders = path.split('/').map((x) => {
          let index = path.indexOf(x);
          let value = path.substring(0, index + x.length);
          return { key: x, value: value };
        });
      } else {
        this.folders = [];
      }
      this.load(path);
    },
    upload: () => {
      this.upload.emit();
    },
  };
}
