import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { instanceToPlain, plainToInstance } from 'class-transformer';
import { ToastrService } from 'ngx-toastr';
import { HowellSelectComponent } from '../../../../../../common/components/hw-select/select-control.component';
import { UploadControlComponent } from '../../../../../../common/components/upload-control/upload-control.component';
import { UploadControlFile } from '../../../../../../common/components/upload-control/upload-control.model';
import { ShopObjectState } from '../../../../../../common/data-core/enums/analysis/shop-object-state.enum';
import { GisPoint } from '../../../../../../common/data-core/models/arm/gis-point.model';
import { TextSpaceBetweenDirective } from '../../../../../../common/directives/text-space-between/text-space-between.directive';
import { ContentHeaderComponent } from '../../../../share/header/content-header/content-header.component';
import { PictureComponent } from '../../../../share/picture/component/picture.component';

import { ShopRegistration } from '../../../../../../common/data-core/models/arm/analysis/shop-registration.model';
import { WindowComponent } from '../../../../share/window/window.component';
import { SystemModuleShopDetailsMapComponent } from '../../system-module-shop/system-module-shop-details-map/system-module-shop-details-map.component';
import { SystemModuleShopRegistrationInformationSubnameInputComponent } from '../system-module-shop-registration-information-subname-input/system-module-shop-registration-information-subname-input.component';
import { SystemModuleShopRegistrationInformationSubnamesComponent } from '../system-module-shop-registration-information-subnames/system-module-shop-registration-information-subnames.component';
import { SystemModuleShopRegistrationInformationSourceController } from './controller/system-module-shop-registration-information-source.controller';
import { SystemModuleShopRegistrationInformationBusiness } from './system-module-shop-registration-information.business';
import { SystemModuleShopRegistrationInformationWindow } from './system-module-shop-registration-information.window';

@Component({
  selector: 'ias-system-module-shop-registration-information',
  imports: [
    CommonModule,
    FormsModule,
    ContentHeaderComponent,
    TextSpaceBetweenDirective,
    UploadControlComponent,
    PictureComponent,
    HowellSelectComponent,
    SystemModuleShopDetailsMapComponent,
    SystemModuleShopRegistrationInformationSubnamesComponent,
    SystemModuleShopRegistrationInformationSubnameInputComponent,
    WindowComponent,
  ],
  templateUrl: './system-module-shop-registration-information.component.html',
  styleUrl: './system-module-shop-registration-information.component.less',
  providers: [
    SystemModuleShopRegistrationInformationSourceController,
    SystemModuleShopRegistrationInformationBusiness,
  ],
})
export class SystemModuleShopRegistrationInformationComponent
  implements OnInit
{
  @Input() data?: ShopRegistration;
  @Output() ok = new EventEmitter<ShopRegistration>();
  @Output() close = new EventEmitter<void>();
  @Input() title = '注册商铺详细信息';
  @Input() input = false;
  @Output() create = new EventEmitter<ShopRegistration>();

  constructor(
    public source: SystemModuleShopRegistrationInformationSourceController,
    private business: SystemModuleShopRegistrationInformationBusiness,
    private toastr: ToastrService
  ) {}

  shop = this.init();
  window = new SystemModuleShopRegistrationInformationWindow();

  ngOnInit(): void {
    if (this.data) {
      let plain = instanceToPlain(this.data);
      this.shop = plainToInstance(ShopRegistration, plain);

      if (this.shop.ImageUrl) {
        this.image.src = this.business.picture.get(this.shop.ImageUrl);
        if (this.input) {
          this.business.picture.download(this.shop.ImageUrl).then((x) => {
            this.image.data = x as ArrayBuffer;
          });
        }
      }
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
    if (this.shop.ShopType === undefined) {
      this.toastr.warning('请选择商铺类型');
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

    if (!this.shop.ImageUrl) {
      this.toastr.warning('请上传商铺图片');
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
  image = {
    src: '',
    data: undefined as ArrayBuffer | undefined,
    upload: (data: UploadControlFile) => {
      this.image.data = data.data as ArrayBuffer;
      this.image.src = this.business.picture.convert(data.data as ArrayBuffer);
      // this.business.picture.upload(data.data as ArrayBuffer).then((x) => {
      //   this.shop.ImageUrl = x;
      // });
    },
  };
  subname = {
    input: {
      open: () => {
        this.window.subname.show = true;
      },
      close: () => {
        this.window.subname.show = false;
      },
      add: (value: string) => {
        if (!this.shop.Subnames) {
          this.shop.Subnames = [];
        }
        this.shop.Subnames = [...this.shop.Subnames, value];
        this.window.subname.show = false;
      },
    },
  };

  onposition(data: GisPoint) {
    this.shop.Location = data;
  }

  onok() {
    if (this.data) {
      this.toupdate();
    } else {
      this.tocreate();
    }
  }

  private async toupdate() {
    if (this.image.data) {
      try {
        this.shop.ImageUrl = await this.business.picture.upload(
          this.image.data
        );
      } catch (x) {
        this.toastr.error('图片上传失败');
      }
    }
    if (this.check) {
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
  }
  private async tocreate() {
    if (this.image.data) {
      try {
        this.shop.ImageUrl = await this.business.picture.upload(
          this.image.data
        );
      } catch (x) {
        this.toastr.error('图片上传失败');
        return;
      }
    }
    if (this.check) {
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
  }

  tocancel() {
    this.close.emit();
  }

  oninput() {
    if (this.image.data) {
      this.business.picture
        .upload(this.image.data)
        .then((x) => {
          this.shop.ImageUrl = x;
          if (this.check) {
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
        })
        .catch((x) => {
          this.toastr.error('图片上传失败');
        });
    }

    // this.create.emit(this.shop);
  }
}
