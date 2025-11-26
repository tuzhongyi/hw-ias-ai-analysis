import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HowellSelectComponent } from '../../../../../common/components/hw-select/select-control.component';
import { Paged } from '../../../../../common/data-core/models/page-list.model';
import { PictureListComponent } from '../../../share/picture/picture-list/picture-list.component';
import { WindowComponent } from '../../../share/window/component/window.component';
import { SystemEventGpsTaskManagerComponent } from '../../system-event/system-event-gps-task/system-event-gps-task-manager/system-event-gps-task-manager.component';
import { SystemEventManagerRealtimeComponent } from '../../system-event/system-event-manager/system-event-manager-realtime/system-event-manager-realtime.component';
import { SystemEventManagerShopComponent } from '../../system-event/system-event-manager/system-event-manager-shop/system-event-manager-shop.component';
import { SystemEventProcessRealtimeComponent } from '../../system-event/system-event-process/system-event-process-realtime/system-event-process-realtime.component';
import { SystemEventVideoComponent } from '../../system-event/system-event-video/system-event-video.component';
import { SystemModuleRoadManagerComponent } from '../../system-module/system-module-road/system-module-road-manager/system-module-road-manager.component';
import { SystemModuleShopRegistrationManagerComponent } from '../../system-module/system-module-shop-registration/system-module-shop-registration-manager/system-module-shop-registration-manager.component';
import { SystemModuleGpsTaskManagerComponent } from '../../system-task/system-module-gps-task/system-module-gps-task-manager/system-module-gps-task-manager.component';
import { SystemTaskManagerComponent } from '../../system-task/system-task-shop/system-task-manager/system-task-manager.component';
import { SystemTaskVideoComponent } from '../../system-task/system-task-shop/system-task-video/system-task-video.component';
import { SystemMainManagerWindow } from './controller/system-main-manager.window';
import { SystemMainManagerWindowSource } from './system-main-manager-window.source';

@Component({
  selector: 'ias-system-main-manager-window',
  imports: [
    CommonModule,
    FormsModule,
    HowellSelectComponent,
    WindowComponent,
    PictureListComponent,
    SystemEventVideoComponent,
    SystemTaskVideoComponent,
    SystemEventProcessRealtimeComponent,
    SystemEventManagerRealtimeComponent,
    SystemEventManagerShopComponent,
    SystemEventGpsTaskManagerComponent,
    SystemTaskManagerComponent,
    SystemModuleGpsTaskManagerComponent,
    SystemModuleRoadManagerComponent,
    SystemModuleShopRegistrationManagerComponent,
  ],
  templateUrl: './system-main-manager-window.component.html',
  styleUrl: './system-main-manager-window.component.less',
  providers: [SystemMainManagerWindowSource],
})
export class SystemMainManagerWindowComponent {
  @Input() window = new SystemMainManagerWindow();

  constructor(public source: SystemMainManagerWindowSource) {}

  picture = {
    open: <T>(paged: Paged<T>) => {
      this.window.picture.open(paged);
    },
  };
}
