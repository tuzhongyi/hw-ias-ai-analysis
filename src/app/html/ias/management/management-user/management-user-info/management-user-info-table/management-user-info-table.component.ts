import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { User } from '../../../../../../common/data-core/models/user/user.model';
import { TableSorterDirective } from '../../../../../../common/directives/table-sorter/table-soater.directive';
import { Sort } from '../../../../../../common/directives/table-sorter/table-sorter.model';
import { LocaleCompare } from '../../../../../../common/tools/compare-tool/compare.tool';
import { Language } from '../../../../../../common/tools/language-tool/language';
import { ManagementUserInfoTableBusiness } from './management-user-info-table.business';
import {
  ManagementUserInfoTableArgs,
  ManagementUserInfoTableItem,
} from './management-user-info-table.model';

@Component({
  selector: 'ias-management-user-info-table',
  imports: [CommonModule, TableSorterDirective],
  templateUrl: './management-user-info-table.component.html',
  styleUrl: './management-user-info-table.component.less',
  providers: [ManagementUserInfoTableBusiness],
})
export class ManagementUserInfoTableComponent implements OnInit {
  @Input('load') loadevent?: EventEmitter<ManagementUserInfoTableArgs>;
  @Input() selecteds: User[] = [];
  @Output() selectedsChange = new EventEmitter<User[]>();
  @Output() modify = new EventEmitter<User>();
  constructor(private business: ManagementUserInfoTableBusiness) {}

  protected widths = [
    '65px',
    '80px',
    'auto',
    '15%',
    '15%',
    '10%',
    '200px',
    'auto',
    '100px',
  ];
  /** 当前展示的数据（筛选后） */
  protected datas: ManagementUserInfoTableItem[] = [];
  /** 服务端拉取的全量数据，本地筛选只动 datas */
  private source: ManagementUserInfoTableItem[] = [];
  protected Language = Language;
  private args = new ManagementUserInfoTableArgs();
  private sort?: Sort;

  ngOnInit(): void {
    this.load();
    if (this.loadevent) {
      this.loadevent.subscribe((args) => {
        this.args = args;
        if (this.args.reload) {
          this.load();
        } else {
          this.filter(this.args);
        }
      });
    }
  }

  private load() {
    this.business.load().then((x) => {
      this.source = x;
      this.filter(this.args);
      if (this.sort) {
        this.on.sort(this.sort);
      }
    });
  }
  /** 本地筛选：只在已拉取的数据里按用户名过滤，不请求服务端 */
  private filter(args: ManagementUserInfoTableArgs) {
    let name = args.name?.trim().toLowerCase();
    if (name) {
      this.datas = this.source.filter((x) =>
        x.Username?.toLowerCase().includes(name),
      );
    } else {
      this.datas = this.source;
    }
    this.syncSelecteds();
  }

  /** 筛选/重新拉取后，把已经不在列表里的勾选项去掉 */
  private syncSelecteds() {
    let selecteds = this.selecteds.filter((x) => this.datas.includes(x));
    if (selecteds.length !== this.selecteds.length) {
      this.selecteds = selecteds;
      this.selectedsChange.emit(this.selecteds);
    }
  }

  protected select = {
    all: () => {
      if (this.selecteds.length === this.datas.length) {
        this.selecteds = [];
      } else {
        this.selecteds = [...this.datas];
      }
      this.selectedsChange.emit(this.selecteds);
    },
    item: (item: ManagementUserInfoTableItem) => {
      let index = this.selecteds.findIndex((x) => x === item);
      if (index >= 0) {
        this.selecteds.splice(index, 1);
      } else {
        this.selecteds.push(item);
      }
      this.selectedsChange.emit(this.selecteds);
    },
  };

  protected on = {
    sort: (sort: Sort) => {
      this.datas = this.datas.sort((a: any, b: any) => {
        this.sort = sort;
        return LocaleCompare.compare(
          a[sort.active],
          b[sort.active],
          sort.direction == 'asc',
        );
      });
    },
    modify: (item: ManagementUserInfoTableItem, e: Event) => {
      this.modify.emit(item);

      this.selecteds = [item];
      this.selectedsChange.emit(this.selecteds);

      if (this.selecteds.includes(item)) {
        e.stopPropagation();
      }
    },
  };
}
