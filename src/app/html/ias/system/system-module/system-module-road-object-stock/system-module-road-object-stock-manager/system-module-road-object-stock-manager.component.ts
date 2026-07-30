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
import { RoadObjectStock } from '../../../../../../common/data-core/models/arm/geographic/road-object-stock.model';
import { Language } from '../../../../../../common/tools/language-tool/language';
import { SystemModuleRoadObjectStockMapComponent } from '../system-module-road-object-stock-map/system-module-road-object-stock-map.component';
import { SystemModuleRoadObjectStockTableComponent } from '../system-module-road-object-stock-table/system-module-road-object-stock-table.component';
import { SystemModuleRoadObjectStockTableArgs } from '../system-module-road-object-stock-table/system-module-road-object-stock-table.model';
import { SystemModuleRoadObjectStockManagerBusiness } from './system-module-road-object-stock-manager.business';
import { SystemModuleRoadObjectStockManagerSource } from './system-module-road-object-stock-manager.source';

@Component({
  selector: 'ias-system-module-road-object-stock-manager',
  imports: [
    CommonModule,
    FormsModule,
    HowellSelectComponent,
    SystemModuleRoadObjectStockTableComponent,
    SystemModuleRoadObjectStockMapComponent,
  ],
  templateUrl: './system-module-road-object-stock-manager.component.html',
  styleUrl: './system-module-road-object-stock-manager.component.less',
  providers: [
    SystemModuleRoadObjectStockManagerSource,
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

  constructor(
    public source: SystemModuleRoadObjectStockManagerSource,
    private business: SystemModuleRoadObjectStockManagerBusiness,
    private toastr: ToastrService,
  ) {}
  Language = Language;

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
        if (datas.length > 0) {
          let index = this.table.datas.findIndex(
            (x) => x.Id == datas[datas.length - 1].Id,
          );
          if (index >= 0) {
            this.table.page.emit({ index: index + 1, picture: false });
          }
        }
      },
      details: (data: RoadObjectStock) => {
        this.modify.emit(data);
      },
    },
  };

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

  delete(data: RoadObjectStock) {
    this.business
      .delete(data.Id!)
      .then(() => {
        this.toastr.success('操作成功');
        this.table.args.first = false;
        this.table.load.emit(this.table.args);
      })
      .catch(() => {
        this.toastr.error('操作失败');
      });
  }
}
