import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IShop } from '../../../../../../../common/data-core/models/arm/analysis/shop.interface';
import { AnalysisTask } from '../../../../../../../common/data-core/models/arm/analysis/task/analysis-task.model';
import { NameValue } from '../../../../../../../common/data-core/models/capabilities/enum-name-value.model';
import { IIdNameModel } from '../../../../../../../common/data-core/models/model.interface';
import { PagedList } from '../../../../../../../common/data-core/models/page-list.model';
import { EnumTool } from '../../../../../../../common/tools/enum-tool/enum.tool';
import { Language } from '../../../../../../../common/tools/language-tool/language';
import { PicturePolygonArgs } from '../../../../../share/picture/picture-polygon/picture-polygon.model';
import { ShopStatisticStatus } from '../../../system-task-route/system-task-route-statistic/system-task-route-statistic.model';
import { SystemTaskShopAnalysisDetailsComponent } from '../system-task-shop-analysis-details/system-task-shop-analysis-details.component';
import { SystemTaskShopAnalysisTableComponent } from '../system-task-shop-analysis-table/system-task-shop-analysis-table.component';
import {
  ISystemTaskShopAnalysisTableItem,
  SystemTaskShopAnalysisTableArgs,
} from '../system-task-shop-analysis-table/system-task-shop-analysis-table.model';
import { SystemTaskShopAnalysisManagerBusiness } from './system-task-shop-analysis-manager.business';

@Component({
  selector: 'ias-system-task-shop-analysis-manager',
  imports: [
    CommonModule,
    FormsModule,
    SystemTaskShopAnalysisTableComponent,
    SystemTaskShopAnalysisDetailsComponent,
  ],
  templateUrl: './system-task-shop-analysis-manager.component.html',
  styleUrl: './system-task-shop-analysis-manager.component.less',
  providers: [SystemTaskShopAnalysisManagerBusiness],
})
export class SystemTaskShopAnalysisManagerComponent implements OnInit {
  @Input() data?: AnalysisTask;
  @Input() status?: ShopStatisticStatus;
  @Output() video = new EventEmitter<IShop>();
  @Output() picture = new EventEmitter<
    PagedList<NameValue<PicturePolygonArgs>>
  >();
  constructor(private business: SystemTaskShopAnalysisManagerBusiness) {}
  Language = Language;
  table = {
    args: new SystemTaskShopAnalysisTableArgs(),
    load: new EventEmitter<SystemTaskShopAnalysisTableArgs>(),
    selected: undefined as ISystemTaskShopAnalysisTableItem | undefined,
    inited: false,
    loaded: (datas: ISystemTaskShopAnalysisTableItem[]) => {
      if (this.table.inited) return;
      this.table.inited = true;
      let roads = datas
        .filter((x) => !!x.shop.RoadId && !!x.shop.RoadName)
        .map((x) => {
          return {
            Id: x.shop.RoadId!,
            Name: x.shop.RoadName || '',
          };
        });
      let map = new Map(roads.map((x) => [x.Id, x]));
      this.source.road.on = Array.from(map.values());

      roads = datas
        .filter((x) => !!x.shop.OriRoadId && !!x.shop.OriRoadName)
        .map((x) => {
          return {
            Id: x.shop.OriRoadId!,
            Name: x.shop.OriRoadName || '',
          };
        });

      map = new Map(roads.map((x) => [x.Id, x]));
      this.source.road.ori = Array.from(map.values());
    },
  };
  source = {
    road: {
      on: [] as IIdNameModel[],
      ori: [] as IIdNameModel[],
    },
    status: [] as ShopStatisticStatus[],
  };

  ngOnInit(): void {
    if (this.data) {
      this.table.args.taskId = this.data.Id;
    }
    this.table.args.status = this.status;
    this.init();
  }

  init() {
    this.source.status = EnumTool.values(ShopStatisticStatus);
  }

  on = {
    search: () => {
      this.table.load.emit(this.table.args);
    },
    video: (item: ISystemTaskShopAnalysisTableItem) => {
      this.video.emit(item.shop);
    },
    picture: (paged: PagedList<NameValue<PicturePolygonArgs>>) => {
      this.picture.emit(paged);
    },
  };
}
