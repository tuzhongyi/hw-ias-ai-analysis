import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnChanges,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ShopSign } from '../../../../common/data-core/models/arm/analysis/shop-sign.model';
import { Language } from '../../../../common/tools/language';
import { ShopModel } from '../system-module-shop-table/system-module-shop-table.model';
import { SystemModuleShopDetailsInfoImageController } from './controller/system-module-shop-details-info-image.controller';
import { SystemModuleShopDetailsInfoController } from './controller/system-module-shop-details-info.controller';
import { SystemModuleShopDetailsInfoBusiness } from './system-module-shop-details-info.business';
import { SystemModuleShopDetailsInfoConverter } from './system-module-shop-details-info.converter';
import { ShopSignModel } from './system-module-shop-details-info.model';

@Component({
  selector: 'ias-system-module-shop-details-info',
  imports: [CommonModule, FormsModule],
  templateUrl: './system-module-shop-details-info.component.html',
  styleUrl: './system-module-shop-details-info.component.less',
  providers: [
    SystemModuleShopDetailsInfoConverter,
    SystemModuleShopDetailsInfoBusiness,
    SystemModuleShopDetailsInfoController,
    SystemModuleShopDetailsInfoImageController,
  ],
})
export class SystemModuleShopDetailsInfoComponent
  implements OnChanges, AfterViewInit
{
  @Input() data?: ShopModel;
  @Input() sign?: ShopSign;

  constructor(
    private business: SystemModuleShopDetailsInfoBusiness,
    private controller: SystemModuleShopDetailsInfoController
  ) {}

  model?: ShopSignModel;

  @ViewChild('image') image?: ElementRef<HTMLDivElement>;
  @ViewChild('canvas') canvas?: ElementRef<HTMLCanvasElement>;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['sign'] && this.sign) {
      this.model = this.business.load(this.sign);
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

  private draw(sign: ShopSignModel) {
    this.controller.image.load(sign.Image, sign.Polygon);
  }

  Language = Language;
}
