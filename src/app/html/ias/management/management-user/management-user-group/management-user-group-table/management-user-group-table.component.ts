import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { UserGroup } from '../../../../../../common/data-core/models/user/user-group.model';
import { TableSorterDirective } from '../../../../../../common/directives/table-sorter/table-soater.directive';
import { Sort } from '../../../../../../common/directives/table-sorter/table-sorter.model';
import { LocaleCompare } from '../../../../../../common/tools/compare-tool/compare.tool';
import { ManagementUserGroupTableBusiness } from './management-user-group-table.business';
import {
  ManagementUserGroupTableArgs,
  ManagementUserGroupTableItem,
} from './management-user-group-table.model';

@Component({
  selector: 'ias-management-user-group-table',
  imports: [CommonModule, TableSorterDirective],
  templateUrl: './management-user-group-table.component.html',
  styleUrl: './management-user-group-table.component.less',
  providers: [ManagementUserGroupTableBusiness],
})
export class ManagementUserGroupTableComponent implements OnInit {
  @Input('load') loadevent?: EventEmitter<ManagementUserGroupTableArgs>;
  @Input() selecteds: UserGroup[] = [];
  @Output() selectedsChange = new EventEmitter<UserGroup[]>();
  @Output() modify = new EventEmitter<UserGroup>();
  /** 加载完成，抛出服务端返回的全量数据（manager 用它取最大分组编号） */
  @Output() loaded = new EventEmitter<UserGroup[]>();
  constructor(private business: ManagementUserGroupTableBusiness) {}

  protected widths = ['65px', '80px', '20%', 'auto', '100px'];
  /** 当前展示的数据（筛选后） */
  protected datas: ManagementUserGroupTableItem[] = [];
  /** 服务端拉取的全量数据，本地筛选只动 datas */
  private source: ManagementUserGroupTableItem[] = [];
  private args = new ManagementUserGroupTableArgs();
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
      // 抛全量：新建分组取最大编号不能受筛选影响
      this.loaded.emit(x);
      this.filter(this.args);
      if (this.sort) {
        this.on.sort(this.sort);
      }
    });
  }

  /** 本地筛选：只在已拉取的数据里按分组名称过滤，不请求服务端 */
  private filter(args: ManagementUserGroupTableArgs) {
    let name = args.name?.trim().toLowerCase();
    if (name) {
      this.datas = this.source.filter((x) =>
        x.GroupName?.toLowerCase().includes(name),
      );
    } else {
      this.datas = this.source;
    }
    this.select.sync();
  }

  select = {
    /** 筛选/重新加载后数据是新的对象，把不再对应列表行的勾选项去掉，避免重复提交同一个分组 */
    sync: () => {
      let selecteds = this.selecteds.filter((x) => this.datas.includes(x));
      if (selecteds.length !== this.selecteds.length) {
        this.selecteds = selecteds;
        this.selectedsChange.emit(this.selecteds);
      }
    },
    all: () => {
      if (this.selecteds.length === this.datas.length) {
        this.selecteds = [];
      } else {
        this.selecteds = [...this.datas];
      }
      this.selectedsChange.emit(this.selecteds);
    },
    item: (item: ManagementUserGroupTableItem) => {
      let index = this.selecteds.findIndex((x) => x === item);
      if (index >= 0) {
        this.selecteds.splice(index, 1);
      } else {
        this.selecteds.push(item);
      }
      this.selectedsChange.emit(this.selecteds);
    },
  };

  on = {
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
    modify: (item: ManagementUserGroupTableItem, e: Event) => {
      this.modify.emit(item);

      this.selecteds = [item];
      this.selectedsChange.emit(this.selecteds);

      if (this.selecteds.includes(item)) {
        e.stopPropagation();
      }
    },
  };
}
