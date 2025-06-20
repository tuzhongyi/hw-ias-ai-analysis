import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AnalysisTask } from '../../../../../../common/data-core/models/arm/analysis/task/analysis-task.model';
import { FileGpsItem } from '../../../../../../common/data-core/models/arm/file/file-gps-item.model';
import { ShopRegistration } from '../../../../../../common/data-core/models/arm/geographic/shop-registration.model';
import { SystemTaskRouteMapPathBusiness } from './business/system-task-route-map-path.business';
import { SystemTaskRouteMapRoadBusiness } from './business/system-task-route-map-road.business';
import { SystemTaskRouteMapShopRegistrationBusiness } from './business/system-task-route-map-shop-registration.business';
import { SystemTaskRouteMapShopBusiness } from './business/system-task-route-map-shop.business';
import { SystemTaskRouteMapBusiness } from './business/system-task-route-map.business';
import { SystemTaskRouteMapAMapController } from './controller/amap/system-task-route-map-amap.controller';
import { SystemTaskRouteMapController } from './controller/system-task-route-map.controller';

@Component({
  selector: 'ias-system-task-route-map',
  imports: [],
  templateUrl: './system-task-route-map.component.html',
  styleUrl: './system-task-route-map.component.less',
  providers: [
    SystemTaskRouteMapController,
    SystemTaskRouteMapAMapController,

    SystemTaskRouteMapBusiness,
    SystemTaskRouteMapRoadBusiness,
    SystemTaskRouteMapPathBusiness,
    SystemTaskRouteMapShopBusiness,
    SystemTaskRouteMapShopRegistrationBusiness,
  ],
})
export class SystemTaskRouteMapComponent implements OnInit {
  @Input() data?: AnalysisTask;
  @Output() current = new EventEmitter<FileGpsItem>();
  @Output() loaded = new EventEmitter<ShopRegistration>();

  constructor(
    private controller: SystemTaskRouteMapController,
    private business: SystemTaskRouteMapBusiness
  ) {}

  ngOnInit(): void {
    this.load.road();
    if (this.data) {
      this.load.path(this.data.Id);
    }
    this.regist();
  }

  private load = {
    road: () => {
      this.business.road.load().then((x) => {
        this.controller.amap.road.load(x);
      });
    },
    path: (id: string) => {
      this.business.path.load(id).then((gps) => {
        this.controller.amap.path.load(gps);
      });
    },
    shop: {
      registration: () => {},
    },
  };
  private regist() {
    this.controller.amap.event.dblclick.subscribe((x) => {
      this.current.emit(x);
    });
  }
}
