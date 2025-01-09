import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  Output,
  SimpleChanges,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AnalysisTask } from '../../../../common/data-core/models/arm/analysis/analysis-task.model';
import { ShopSign } from '../../../../common/data-core/models/arm/analysis/shop-sign.model';
import { Shop } from '../../../../common/data-core/models/arm/analysis/shop.model';
import { Page } from '../../../../common/data-core/models/page-list.model';
import { Language } from '../../../../common/tools/language';
import { PictureComponent } from '../../share/picture/picture.component';
import { SystemTaskResultInfoBusiness } from './system-task-result-info.business';
import { SystemTaskResultInfoConverter } from './system-task-result-info.converter';
import { TaskResultItemModel } from './system-task-result-info.model';

@Component({
  selector: 'ias-system-task-result-info',
  imports: [CommonModule, FormsModule, PictureComponent],
  templateUrl: './system-task-result-info.component.html',
  styleUrl: './system-task-result-info.component.less',
  providers: [SystemTaskResultInfoConverter, SystemTaskResultInfoBusiness],
})
export class SystemTaskResultInfoComponent {
  @Input() data?: AnalysisTask;
  @Input() sign?: ShopSign;
  @Input() page?: Page;
  @Output() get = new EventEmitter<number>();
  @Output() error = new EventEmitter<Error>();
  @Output() picture = new EventEmitter<ShopSign>();

  constructor(private business: SystemTaskResultInfoBusiness) {}

  model?: TaskResultItemModel;
  shop?: Shop;
  Language = Language;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['sign'] && this.sign) {
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
  }

  onnext() {
    if (this.page && this.page.PageIndex < this.page.PageCount) {
      this.get.emit(++this.page.PageIndex);
    }
  }
  onprev() {
    if (this.page && this.page.PageIndex > 1) {
      this.get.emit(--this.page.PageIndex);
    }
  }

  onpicture() {
    if (this.sign) {
      this.picture.emit(this.sign);
    }
  }
}
