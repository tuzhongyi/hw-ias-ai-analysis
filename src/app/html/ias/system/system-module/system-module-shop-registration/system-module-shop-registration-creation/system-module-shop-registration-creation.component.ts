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
import { GisPoint } from '../../../../../../common/data-core/models/arm/gis-point.model';
import { TextSpaceBetweenDirective } from '../../../../../../common/directives/text-space-between/text-space-between.directive';
import { ContentHeaderComponent } from '../../../../share/header/content-header/content-header.component';
import { PictureComponent } from '../../../../share/picture/picture.component';

import { ShopRegistration } from '../../../../../../common/data-core/models/arm/analysis/shop-registration.model';
import { SystemModuleShopDetailsMapComponent } from '../../system-module-shop/system-module-shop-details-map/system-module-shop-details-map.component';
import { SystemModuleShopRegistrationCreationSourceController } from './controller/system-module-shop-registration-creation-source.controller';
import { SystemModuleShopRegistrationCreationBusiness } from './system-module-shop-registration-creation.business';

@Component({
  selector: 'ias-system-module-shop-registration-creation',
  imports: [
    CommonModule,
    FormsModule,
    ContentHeaderComponent,
    TextSpaceBetweenDirective,
    UploadControlComponent,
    PictureComponent,
    HowellSelectComponent,
    SystemModuleShopDetailsMapComponent,
  ],
  templateUrl: './system-module-shop-registration-creation.component.html',
  styleUrl: './system-module-shop-registration-creation.component.less',
  providers: [
    SystemModuleShopRegistrationCreationSourceController,
    SystemModuleShopRegistrationCreationBusiness,
  ],
})
export class SystemModuleShopRegistrationCreationComponent implements OnInit {
  @Input() data?: ShopRegistration;
  @Output() ok = new EventEmitter<ShopRegistration>();
  @Output() close = new EventEmitter<void>();
  @Input() title = '注册商铺详细信息';
  @Input() input = false;
  @Output() create = new EventEmitter<ShopRegistration>();

  constructor(
    public source: SystemModuleShopRegistrationCreationSourceController,
    private business: SystemModuleShopRegistrationCreationBusiness,
    private toastr: ToastrService
  ) {}

  shop = this.init();

  ngOnInit(): void {
    if (this.data) {
      let plain = instanceToPlain(this.data);
      this.shop = plainToInstance(ShopRegistration, plain);
    } else {
      this.business
        .one()
        .then((x) => {
          this.shop.Location = x.Location;
        })
        .catch((x) => {
          this.shop.Location = new GisPoint();
          this.shop.Location.Longitude = 121.498586;
          this.shop.Location.Latitude = 31.239637;
          this.shop.Location.Altitude = 0;
        });
    }
  }

  private init() {
    let shop = new ShopRegistration();
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
    if (!this.shop.Location.Longitude) {
      this.toastr.warning('商铺坐标经度不能为空');
      return false;
    }
    if (!this.shop.Location.Latitude) {
      this.toastr.warning('商铺坐标纬度不能为空');
      return false;
    }

    return true;
  }

  location = {
    change: new EventEmitter<GisPoint>(),
    on: () => {
      this.location.change.emit(this.shop.Location);
    },
  };

  onposition(data: GisPoint) {
    this.shop.Location = data;
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

  private toupdate() {
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
  private tocreate() {
    this.business
      .create(this.shop)
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

  oninput() {
    this.create.emit(this.shop);
  }
}
