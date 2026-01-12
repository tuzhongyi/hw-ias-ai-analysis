import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MobileDevice } from '../../../../../../common/data-core/models/arm/mobile-device/mobile-device.model';
import { SystemModuleMobileDeviceMapComponent } from '../system-module-mobile-device-map/system-module-mobile-device-map.component';
import { SystemModuleMobileDeviceTableComponent } from '../system-module-mobile-device-table/system-module-mobile-device-table.component';
import { SystemModuleMobileDeviceTableArgs } from '../system-module-mobile-device-table/system-module-mobile-device-table.model';
import { SystemModuleMobileDeviceManagerWindow } from './system-module-mobile-device-manager.window';

@Component({
  selector: 'ias-system-module-mobile-device-manager',
  imports: [
    CommonModule,
    FormsModule,
    SystemModuleMobileDeviceTableComponent,
    SystemModuleMobileDeviceMapComponent,
  ],
  templateUrl: './system-module-mobile-device-manager.component.html',
  styleUrl: './system-module-mobile-device-manager.component.less',
})
export class SystemModuleMobileDeviceManagerComponent implements OnInit {
  @Input() iswindow = false;
  @Input() operable = true;
  constructor() {
    this.window.details.show = true;
  }

  window = new SystemModuleMobileDeviceManagerWindow();

  ngOnInit(): void {}

  onsearch() {
    this.table.load.emit(this.table.args);
  }

  table = {
    args: new SystemModuleMobileDeviceTableArgs(),
    load: new EventEmitter<SystemModuleMobileDeviceTableArgs>(),
    datas: [] as MobileDevice[],
    selected: undefined as MobileDevice | undefined,
    onload: (x: MobileDevice[]) => {
      this.table.datas = x;
    },
  };
}
