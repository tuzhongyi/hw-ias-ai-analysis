import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChange,
  SimpleChanges,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { HowellSelectComponent } from '../../../../../../common/components/hw-select/select-control.component';
import { WindowConfirmComponent } from '../../../../../../common/components/window-confirm/window-confirm.component';
import { RoadObjectStock } from '../../../../../../common/data-core/models/arm/geographic/road-object-stock.model';
import { RoadObject } from '../../../../../../common/data-core/models/arm/geographic/road-object.model';
import { Language } from '../../../../../../common/tools/language-tool/language';
import { WindowComponent } from '../../../../share/window/component/window.component';
import { SystemModuleRoadObjectSource } from '../../system-module-road-object/system-module-road-object.source';
import { SystemModuleRoadObjectStockDetailsManagerComponent } from '../system-module-road-object-stock-details/system-module-road-object-stock-details-manager/system-module-road-object-stock-details-manager.component';
import { SystemModuleRoadObjectStockMapComponent } from '../system-module-road-object-stock-map/system-module-road-object-stock-map.component';
import { SystemModuleRoadObjectStockTableComponent } from '../system-module-road-object-stock-table/system-module-road-object-stock-table.component';
import { SystemModuleRoadObjectStockTableArgs } from '../system-module-road-object-stock-table/system-module-road-object-stock-table.model';
import { SystemModuleRoadObjectStockTransformManagerComponent } from '../system-module-road-object-stock-transform/system-module-road-object-stock-transform-manager/system-module-road-object-stock-transform-manager.component';
import { SystemModuleRoadObjectStockManagerBusiness } from './system-module-road-object-stock-manager.business';
import { SystemModuleRoadObjectStockManagerWindow } from './window/system-module-road-object-stock-manager.window';

@Component({
  selector: 'ias-system-module-road-object-stock-manager',
  imports: [
    CommonModule,
    FormsModule,
    HowellSelectComponent,
    SystemModuleRoadObjectStockTableComponent,
    SystemModuleRoadObjectStockMapComponent,
    SystemModuleRoadObjectStockDetailsManagerComponent,
    SystemModuleRoadObjectStockTransformManagerComponent,
    WindowComponent,
    WindowConfirmComponent,
  ],
  templateUrl: './system-module-road-object-stock-manager.component.html',
  styleUrl: './system-module-road-object-stock-manager.component.less',
  providers: [
    SystemModuleRoadObjectSource,
    SystemModuleRoadObjectStockManagerBusiness,
  ],
})
export class SystemModuleRoadObjectStockManagerComponent
  implements OnInit, OnChanges
{
  @Input() args?: SystemModuleRoadObjectStockTableArgs;
  @Input() mapable = true;
  @Input() iswindow = false;
  @Output() modify = new EventEmitter<RoadObjectStock>();
  @Output() ok = new EventEmitter<RoadObject[]>();

  constructor(
    public source: SystemModuleRoadObjectSource,
    public business: SystemModuleRoadObjectStockManagerBusiness,
    public toastr: ToastrService,
  ) {}
  Language = Language;
  window = new SystemModuleRoadObjectStockManagerWindow(this);
  JSON = JSON;

  private change = {
    args: (simple: SimpleChange) => {
      if (simple) {
        this.table.args = {
          ...this.table.args,
          ...this.args,
        };
      }
    },
  };
  ngOnChanges(changes: SimpleChanges): void {
    this.change.args(changes['args']);
  }

  ngOnInit(): void {}

  selecteds: RoadObjectStock[] = [];

  table = {
    args: new SystemModuleRoadObjectStockTableArgs(),
    load: new EventEmitter<SystemModuleRoadObjectStockTableArgs>(),
    datas: [] as RoadObjectStock[],
    page: new EventEmitter<{ index: number; picture: boolean }>(),

    search: () => {
      this.table.args.first = true;
      this.table.load.emit(this.table.args);
    },
    on: {
      load: (x: RoadObjectStock[]) => {
        this.table.datas = x;
      },
      select: (datas: RoadObjectStock[]) => {
        this.selecteds = [...datas];
      },
      details: (data: RoadObjectStock) => {
        this.window.details.open(data);
      },
      delete: (data: RoadObjectStock) => {
        this.window.confirm.open(data);
      },
      locate: (data: RoadObjectStock) => {
        this.located = data;
      },
    },
  };

  located?: RoadObjectStock;

  map = {
    full: false,
    over: new EventEmitter<RoadObjectStock>(),
    out: new EventEmitter<RoadObjectStock>(),
    select: (data: RoadObjectStock) => {
      let index = this.table.datas.findIndex((x) => x.Id == data.Id);
      if (index >= 0) {
        this.table.page.emit({ index: index + 1, picture: false });
      }
    },
  };
}
