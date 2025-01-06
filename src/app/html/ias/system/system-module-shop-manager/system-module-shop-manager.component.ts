import { Component, EventEmitter, OnInit } from '@angular/core';
import { LocalStorage } from '../../../../common/storage/local.storage';
import { Language } from '../../../../common/tools/language';
import {
  ShopModel,
  SystemModuleShopTableArgs,
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
    private local: LocalStorage
  ) {
    this.args = new SystemModuleShopTableArgs(
      source.duration[source.duration.length - 1].Value
    );
  }

  args: SystemModuleShopTableArgs;
  load = new EventEmitter<SystemModuleShopTableArgs>();
  Language = Language;
  window = new SystemModuleShopManagerWindow();
  mode = 0;

  inited = false;

  ngOnInit(): void {
    this.source.state.select.subscribe((x) => {
      this.args.states = x;
    });
    this.source.state.inited.subscribe((x) => {
      this.inited = true;
    });
    let storage = this.local.system.module.shop.get();
    if (storage && storage.mode) {
      this.mode = storage.mode;
    }
  }

  onmode() {
    this.local.system.module.shop.set({ mode: this.mode });
  }

  onmarking() {
    this.load.emit(this.args);
  }

  onsearch() {
    this.load.emit(this.args);
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
    this.load.emit(this.args);
  }
}
