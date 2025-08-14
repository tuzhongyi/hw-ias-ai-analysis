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
import { PaginatorComponent } from '../../../../../common/components/paginator/paginator.component';
import { MobileDevice } from '../../../../../common/data-core/models/arm/mobile-device/mobile-device.model';
import { Page } from '../../../../../common/data-core/models/page-list.model';
import { TableSorterDirective } from '../../../../../common/directives/table-sorter/table-soater.directive';
import { Sort } from '../../../../../common/directives/table-sorter/table-sorter.model';
import { ColorTool } from '../../../../../common/tools/color/color.tool';
import { ManagementDeviceMobileTableBusiness } from './management-device-mobile-table.business';
import {
  ManagementDeviceMobileTableArgs,
  ManagementDeviceMobileTableFilter,
} from './management-device-mobile-table.model';

@Component({
  selector: 'ias-management-device-mobile-table',
  imports: [CommonModule, PaginatorComponent, TableSorterDirective],
  templateUrl: './management-device-mobile-table.component.html',
  styleUrl: './management-device-mobile-table.component.less',
  providers: [ManagementDeviceMobileTableBusiness],
})
export class ManagementDeviceMobileTableComponent implements OnInit, OnDestroy {
  @Input() args?: ManagementDeviceMobileTableArgs;
  @Input('load') _load?: EventEmitter<ManagementDeviceMobileTableArgs>;
  @Output() loaded = new EventEmitter<MobileDevice[]>();
  @Input() selecteds: MobileDevice[] = [];
  @Output() selectedsChange = new EventEmitter<MobileDevice[]>();
  @Output() info = new EventEmitter<MobileDevice>();

  constructor(private business: ManagementDeviceMobileTableBusiness) {}

  filter = new ManagementDeviceMobileTableFilter();
  datas: Array<MobileDevice | undefined> = [];
  page = Page.create(1, 10);
  widths = [
    '100px',
    '100px',
    'auto',
    'auto',
    'auto',
    '10%',
    '200px',
    'auto',
    '100px',
  ];
  subscription = new Subscription();
  Color = ColorTool;

  ngOnInit(): void {
    this.regist();
    if (this.args) {
      this.filter = Object.assign(this.filter, this.args);
    }
    this.load(this.page.PageIndex, this.page.PageSize, this.filter);
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
  private regist() {
    if (this._load) {
      let sub = this._load.subscribe((args) => {
        this.filter = Object.assign(this.filter, args);
        this.load(this.page.PageIndex, this.page.PageSize, this.filter);
      });
      this.subscription.add(sub);
    }
  }
  private load(
    index: number,
    size: number,
    filter: ManagementDeviceMobileTableFilter
  ) {
    this.business.load(index, size, filter).then((x) => {
      this.page = x.Page;

      this.datas = x.Data;
      this.loaded.emit(x.Data);
      while (this.datas.length < this.page.PageSize) {
        this.datas.push(undefined);
      }
    });
  }

  on = {
    sort: (sort: Sort) => {
      if (sort.direction === 'asc') {
        this.filter.asc = sort.active;
      } else {
        this.filter.desc = sort.active;
      }
      this.load(this.page.PageIndex, this.page.PageSize, this.filter);
    },
    page: (index: number) => {
      if (this.filter) {
        this.load(index, this.page.PageSize, this.filter);
        this.selecteds = [];
        this.selectedsChange.emit(this.selecteds);
      }
    },
    info: (item: MobileDevice, e: Event) => {
      this.info.emit(item);
      e.stopImmediatePropagation();
    },
  };

  select = {
    on: (item?: MobileDevice) => {
      if (!item) return;
      let index = this.selecteds.findIndex((x) => x.Id === item.Id);
      if (index < 0) {
        this.selecteds.push(item);
      } else {
        this.selecteds.splice(index, 1);
      }
      this.selectedsChange.emit(this.selecteds);
    },
    all: () => {
      if (this.selecteds.length === this.page.RecordCount) {
        this.selecteds = [];
      } else {
        this.selecteds = [];
        for (let i = 0; i < this.datas.length; i++) {
          const data = this.datas[i];
          if (data) {
            this.selecteds.push(data);
          }
        }
      }
      this.selectedsChange.emit(this.selecteds);
    },
    clear: () => {
      this.selecteds = [];
      this.selectedsChange.emit(this.selecteds);
    },
  };
}
