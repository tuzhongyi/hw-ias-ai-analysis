import { Component, EventEmitter, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { LocalStorage } from '../../../../common/storage/local.storage';
import { ISystemModuleShopStorage } from '../../../../common/storage/system-module-storage/system-module-shop.storage';
import { Language } from '../../../../common/tools/language';
import {
  ShopModel,
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
export class SystemModuleShopManagerComponent implements OnInit {
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
  Language = Language;
  window = new SystemModuleShopManagerWindow();
  storage: ISystemModuleShopStorage;

  inited = false;

  ngOnInit(): void {
    this.source.state.select.subscribe((x) => {
      this.args.states = x;
    });
    this.source.state.inited.subscribe((x) => {
      this.inited = true;
    });
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

  ondetails(data: ShopModel) {
    this.window.details.data = data;
    this.window.details.show = true;
  }

  ondetailsclose() {
    this.window.details.show = false;
  }
  ondetailsok() {
    this.window.details.clear();
    this.window.details.show = false;
    let args = new SystemModuleShopTableLoadArgs(this.args);
    this.load.emit(args);
  }
  onerror(e: Error) {
    this.toastr.error(e.message);
  }
}
