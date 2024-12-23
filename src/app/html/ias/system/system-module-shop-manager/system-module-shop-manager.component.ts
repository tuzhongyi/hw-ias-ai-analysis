import { CommonModule } from '@angular/common';
import { Component, EventEmitter, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonLabelSelecComponent } from '../../../../common/components/common-label-select/common-label-select.component';
import { DateTimeControlComponent } from '../../../../common/components/date-time-control/date-time-control.component';
import { Language } from '../../../../common/tools/language';
import { wait } from '../../../../common/tools/wait';
import { SelectShopObjectStateComponent } from '../../share/select/select-shop-object-state/select-shop-object-state.component';
import { SystemModuleShopTableComponent } from '../system-module-shop-table/system-module-shop-table.component';
import { SystemModuleShopTableArgs } from '../system-module-shop-table/system-module-shop-table.model';
import { SystemModuleShopManagerDurationController } from './controller/system-module-shop-manager-duration.controller';
import { SystemModuleShopManagerSourceController } from './controller/system-module-shop-manager-source.controller';
import { SystemModuleShopManagerStateController } from './controller/system-module-shop-manager-state.controller';

@Component({
  selector: 'ias-system-module-shop-manager',
  imports: [
    CommonModule,
    FormsModule,
    DateTimeControlComponent,
    SystemModuleShopTableComponent,
    CommonLabelSelecComponent,
    SelectShopObjectStateComponent,
  ],
  templateUrl: './system-module-shop-manager.component.html',
  styleUrl: './system-module-shop-manager.component.less',
  providers: [
    SystemModuleShopManagerDurationController,
    SystemModuleShopManagerStateController,
    SystemModuleShopManagerSourceController,
  ],
})
export class SystemModuleShopManagerComponent implements OnInit {
  constructor(public source: SystemModuleShopManagerSourceController) {
    this.args = new SystemModuleShopTableArgs(
      source.duration[source.duration.length - 1].Value
    );
  }

  args: SystemModuleShopTableArgs;
  load = new EventEmitter<SystemModuleShopTableArgs>();
  Language = Language;

  inited = {
    table: false,
    state: false,
  };

  ngOnInit(): void {
    this.source.state.select.subscribe((x) => {
      this.args.states = x;
    });
    this.source.state.inited.subscribe((x) => {
      this.inited.state = true;
    });
    this.init();
  }

  onmarking() {
    this.load.emit(this.args);
  }

  onsearch() {
    this.load.emit(this.args);
  }

  oninited() {
    this.inited.table = true;
  }

  init() {
    wait(
      () => {
        return this.inited.table && this.inited.state;
      },
      () => {
        this.load.emit(this.args);
      }
    );
  }
}
