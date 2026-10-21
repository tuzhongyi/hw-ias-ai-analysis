import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { ArmDivisionType } from '../../../../../common/data-core/enums/division/divison-type.enum';
import { Division } from '../../../../../common/data-core/models/arm/division/division.model';
import { TableSorterDirective } from '../../../../../common/directives/table-sorter/table-soater.directive';
import { Sort } from '../../../../../common/directives/table-sorter/table-sorter.model';
import { LocaleCompare } from '../../../../../common/tools/compare-tool/compare.tool';
import { Language } from '../../../../../common/tools/language-tool/language';
import { ManagementDivisionBusiness } from '../business/management-division.business';
import {
  ManagementDivisionTableArgs,
  ManagementDivisionTableItem,
} from '../business/management-division.model';

@Component({
  selector: 'ias-management-division-table',
  imports: [CommonModule, TableSorterDirective],
  templateUrl: './management-division-table.component.html',
  styleUrl: './management-division-table.component.less',
  providers: [ManagementDivisionBusiness],
})
export class ManagementDivisionTableComponent implements OnInit, OnDestroy {
  /** 初始查询条件 */
  @Input() args?: ManagementDivisionTableArgs;
  /** 外部触发加载，参数为最新的查询条件 */
  @Input('load') _load?: EventEmitter<ManagementDivisionTableArgs>;
  /** 多选结果，支持 [(selecteds)] */
  @Input() selecteds: Division[] = [];
  @Output() selectedsChange = new EventEmitter<Division[]>();
  /** 打开文件夹 */
  @Output() open = new EventEmitter<Division>();
  /** 查看/编辑区划详情 */
  @Output() details = new EventEmitter<Division>();
  @Output() loaded = new EventEmitter<Division[]>();

  constructor(
    private business: ManagementDivisionBusiness,
    private toastr: ToastrService,
  ) {}

  protected widths = ['65px', 'auto', '15%', '15%', '10%', 'auto', '10%'];
  protected datas: ManagementDivisionTableItem[] = [];
  protected Language = Language;
  protected Type = ArmDivisionType;

  private filter: ManagementDivisionTableArgs = {};
  private subscription = new Subscription();
  /** 用于丢弃过期的请求结果 */
  private loading = 0;

  ngOnInit(): void {
    this.regist();
    if (this.args) {
      this.filter = Object.assign(this.filter, this.args);
    }
    this.load();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  private regist() {
    if (this._load) {
      let sub = this._load.subscribe((args) => {
        this.filter = Object.assign(this.filter, args);
        this.load();
      });
      this.subscription.add(sub);
    }
  }

  private load() {
    let loading = ++this.loading;
    this.business
      .load(this.filter)
      .then((x) => {
        if (loading !== this.loading) return;
        this.datas = x;
        this.loaded.emit(x);
      })
      .catch((error) => {
        if (loading !== this.loading) return;
        console.error(error);
        this.toastr.error('加载区划失败');
      });
  }

  select = {
    all: () => {
      if (this.selecteds.length === this.datas.length) {
        this.selecteds = [];
      } else {
        this.selecteds = [...this.datas];
      }
      this.selectedsChange.emit(this.selecteds);
    },
    item: (item: Division) => {
      let index = this.selecteds.findIndex((x) => x === item);
      if (index >= 0) {
        this.selecteds.splice(index, 1);
      } else {
        this.selecteds.push(item);
      }
      this.selectedsChange.emit(this.selecteds);
    },
  };

  /* 文件夹进入下一级，叶节点查看详情 */
  onopen(data: Division) {
    if (data.DivisionType == ArmDivisionType.GridCell) {
      this.details.emit(data);
    } else {
      this.open.emit(data);
    }
  }

  ondetails(data: Division) {
    this.details.emit(data);
  }

  onsort(sort: Sort) {
    this.datas = this.datas.sort((a, b) => {
      let _a: any = a;
      let _b: any = b;
      return LocaleCompare.compare(
        _a[sort.active],
        _b[sort.active],
        sort.direction === 'asc',
      );
    });
  }
}
