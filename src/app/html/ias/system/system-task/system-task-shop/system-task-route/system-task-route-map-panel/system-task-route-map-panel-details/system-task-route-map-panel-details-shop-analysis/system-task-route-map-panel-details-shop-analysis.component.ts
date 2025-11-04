import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';
import { ContainerPageComponent } from '../../../../../../../../../common/components/container-page/container-page.component';
import { ContainerZoomComponent } from '../../../../../../../../../common/components/container-zoom/container-zoom.component';
import { ShopSign } from '../../../../../../../../../common/data-core/models/arm/analysis/shop-sign.model';
import { Shop } from '../../../../../../../../../common/data-core/models/arm/analysis/shop.model';
import { AnalysisTask } from '../../../../../../../../../common/data-core/models/arm/analysis/task/analysis-task.model';
import { ShopRegistration } from '../../../../../../../../../common/data-core/models/arm/geographic/shop-registration.model';
import { HowellPoint } from '../../../../../../../../../common/data-core/models/arm/point.model';
import { NameValue } from '../../../../../../../../../common/data-core/models/capabilities/enum-name-value.model';
import {
  Page,
  PagedList,
} from '../../../../../../../../../common/data-core/models/page-list.model';
import { Language } from '../../../../../../../../../common/tools/language-tool/language';
import { PicturePolygonComponent } from '../../../../../../../share/picture/picture-polygon/picture-polygon.component';
import { PicturePolygonArgs } from '../../../../../../../share/picture/picture-polygon/picture-polygon.model';
import { SystemTaskRouteMapPanelDetailsShopAnalysisBusiness } from './system-task-route-map-panel-details-shop-analysis.business';

@Component({
  selector: 'ias-system-task-route-map-panel-details-shop-analysis',
  imports: [
    CommonModule,
    ContainerZoomComponent,
    ContainerPageComponent,
    PicturePolygonComponent,
  ],
  templateUrl:
    './system-task-route-map-panel-details-shop-analysis.component.html',
  styleUrl:
    './system-task-route-map-panel-details-shop-analysis.component.less',
  providers: [SystemTaskRouteMapPanelDetailsShopAnalysisBusiness],
})
export class SystemTaskRouteMapPanelDetailsShopAnalysisComponent
  implements OnChanges
{
  @Input() data?: Shop;
  @Input() task?: AnalysisTask;
  @Input() registration?: ShopRegistration;
  @Output('picture') output_picture = new EventEmitter<
    PagedList<NameValue<PicturePolygonArgs>>
  >();

  constructor(
    private business: SystemTaskRouteMapPanelDetailsShopAnalysisBusiness
  ) {}
  ngOnChanges(changes: SimpleChanges): void {
    let change = false;
    if (changes['data']) {
      change = true;
    }
    if (changes['task']) {
      change = true;
    }
    if (change && this.task && this.data) {
      this.sign.load(this.task, this.data);
    }
  }

  Language = Language;
  sign = {
    datas: [] as ShopSign[],
    load: (task: AnalysisTask, shop: Shop) => {
      this.business.load(task.Id, shop.Id).then((x) => {
        this.sign.datas = x;
        let page = Page.create(1, 1, x.length);
        this.picture.page.change(page);
      });
    },
  };
  picture = {
    src: '',
    polygon: [] as HowellPoint[],
    page: {
      data: new Page(),
      change: (page: Page) => {
        this.picture.page.data = page;
        let sign = this.sign.datas[page.PageIndex - 1];
        if (sign.ImageUrl) {
          this.picture.src = sign.ImageUrl;
          this.picture.polygon = sign.Polygon ?? [];
        }
      },
    },
    full: () => {
      let values = this.sign.datas.map((x) => {
        let args = new PicturePolygonArgs();
        args.id = x.ImageUrl;
        args.polygon = x.Polygon ?? [];
        return new NameValue(args, x.Text);
      });
      let paged = PagedList.create(
        values,
        this.picture.page.data.PageIndex,
        values.length
      );
      this.output_picture.emit(paged);
    },
  };
}
