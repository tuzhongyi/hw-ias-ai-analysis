import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IShop } from '../../../../../../common/data-core/models/arm/analysis/shop.interface';
import { AnalysisTask } from '../../../../../../common/data-core/models/arm/analysis/task/analysis-task.model';
import { FileGpsItem } from '../../../../../../common/data-core/models/arm/file/file-gps-item.model';
import { NameValue } from '../../../../../../common/data-core/models/capabilities/enum-name-value.model';
import { PagedList } from '../../../../../../common/data-core/models/page-list.model';
import { PicturePolygonArgs } from '../../../../share/picture/picture-polygon/picture-polygon.model';
import { SystemTaskRouteMapManagerComponent } from '../system-task-route-map-manager/system-task-route-map-manager.component';
import { SystemTaskRouteStatisticComponent } from '../system-task-route-statistic/system-task-route-statistic.component';
import { ShopStatisticStatus } from '../system-task-route-statistic/system-task-route-statistic.model';

@Component({
  selector: 'ias-system-task-route-manager',
  imports: [
    CommonModule,
    SystemTaskRouteStatisticComponent,
    SystemTaskRouteMapManagerComponent,
  ],
  templateUrl: './system-task-route-manager.component.html',
  styleUrl: './system-task-route-manager.component.less',
})
export class SystemTaskRouteManagerComponent {
  @Input() data?: AnalysisTask;
  @Input() rectified?: boolean;
  @Output() current = new EventEmitter<FileGpsItem>();
  @Output() analysis = new EventEmitter<ShopStatisticStatus | undefined>();
  @Output() registration = new EventEmitter<boolean | undefined>();
  @Output() video = new EventEmitter<IShop>();
  @Output() picture = new EventEmitter<
    PagedList<NameValue<PicturePolygonArgs>>
  >();

  on = {
    current: (data: FileGpsItem) => {
      this.current.emit(data);
    },
    analysis: (type?: ShopStatisticStatus) => {
      this.analysis.emit(type);
    },
    registration: (detected?: boolean) => {
      this.registration.emit(detected);
    },
    video: (data: IShop) => {
      this.video.emit(data);
    },
    picture: (data: PagedList<NameValue<PicturePolygonArgs>>) => {
      this.picture.emit(data);
    },
  };
}
