import { CommonModule } from '@angular/common';
import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AnalysisTask } from '../../../../common/data-core/models/arm/analysis/analysis-task.model';
import { ShopSign } from '../../../../common/data-core/models/arm/analysis/shop-sign.model';
import { Shop } from '../../../../common/data-core/models/arm/analysis/shop.model';
import { Page } from '../../../../common/data-core/models/page-list.model';
import { Language } from '../../../../common/tools/language';
import { SystemTaskResultInfoImageController } from './controller/system-task-result-info-image.controller';
import { SystemTaskResultInfoController } from './controller/system-task-result-info.controller';
import { SystemTaskResultInfoBusiness } from './system-task-result-info.business';
import { SystemTaskResultInfoConverter } from './system-task-result-info.converter';
import { TaskResultItemModel } from './system-task-result-info.model';

@Component({
  selector: 'ias-system-task-result-info',
  imports: [CommonModule, FormsModule],
  templateUrl: './system-task-result-info.component.html',
  styleUrl: './system-task-result-info.component.less',
  providers: [
    SystemTaskResultInfoConverter,
    SystemTaskResultInfoBusiness,
    SystemTaskResultInfoImageController,
    SystemTaskResultInfoController,
  ],
})
export class SystemTaskResultInfoComponent {
  @Input() data?: AnalysisTask;
  @Input() sign?: ShopSign;
  @Input() page?: Page;
  @Output() get = new EventEmitter<number>();

  constructor(
    private business: SystemTaskResultInfoBusiness,
    private controller: SystemTaskResultInfoController
  ) {}

  model?: TaskResultItemModel;

  shop?: Shop;

  @ViewChild('image') image?: ElementRef<HTMLDivElement>;
  @ViewChild('canvas') canvas?: ElementRef<HTMLCanvasElement>;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['sign'] && this.sign) {
      this.model = this.business.load(this.sign);
      if (this.sign.ShopId) {
        this.business.shop(this.sign.ShopId).then((x) => {
          this.shop = x;
        });
      }
      this.draw(this.model);
    }
  }

  ngAfterViewInit(): void {
    if (this.image && this.canvas) {
      this.controller.image.init(
        this.image.nativeElement,
        this.canvas.nativeElement
      );
    }
  }

  private draw(sign: TaskResultItemModel) {
    this.controller.image.load(sign.Image, sign.Polygon);
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

  Language = Language;
}
