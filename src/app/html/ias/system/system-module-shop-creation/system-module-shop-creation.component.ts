import { CommonModule } from '@angular/common';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Shop } from '../../../../common/data-core/models/arm/analysis/shop.model';
import { GisPoint } from '../../../../common/data-core/models/arm/gis-point.model';
import { TextSpaceBetweenDirective } from '../../../../common/directives/text-space-between/text-space-between.directive';
import { ContentHeaderComponent } from '../../share/header/content-header/content-header.component';
import { PictureComponent } from '../../share/picture/picture.component';
import { SystemModuleShopDetailsMapComponent } from '../system-module-shop-details-map/system-module-shop-details-map.component';
import { SystemModuleShopCreationSourceController } from './controller/system-module-shop-creation-source.controller';
import { SystemModuleShopCreationBusiness } from './system-module-shop-creation.business';

@Component({
  selector: 'ias-system-module-shop-creation',
  imports: [
    CommonModule,
    FormsModule,
    ContentHeaderComponent,
    TextSpaceBetweenDirective,
    PictureComponent,
    SystemModuleShopDetailsMapComponent,
  ],
  templateUrl: './system-module-shop-creation.component.html',
  styleUrl: './system-module-shop-creation.component.less',
  providers: [
    SystemModuleShopCreationSourceController,
    SystemModuleShopCreationBusiness,
  ],
})
export class SystemModuleShopCreationComponent implements OnInit {
  @Output() ok = new EventEmitter<Shop>();
  @Output() cancel = new EventEmitter<void>();

  constructor(
    public source: SystemModuleShopCreationSourceController,
    private business: SystemModuleShopCreationBusiness
  ) {}

  data = new Shop();

  ngOnInit(): void {
    this.init();
  }

  private init() {
    this.business.one().then((x) => {
      this.data.Location = x?.Location;
    });
  }

  onposition(data: GisPoint) {
    this.data.Location = data;
  }
}
