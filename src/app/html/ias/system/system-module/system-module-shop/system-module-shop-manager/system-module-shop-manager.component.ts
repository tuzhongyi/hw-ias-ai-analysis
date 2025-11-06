import { Component, EventEmitter, OnDestroy, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ShopSign } from '../../../../../../common/data-core/models/arm/analysis/shop-sign.model';
import { Shop } from '../../../../../../common/data-core/models/arm/analysis/shop.model';
import {
  Page,
  Paged,
} from '../../../../../../common/data-core/models/page-list.model';
import { LocalStorage } from '../../../../../../common/storage/local.storage';
import { ISystemModuleShopStorage } from '../../../../../../common/storage/system-module-storage/system-module-shop.storage';
import { ShopViewModel } from '../../../../../../common/view-models/shop/shop.view-model';
import {
  SystemModuleShopTableArgs,
  SystemModuleShopTableLoadArgs,
} from '../system-module-shop-table/system-module-shop-table.model';
import { SystemModuleShopManagerSourceController } from './controller/system-module-shop-manager-source.controller';
import {
  SystemModuleShopManagerImports,
  SystemModuleShopManagerProviders,
} from './system-module-shop-manager.module';
import { SystemModuleShopManagerWindow } from './system-module-shop-manager.window';

@Component({
  selector: 'ias-system-module-shop-manager',
  templateUrl: './system-module-shop-manager.component.html',
  styleUrl: './system-module-shop-manager.component.less',
  imports: [...SystemModuleShopManagerImports],
  providers: [...SystemModuleShopManagerProviders],
})
export class SystemModuleShopManagerComponent implements OnInit, OnDestroy {
  constructor(
    public source: SystemModuleShopManagerSourceController,
    private local: LocalStorage,
    private toastr: ToastrService
  ) {
    this.args = new SystemModuleShopTableArgs(
      source.duration[source.duration.length - 1].Value
    );
    this.storage = this.local.system.module.shop.get();
  }

  args: SystemModuleShopTableArgs;
  load = new EventEmitter<SystemModuleShopTableLoadArgs>();

  window = new SystemModuleShopManagerWindow();
  storage: ISystemModuleShopStorage;
  handle: any;
  inited = false;

  picture = {
    page: new EventEmitter<number>(),
    open: (paged: Paged<ShopViewModel>) => {
      this.window.picture.page = paged.Page;
      this.window.picture.id = paged.Data.ImageUrl;
      this.window.picture.title = paged.Data.Name;
      this.window.picture.polygon = [];
      this.window.picture.show = true;
    },
    change: (page: Page) => {
      this.picture.page.emit(page.PageIndex);
    },
  };

  ngOnInit(): void {
    this.source.state.select.subscribe((x) => {
      this.args.states = x;
    });
    this.source.state.inited.subscribe((x) => {
      this.inited = true;
    });
    this.handle = this.onenter.bind(this);
    window.addEventListener('keypress', this.handle);
  }

  ngOnDestroy(): void {
    window.removeEventListener('keypress', this.handle);
  }

  onenter(e: KeyboardEvent) {
    if (e.key === 'Enter') {
      this.onsearch();
    }
  }

  onmode() {
    this.local.system.module.shop.set(this.storage);
  }

  onmarking() {
    let args = new SystemModuleShopTableLoadArgs(this.args);
    this.load.emit(args);
  }

  onsearch() {
    let args = new SystemModuleShopTableLoadArgs(this.args, true);
    this.load.emit(args);
  }
  onerror(e: Error) {
    this.toastr.error(e.message);
  }

  create = {
    open: () => {
      this.window.information.clear();
      this.window.information.show = true;
    },
    ok: (data: Shop) => {
      this.window.information.clear();
      this.window.information.show = false;
      let args = new SystemModuleShopTableLoadArgs(this.args, true);
      this.load.emit(args);
    },
  };

  details = {
    open: (data: ShopViewModel) => {
      this.window.details.data = data;
      this.window.details.show = true;
    },
    ok: () => {
      this.window.details.clear();
      this.window.details.show = false;
      let args = new SystemModuleShopTableLoadArgs(this.args);
      this.load.emit(args);
    },
    picture: (data: ShopSign) => {
      let paged = Paged.create(data, 1);
      this.window.picture.page = paged.Page;
      this.window.picture.id = data.ImageUrl;
      this.window.picture.title = data.Text ?? '';
      this.window.picture.polygon = data.Polygon ?? [];
      this.window.picture.show = true;
    },
  };
  info = {
    open: (data: ShopViewModel) => {
      this.window.information.data = data;
      this.window.information.show = true;
    },
    ok: () => {
      this.window.information.clear();
      this.window.information.show = false;
    },
  };
}
