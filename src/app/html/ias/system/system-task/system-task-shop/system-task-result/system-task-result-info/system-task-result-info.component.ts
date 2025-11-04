import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  Output,
  SimpleChange,
  SimpleChanges,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ResultLabelType } from '../../../../../../../common/data-core/enums/analysis/result-label-type.enum';
import { ShopSign } from '../../../../../../../common/data-core/models/arm/analysis/shop-sign.model';
import { Shop } from '../../../../../../../common/data-core/models/arm/analysis/shop.model';
import { AnalysisTask } from '../../../../../../../common/data-core/models/arm/analysis/task/analysis-task.model';
import { Page } from '../../../../../../../common/data-core/models/page-list.model';
import { TextSpaceBetweenDirective } from '../../../../../../../common/directives/text-space-between/text-space-between.directive';
import { Language } from '../../../../../../../common/tools/language-tool/language';
import { ShopSignViewModel } from '../../../../../../../common/view-models/shop-sign/shop-sign.view-model';
import { ListPageComponent } from '../../../../../share/list-page/list-page.component';
import { PicturePolygonComponent } from '../../../../../share/picture/picture-polygon/picture-polygon.component';
import { SystemTaskResultInfoSourceController } from './controller/system-task-result-info-source.controller';
import { SystemTaskResultInfoBusiness } from './system-task-result-info.business';
import { SystemTaskResultInfoConverter } from './system-task-result-info.converter';

@Component({
  selector: 'ias-system-task-result-info',
  imports: [
    CommonModule,
    FormsModule,
    PicturePolygonComponent,
    TextSpaceBetweenDirective,
    ListPageComponent,
  ],
  templateUrl: './system-task-result-info.component.html',
  styleUrl: './system-task-result-info.component.less',
  providers: [
    SystemTaskResultInfoSourceController,
    SystemTaskResultInfoConverter,
    SystemTaskResultInfoBusiness,
  ],
})
export class SystemTaskResultInfoComponent {
  @Input() data?: AnalysisTask;
  @Input() sign?: ShopSign;
  @Input() page?: Page;
  @Output() get = new EventEmitter<number>();
  @Output() error = new EventEmitter<Error>();
  @Output() picture = new EventEmitter<ShopSign>();
  @Output() labeling = new EventEmitter<void>();

  constructor(
    private business: SystemTaskResultInfoBusiness,
    private toastr: ToastrService,
    public source: SystemTaskResultInfoSourceController
  ) {}

  model?: ShopSignViewModel;
  shop?: Shop;
  Language = Language;

  ngOnChanges(changes: SimpleChanges): void {
    this.change.sign(changes['sign']);
    this.change.page(changes['page']);
  }

  change = {
    sign: (data: SimpleChange) => {
      if (data && this.sign) {
        this.model = this.business.load(this.sign);
        if (this.sign.ShopId) {
          this.business
            .shop(this.sign.ShopId)
            .then((x) => {
              this.shop = x;
            })
            .catch((e) => this.error.emit(e));
        }
      }
    },
    page: (data: SimpleChange) => {
      if (
        data &&
        !this.change.equals.page(data.previousValue, data.currentValue) &&
        this.page
      ) {
        this.get.emit(this.page.PageIndex);
      }
    },
    equals: {
      page: (a?: Page, b?: Page) => {
        return a && b && a.PageIndex == b.PageIndex;
      },
    },
  };

  onpage(index: number) {
    this.get.emit(index);
  }

  onpicture() {
    if (this.sign) {
      this.picture.emit(this.sign);
    }
  }

  onlabeling(type: ResultLabelType) {
    if (this.sign) {
      this.business
        .labeling(this.sign.Id, type)
        .then((x) => {
          this.toastr.success('标注成功');
          if (this.sign) {
            this.sign.ResultLabelType = x.ResultLabelType;
          }
          this.labeling.emit();
        })
        .catch((x) => {
          this.toastr.error('标注失败');
        });
    }
  }
}
