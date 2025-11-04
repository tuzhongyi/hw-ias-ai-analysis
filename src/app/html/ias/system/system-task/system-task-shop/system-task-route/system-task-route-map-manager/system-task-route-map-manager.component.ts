import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IShop } from '../../../../../../../common/data-core/models/arm/analysis/shop.interface';
import { AnalysisTask } from '../../../../../../../common/data-core/models/arm/analysis/task/analysis-task.model';
import { FileGpsItem } from '../../../../../../../common/data-core/models/arm/file/file-gps-item.model';
import { ShopRegistrationTaskDetectedResult } from '../../../../../../../common/data-core/models/arm/geographic/shop-registration-task-detected-result.model';
import { ShopRegistration } from '../../../../../../../common/data-core/models/arm/geographic/shop-registration.model';
import { NameValue } from '../../../../../../../common/data-core/models/capabilities/enum-name-value.model';
import { PagedList } from '../../../../../../../common/data-core/models/page-list.model';
import { IASMapPanelSettingsComponent } from '../../../../../share/map-panel/ias-map-panel-settings/ias-map-panel-settings.component';
import { PicturePolygonArgs } from '../../../../../share/picture/picture-polygon/picture-polygon.model';
import { SystemMapSearchComponent } from '../../../../system-map/system-map-search/system-map-search.component';
import { SystemTaskRouteMapPanelDetailsManagerComponent } from '../system-task-route-map-panel/system-task-route-map-panel-details/system-task-route-map-panel-details-manager/system-task-route-map-panel-details-manager.component';
import { SystemTaskRouteMapPanelShopRegistrationListComponent } from '../system-task-route-map-panel/system-task-route-map-panel-shop-registration-list/system-task-route-map-panel-shop-registration-list.component';
import { SystemTaskRouteMapPanelShopRegistrationStateComponent } from '../system-task-route-map-panel/system-task-route-map-panel-shop-registration-state/system-task-route-map-panel-shop-registration-state.component';
import { SystemTaskRouteMapPanelStatisticComponent } from '../system-task-route-map-panel/system-task-route-map-panel-statistic/system-task-route-map-panel-statistic.component';
import { SystemTaskRouteMapComponent } from '../system-task-route-map/system-task-route-map.component';
import { SystemTaskRouteMapArgs } from '../system-task-route-map/system-task-route-map.model';
import { ShopStatisticStatus } from '../system-task-route-statistic/system-task-route-statistic.model';
import { SystemTaskRouteMapManagerPanel } from './panel/system-task-route-map-manager.panel';

@Component({
  selector: 'ias-system-task-route-map-manager',
  imports: [
    CommonModule,
    SystemTaskRouteMapComponent,
    SystemMapSearchComponent,
    SystemTaskRouteMapPanelDetailsManagerComponent,
    SystemTaskRouteMapPanelShopRegistrationListComponent,
    SystemTaskRouteMapPanelShopRegistrationStateComponent,
    IASMapPanelSettingsComponent,
    SystemTaskRouteMapPanelStatisticComponent,
  ],
  templateUrl: './system-task-route-map-manager.component.html',
  styleUrl: './system-task-route-map-manager.component.less',
})
export class SystemTaskRouteMapManagerComponent {
  @Input('data') task?: AnalysisTask;
  @Output() current = new EventEmitter<FileGpsItem>();
  @Output() loaded = new EventEmitter<ShopRegistrationTaskDetectedResult[]>();
  @Output() video = new EventEmitter<IShop>();
  @Output() picture = new EventEmitter<
    PagedList<NameValue<PicturePolygonArgs>>
  >();
  @Output() analysis = new EventEmitter<ShopStatisticStatus | undefined>();
  @Output() registration = new EventEmitter<boolean | undefined>();

  map = {
    args: new SystemTaskRouteMapArgs(),
    rectified: false,
    load: new EventEmitter<SystemTaskRouteMapArgs>(),
    focus: new EventEmitter<ShopRegistration>(),
    over: new EventEmitter<ShopRegistration>(),
    out: new EventEmitter<ShopRegistration>(),
  };
  panel = new SystemTaskRouteMapManagerPanel();

  datas: ShopRegistrationTaskDetectedResult[] = [];

  on = {
    current: (data: FileGpsItem) => {
      this.current.emit(data);
    },
    loaded: (datas: ShopRegistrationTaskDetectedResult[]) => {
      this.datas = datas;
      this.loaded.emit(datas);
    },
    table: {
      position: (data: ShopRegistrationTaskDetectedResult) => {
        this.map.focus.emit(data);
      },
      details: (data: ShopRegistrationTaskDetectedResult) => {
        this.on.point.click(data);
      },
      select: (data: ShopRegistrationTaskDetectedResult) => {
        if (this.panel.details.show) {
          this.on.point.click(data);
          this.on.table.position(data);
        }
      },
      video: (data: ShopRegistrationTaskDetectedResult) => {
        this.on.video(data);
      },
      item: {
        over: (data: ShopRegistrationTaskDetectedResult) => {
          this.map.over.emit(data);
        },
        out: (data: ShopRegistrationTaskDetectedResult) => {
          this.map.out.emit(data);
        },
      },
    },
    search: () => {
      this.map.load.emit(this.map.args);
      this.panel.details.show = false;
      this.panel.list.show = true;
    },
    point: {
      click: (data: ShopRegistration) => {
        this.panel.details.data = data;
        this.panel.details.show = true;
      },
    },
    state: (states: boolean[]) => {
      this.map.args.detecteds = states;
      this.map.load.emit(this.map.args);
    },
    video: (data: ShopRegistrationTaskDetectedResult) => {
      this.video.emit(data);
    },
    picture: (data: PagedList<NameValue<PicturePolygonArgs>>) => {
      this.picture.emit(data);
    },
    analysis: (type?: ShopStatisticStatus) => {
      this.analysis.emit(type);
    },
    registration: (detected?: boolean) => {
      this.registration.emit(detected);
    },
  };
}
