import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';
import { Shop } from '../../../../../../../../common/data-core/models/arm/analysis/shop.model';
import { AnalysisTask } from '../../../../../../../../common/data-core/models/arm/analysis/task/analysis-task.model';
import { ShopRegistrationTaskDetectedResult } from '../../../../../../../../common/data-core/models/arm/geographic/shop-registration-task-detected-result.model';
import { ShopRegistration } from '../../../../../../../../common/data-core/models/arm/geographic/shop-registration.model';
import { NameValue } from '../../../../../../../../common/data-core/models/capabilities/enum-name-value.model';
import { PagedList } from '../../../../../../../../common/data-core/models/page-list.model';
import { Language } from '../../../../../../../../common/tools/language-tool/language';
import { PicturePolygonArgs } from '../../../../../../share/picture/picture-polygon/picture-polygon.model';
import { SystemTaskRouteMapPanelDetailsShopAnalysisComponent } from '../system-task-route-map-panel-details-shop-analysis/system-task-route-map-panel-details-shop-analysis.component';
import { SystemTaskRouteMapPanelDetailsShopRegistrationComponent } from '../system-task-route-map-panel-details-shop-registration/system-task-route-map-panel-details-shop-registration.component';
import { SystemTaskRouteMapPanelDetailsManagerBusiness } from './system-task-route-map-panel-details-manager.business';

@Component({
  selector: 'ias-system-task-route-map-panel-details-manager',
  imports: [
    CommonModule,
    SystemTaskRouteMapPanelDetailsShopRegistrationComponent,
    SystemTaskRouteMapPanelDetailsShopAnalysisComponent,
  ],
  templateUrl: './system-task-route-map-panel-details-manager.component.html',
  styleUrl: './system-task-route-map-panel-details-manager.component.less',
  providers: [SystemTaskRouteMapPanelDetailsManagerBusiness],
})
export class SystemTaskRouteMapPanelDetailsManagerComponent
  implements OnChanges
{
  @Input('data') data?: ShopRegistrationTaskDetectedResult;
  @Input() task?: AnalysisTask;
  @Output() close = new EventEmitter<void>();
  @Output() picture = new EventEmitter<
    PagedList<NameValue<PicturePolygonArgs>>
  >();
  @Output() video = new EventEmitter<ShopRegistration>();

  constructor(
    private business: SystemTaskRouteMapPanelDetailsManagerBusiness
  ) {}

  Language = Language;
  title = '注册商铺信息';

  ngOnChanges(changes: SimpleChanges): void {
    let change = false;
    if (changes['data']) {
      change = true;
    }
    if (changes['task']) {
      change = true;
    }
    if (change && this.task && this.data) {
      if (!this.data.Detected) {
        this.details.index = 0;
      }
      this.details.analysis.load(this.task, this.data);
    }
  }

  details = {
    index: 0,
    analysis: {
      data: [] as Shop[],
      index: -1,
      load: (task: AnalysisTask, registration: ShopRegistration) => {
        this.business.load(task.Id, registration.Id).then((x) => {
          this.details.analysis.data = x;
        });
      },
    },
    change: (index: number) => {
      this.details.index = index;
      if (index === 0) {
        this.title = '注册商铺信息';
      } else {
        this.title = '识别商铺信息';
      }
    },
  };

  on = {
    close: () => {
      this.close.emit();
    },
    video: () => {
      if (this.data) {
        this.video.emit(this.data);
      }
    },
    picture: (data: PagedList<NameValue<PicturePolygonArgs>>) => {
      this.picture.emit(data);
    },
  };
}
