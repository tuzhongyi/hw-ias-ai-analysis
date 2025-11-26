import { CommonModule } from '@angular/common';
import { Component, EventEmitter, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { CommonLabelSelecComponent } from '../../../../../../common/components/common-label-select/common-label-select.component';
import { ShopObjectState } from '../../../../../../common/data-core/enums/analysis/shop-object-state.enum';
import { ShopSign } from '../../../../../../common/data-core/models/arm/analysis/shop-sign.model';
import { ShopTaskCompareResult } from '../../../../../../common/data-core/models/arm/analysis/shop-task-compare-result.model';
import { IShop } from '../../../../../../common/data-core/models/arm/analysis/shop.interface';
import { Shop } from '../../../../../../common/data-core/models/arm/analysis/shop.model';
import { ShopRegistration } from '../../../../../../common/data-core/models/arm/geographic/shop-registration.model';
import {
  Page,
  Paged,
} from '../../../../../../common/data-core/models/page-list.model';
import { LocalStorage } from '../../../../../../common/storage/local.storage';
import { TaskDuration } from '../../../../../../common/storage/system-compare-storage/system-compare.storage';
import { DateTimeTool } from '../../../../../../common/tools/date-time-tool/datetime.tool';
import { PictureListPageComponent } from '../../../../share/picture/picture-list-page/picture-list-page.component';
import { PictureListComponent } from '../../../../share/picture/picture-list/picture-list.component';
import { SelectShopObjectStateComponent } from '../../../../share/select/select-shop-object-state/select-shop-object-state.component';
import { WindowComponent } from '../../../../share/window/component/window.component';
import { SystemModuleShopRegistrationInformationComponent } from '../../system-module-shop-registration/system-module-shop-registration-information/system-module-shop-registration-information.component';
import { SystemModuleShopDetailsComponent } from '../../system-module-shop/system-module-shop-details/system-module-shop-details.component';
import { SystemModuleShopInformationComponent } from '../../system-module-shop/system-module-shop-information/system-module-shop-information.component';
import { SystemModuleShopCompareDetailsComponent } from '../system-module-shop-compare-details/component/system-module-shop-compare-details.component';
import { SystemModuleShopCompareRelateComponent } from '../system-module-shop-compare-relate/component/system-module-shop-compare-relate.component';
import { SystemModuleShopCompareSettingComponent } from '../system-module-shop-compare-setting/system-module-shop-compare-setting.component';
import { SystemModuleShopCompareTableArgs } from '../system-module-shop-compare-table/business/system-module-shop-compare-table.model';
import { SystemModuleShopCompareTableComponent } from '../system-module-shop-compare-table/system-module-shop-compare-table.component';
import { SystemModuleShopCompareManagerStateController } from './controller/system-module-shop-compare-manager-state.controller';
import { SystemModuleShopCompareManagerBusiness } from './system-module-shop-compare-manager.business';
import { SystemModuleShopCompareManagerWindow } from './system-module-shop-compare-manager.window';

@Component({
  selector: 'ias-system-module-shop-compare-manager',
  imports: [
    CommonModule,
    FormsModule,
    SystemModuleShopCompareTableComponent,
    SystemModuleShopCompareSettingComponent,
    SystemModuleShopInformationComponent,
    SystemModuleShopRegistrationInformationComponent,
    SystemModuleShopCompareDetailsComponent,
    SystemModuleShopCompareRelateComponent,
    SystemModuleShopDetailsComponent,
    CommonLabelSelecComponent,
    SelectShopObjectStateComponent,
    WindowComponent,
    PictureListComponent,
    PictureListPageComponent,
  ],
  templateUrl: './system-module-shop-compare-manager.component.html',
  styleUrl: './system-module-shop-compare-manager.component.less',
  providers: [
    SystemModuleShopCompareManagerStateController,
    SystemModuleShopCompareManagerBusiness,
  ],
})
export class SystemModuleShopCompareManagerComponent implements OnInit {
  constructor(
    private business: SystemModuleShopCompareManagerBusiness,
    private toastr: ToastrService,
    public state: SystemModuleShopCompareManagerStateController,
    private local: LocalStorage
  ) {
    let storage = this.local.system.compare.get();
    this.table.args.task.count = storage.task.count;
    this.table.args.task.duration = this.init.duration(storage.task.duration);
  }

  window = new SystemModuleShopCompareManagerWindow();
  ShopObjectState = ShopObjectState;
  max = 0;

  table = {
    args: new SystemModuleShopCompareTableArgs(),
    state: ShopObjectState.Created,
    load: new EventEmitter<SystemModuleShopCompareTableArgs>(),
    selected: undefined as IShop | undefined,
    count: {
      created: 0,
      existed: 0,
      disappeared: 0,
    },
    search: () => {
      this.table.load.emit(this.table.args);
    },
    loaded: (data: Map<ShopObjectState, number>) => {
      this.table.count.created = data.get(ShopObjectState.Created) ?? 0;
      this.table.count.existed = data.get(ShopObjectState.Existed) ?? 0;
      this.table.count.disappeared = data.get(ShopObjectState.Disappeared) ?? 0;
    },
  };

  ngOnInit(): void {
    this.state.select.subscribe((x) => {
      this.table.args.states = x;
    });

    this.init.max();
  }

  private init = {
    duration: (value: TaskDuration) => {
      let today = new Date();
      switch (value) {
        case TaskDuration.day:
          return DateTimeTool.all.day(today);
        case TaskDuration.week:
          return DateTimeTool.last.week(today);
        case TaskDuration.month:
          return DateTimeTool.last.month(today);
        case TaskDuration.treemonth:
          return DateTimeTool.last.month(today, 3);
        case TaskDuration.halfyear:
          return DateTimeTool.last.month(today, 6);
        case TaskDuration.year:
          return DateTimeTool.last.year(today);
        default:
          throw new Error('TaskDuration not found');
      }
    },
    max: () => {
      this.business.count.then((x) => {
        this.max = x;
        this.table.args.task.count = x;
      });
    },
  };

  onstate(state: ShopObjectState) {
    this.table.state = state;
  }
  onsign(data: IShop) {}
  sign = {
    open: (data: IShop) => {
      this.window.sign.data = data as Shop;
      this.window.sign.show = true;
    },
    picture: (data: ShopSign) => {
      let paged = Paged.create(data, 1);
      this.window.picture.id = data.ImageUrl;

      this.window.picture.title = data.Text ?? '';
      this.window.picture.page = paged.Page;
      this.window.picture.polygon = data.Polygon ?? [];
      this.window.picture.show = true;
    },
  };
  setting = {
    open: () => {
      this.window.setting.show = true;
    },
    close: () => {
      this.window.setting.show = false;
      let storage = this.local.system.compare.get();
      this.table.args.task.count = storage.task.count;
      this.table.args.task.duration = this.init.duration(storage.task.duration);
      this.table.load.emit(this.table.args);
    },
  };

  info = {
    open: (data: IShop) => {
      if (data instanceof Shop) {
        this.window.information.shop.data = data;
        this.window.information.shop.show = true;
      } else if (data instanceof ShopRegistration) {
        this.window.information.registration.data = data;
        this.window.information.registration.input = false;
        this.window.information.registration.show = true;
      }
    },
    ok: () => {
      this.window.information.clear();
      this.window.information.close();
    },
    picture: (data: ShopRegistration) => {
      let paged = Paged.create(data, 1);
      this.picture.open(paged);
    },
  };

  compare = {
    get: new EventEmitter<number>(),
    on: (paged: Paged<ShopTaskCompareResult>) => {
      this.window.compare.page = paged.Page;
      this.window.compare.info.data = paged.Data;
      this.window.compare.info.show = true;
      if (this.window.compare.picture.show) {
        this.compare.picture.open(paged, true);
      }
    },
    page: (index: number) => {
      this.compare.get.emit(index);
    },
    picture: {
      open: (paged: Paged<ShopTaskCompareResult>, opened = false) => {
        this.window.compare.picture.datas = [
          paged.Data.Shop?.ImageUrl ?? '',
          paged.Data.ShopRegistration?.ImageUrl ?? '',
        ];
        this.window.compare.picture.title =
          paged.Data.Shop?.Name ?? paged.Data.ShopRegistration?.Name ?? '';
        if (!opened) {
          this.window.compare.picture.index = paged.Data.ObjectState;
        }
        this.window.compare.picture.show = true;
      },
      change: (page: Page) => {
        this.compare.get.emit(page.PageIndex);
      },
    },
  };
  picture = {
    get: new EventEmitter<number>(),
    open: (paged: Paged<IShop>, indexchange = true) => {
      this.window.picture.polygon = [];
      this.window.picture.id = paged.Data.ImageUrl;

      this.window.picture.title = paged.Data.Name ?? '';
      this.window.picture.page = paged.Page;
      if (indexchange) {
        this.window.picture.index = paged.Data.ObjectState;
      }
      this.window.picture.show = true;
    },
    change: (page: Page) => {
      this.picture.get.emit(page.PageIndex);
    },
  };

  input = {
    open: () => {
      if (!this.table.selected) return;

      this.business.convert.shop(this.table.selected as Shop).then((x) => {
        this.window.information.registration.data = x;
        this.window.information.registration.input = true;
        this.window.information.registration.show = true;
      });
    },
    ok: (data: ShopRegistration) => {
      this.business
        .create(data)
        .then((x) => {
          this.toastr.success('操作成功');
          this.table.selected = undefined;
          this.table.load.emit(this.table.args);
        })
        .catch(() => {
          this.toastr.error('导入失败');
        });
    },
  };

  relate = {
    open: () => {
      if (!this.table.selected) return;
      this.window.relate.data = this.table.selected as Shop;
      this.window.relate.show = true;
    },
    ok: (data: ShopRegistration) => {
      if (this.table.selected instanceof Shop) {
        this.table.selected.RegistrationId = data.Id;
        this.business
          .update(this.table.selected)
          .then((x) => {
            this.toastr.success('操作成功');
            this.table.selected = undefined;
            this.table.load.emit(this.table.args);
          })
          .catch((x) => {
            this.toastr.error('操作失败');
          });
      }
    },
    close: () => {
      this.window.relate.clear();
      this.window.relate.show = false;
    },
  };

  async oncreate() {
    // this.business
    //   .create(this.table.selected as Shop)
    //   .then((x) => {
    //     this.toastr.success('操作成功');
    //     this.table.selected = undefined;
    //     this.table.load.emit(this.table.args);
    //   })
    //   .catch(() => {
    //     this.toastr.error('导入失败');
    //   });
  }
}
