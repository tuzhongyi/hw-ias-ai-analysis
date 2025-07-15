import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChange,
  SimpleChanges,
} from '@angular/core';
import { ContainerPageComponent } from '../../../../../../../common/components/container-page/container-page.component';
import { ContainerZoomComponent } from '../../../../../../../common/components/container-zoom/container-zoom.component';
import { ShopSign } from '../../../../../../../common/data-core/models/arm/analysis/shop-sign.model';
import { AnalysisTask } from '../../../../../../../common/data-core/models/arm/analysis/task/analysis-task.model';
import { ShopRegistration } from '../../../../../../../common/data-core/models/arm/geographic/shop-registration.model';
import { GisPoint } from '../../../../../../../common/data-core/models/arm/gis-point.model';
import { HowellPoint } from '../../../../../../../common/data-core/models/arm/point.model';
import { NameValue } from '../../../../../../../common/data-core/models/capabilities/enum-name-value.model';
import {
  Page,
  PagedList,
} from '../../../../../../../common/data-core/models/page-list.model';
import { ShopViewModel } from '../../../../../../../common/view-models/shop/shop.view-model';
import { IASMapComponent } from '../../../../../share/map/ias-map.component';
import {
  MapMarkerShopColor,
  MapMarkerType,
} from '../../../../../share/map/ias-map.model';
import { PicturePolygonComponent } from '../../../../../share/picture/picture-polygon/picture-polygon.component';
import { PicturePolygonArgs } from '../../../../../share/picture/picture-polygon/picture-polygon.model';
import { SystemTaskShopAnalysisDetailsInfoComponent } from '../system-task-shop-analysis-details-info/system-task-shop-analysis-details-info.component';
import { SystemTaskShopAnalysisDetailsBusiness } from './system-task-shop-analysis-details.business';

@Component({
  selector: 'ias-system-task-shop-analysis-details',
  imports: [
    CommonModule,
    ContainerZoomComponent,
    ContainerPageComponent,
    PicturePolygonComponent,
    SystemTaskShopAnalysisDetailsInfoComponent,
    IASMapComponent,
  ],
  templateUrl: './system-task-shop-analysis-details.component.html',
  styleUrl: './system-task-shop-analysis-details.component.less',
  providers: [SystemTaskShopAnalysisDetailsBusiness],
})
export class SystemTaskShopAnalysisDetailsComponent implements OnChanges {
  @Input() shop?: ShopViewModel;
  @Input() registration?: ShopRegistration;
  @Input() task?: AnalysisTask;
  @Output('picture') output_picture = new EventEmitter<
    PagedList<NameValue<PicturePolygonArgs>>
  >();
  constructor(private business: SystemTaskShopAnalysisDetailsBusiness) {}

  sign = {
    datas: [] as ShopSign[],
  };
  picture = {
    src: '',
    polygon: [] as HowellPoint[],
    page: {
      data: Page.create(1),
      change: (page: Page) => {
        this.picture.page.data = page;
        let index = page.PageIndex - 1;
        if (index >= 0 && index < this.sign.datas.length) {
          let item = this.sign.datas[index];
          this.picture.src = item.ImageUrl ?? '';
          this.picture.polygon = item.Polygon ?? [];
          this.map.points = item.Location ? [item.Location] : [];
        }
      },
    },
    full: () => {
      let datas = this.sign.datas.map((x) => {
        let nv = new NameValue<PicturePolygonArgs>();
        let args = new PicturePolygonArgs();
        args.id = x.ImageUrl;
        args.polygon = x.Polygon ?? [];
        nv.Value = args;
        nv.Name = x.Text ?? '';
        return nv;
      });
      let page = new Page();
      page.PageCount = 1;
      page.PageIndex = this.picture.page.data.PageIndex;
      page.PageSize = datas.length;
      page.RecordCount = datas.length;
      page.TotalRecordCount = datas.length;
      let paged = new PagedList<NameValue<PicturePolygonArgs>>();
      paged.Data = datas;
      paged.Page = page;
      this.output_picture.emit(paged);
    },
  };
  map = {
    marker: {
      type: MapMarkerType.shop,
      color: MapMarkerShopColor.green,
    },
    points: [] as GisPoint[],
    location: undefined as GisPoint | undefined,
  };

  ngOnChanges(changes: SimpleChanges): void {
    this.change.task(changes['task']);
    this.change.shop(changes['shop']);
  }
  private change = {
    task: (data: SimpleChange) => {
      if (data && !data.firstChange) {
      }
    },
    shop: (data: SimpleChange) => {
      if (data && !data.firstChange) {
        if (this.task && this.shop) {
          this.map.location = this.shop.Location;
          this.load(this.task.Id, this.shop.Id);
        }
      }
    },
  };

  ngOnInit(): void {
    if (this.task && this.shop) {
      this.load(this.task.Id, this.shop.Id);
    }
  }
  private load(taskId: string, shopId: string) {
    this.business.load(shopId, taskId).then((x) => {
      this.sign.datas = x;
      if (this.sign.datas.length > 0) {
        let first = this.sign.datas[0];
        this.picture.src = first.ImageUrl ?? '';
        this.picture.polygon = first.Polygon ?? [];
        this.picture.page.data = Page.create(1, 1, this.sign.datas.length);

        this.map.points = first.Location ? [first.Location] : [];
      }
    });
  }
}
