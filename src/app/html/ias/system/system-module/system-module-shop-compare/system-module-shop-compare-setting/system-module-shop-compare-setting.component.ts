import { CommonModule } from '@angular/common';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ContentHeaderComponent } from '../../../../share/header/content-header/content-header.component';
import { SystemModuleShopCompareSettingTaskController } from './controller/system-module-shop-compare-setting-task.controller';
import { SystemModuleShopCompareSettingController } from './controller/system-module-shop-compare-setting.controller';
import { SystemModuleShopCompareSettingSource } from './controller/system-module-shop-compare-setting.source';
import { SystemModuleShopCompareSettingBusiness } from './system-module-shop-compare-setting.business';

@Component({
  selector: 'ias-system-module-shop-compare-setting',
  imports: [CommonModule, FormsModule, ContentHeaderComponent],
  templateUrl: './system-module-shop-compare-setting.component.html',
  styleUrl: './system-module-shop-compare-setting.component.less',
  providers: [
    SystemModuleShopCompareSettingSource,
    SystemModuleShopCompareSettingTaskController,
    SystemModuleShopCompareSettingController,
    SystemModuleShopCompareSettingBusiness,
  ],
})
export class SystemModuleShopCompareSettingComponent implements OnInit {
  @Output() close = new EventEmitter<void>();
  constructor(
    private business: SystemModuleShopCompareSettingBusiness,
    public source: SystemModuleShopCompareSettingSource,
    public controller: SystemModuleShopCompareSettingController
  ) {
    this.max = this.controller.task.count;
  }

  max: number;

  ngOnInit(): void {
    this.init();
  }
  private init() {
    this.business.count.then((x) => {
      this.max = x;
      if (this.controller.task.count === 0) {
        this.controller.task.count = x;
      }
    });
  }

  onreset() {
    this.controller.reset();
  }

  onclose() {
    this.close.emit();
  }
}
