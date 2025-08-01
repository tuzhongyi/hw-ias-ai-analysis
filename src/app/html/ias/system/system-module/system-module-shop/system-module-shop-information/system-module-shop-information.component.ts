import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { instanceToPlain, plainToInstance } from 'class-transformer';
import { ToastrService } from 'ngx-toastr';
import { HowellSelectComponent } from '../../../../../../common/components/hw-select/select-control.component';
import { UploadControlComponent } from '../../../../../../common/components/upload-control/upload-control.component';
import { UploadControlFile } from '../../../../../../common/components/upload-control/upload-control.model';
import { ShopObjectState } from '../../../../../../common/data-core/enums/analysis/shop-object-state.enum';
import { SignType } from '../../../../../../common/data-core/enums/analysis/sign-type.enum';
import { GisType } from '../../../../../../common/data-core/enums/gis-type.enum';
import { Shop } from '../../../../../../common/data-core/models/arm/analysis/shop.model';
import {
  GisPoint,
  GisPoints,
} from '../../../../../../common/data-core/models/arm/gis-point.model';
import { TextSpaceBetweenDirective } from '../../../../../../common/directives/text-space-between/text-space-between.directive';
import { PictureComponent } from '../../../../share/picture/component/picture.component';
import { SystemModuleShopDetailsMapComponent } from '../system-module-shop-details-map/system-module-shop-details-map.component';
import { SystemModuleShopInformationSourceController } from './controller/system-module-shop-information-source.controller';
import { SystemModuleShopInformationBusiness } from './system-module-shop-information.business';

@Component({
  selector: 'ias-system-module-shop-information',
  imports: [
    CommonModule,
    FormsModule,
    TextSpaceBetweenDirective,
    UploadControlComponent,
    PictureComponent,
    HowellSelectComponent,
    SystemModuleShopDetailsMapComponent,
  ],
  templateUrl: './system-module-shop-information.component.html',
  styleUrl: './system-module-shop-information.component.less',
  providers: [
    SystemModuleShopInformationSourceController,
    SystemModuleShopInformationBusiness,
  ],
})
export class SystemModuleShopInformationComponent implements OnInit {
  @Input() data?: Shop;
  @Output() ok = new EventEmitter<Shop>();
  @Output() close = new EventEmitter<void>();

  constructor(
    public source: SystemModuleShopInformationSourceController,
    private business: SystemModuleShopInformationBusiness,
    private toastr: ToastrService
  ) {}

  shop = this.init();
  sync = true;

  ngOnInit(): void {
    if (this.data) {
      let plain = instanceToPlain(this.data);
      this.shop = plainToInstance(Shop, plain);
    } else {
      this.business.one().then((x) => {
        this.shop.Location = x.Location;
      });
    }
  }

  private init() {
    let shop = new Shop();
    shop.Locked = true;
    shop.ShopType = SignType.ShopSign;
    shop.ObjectState = ShopObjectState.Created;
    return shop;
  }

  get check() {
    if (!this.shop.Name) {
      this.toastr.warning('请输入商铺名称');
      return false;
    }
    if (!this.shop.Location) {
      this.toastr.warning('请选择商铺位置');
      return false;
    }
    if (!this.shop.Location.GCJ02.Longitude) {
      this.toastr.warning('商铺坐标经度不能为空');
      return false;
    }
    if (!this.shop.Location.GCJ02.Latitude) {
      this.toastr.warning('商铺坐标纬度不能为空');
      return false;
    }

    return true;
  }

  location = {
    change: new EventEmitter<GisPoint>(),
    on: () => {
      this.location.change.emit(this.shop.Location?.GCJ02);
    },
  };

  onposition(data: GisPoint) {
    if (!this.shop.Location) {
      this.shop.Location = new GisPoints();
    }
    this.shop.Location.set(data, GisType.GCJ02);
  }

  onimage(data: UploadControlFile) {
    this.business.picture.upload(data.data as ArrayBuffer).then((x) => {
      this.shop.ImageUrl = x;
    });
  }

  onok() {
    if (this.check) {
      if (this.data) {
        this.toupdate();
      } else {
        this.tocreate();
      }
    }
  }

  toupdate() {
    this.business
      .update(this.shop)
      .then((x) => {
        this.toastr.success('更新成功');
        this.ok.emit(this.shop);
      })
      .catch((x) => {
        this.toastr.error('操作失败');
      });
  }
  tocreate() {
    this.business
      .create(this.shop, this.sync)
      .then((x) => {
        this.toastr.success('创建成功');
        this.ok.emit(this.shop);
      })
      .catch((x) => {
        this.toastr.error('操作失败');
      });
  }

  tocancel() {
    this.close.emit();
  }
}
