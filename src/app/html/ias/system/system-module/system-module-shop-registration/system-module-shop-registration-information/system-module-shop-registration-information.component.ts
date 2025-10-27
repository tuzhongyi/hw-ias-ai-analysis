import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { HowellSelectComponent } from '../../../../../../common/components/hw-select/select-control.component';
import { UploadControlComponent } from '../../../../../../common/components/upload-control/upload-control.component';
import { UploadControlFile } from '../../../../../../common/components/upload-control/upload-control.model';
import { ShopObjectState } from '../../../../../../common/data-core/enums/analysis/shop-object-state.enum';
import {
  GisPoint,
  GisPoints,
} from '../../../../../../common/data-core/models/arm/gis-point.model';
import { TextSpaceBetweenDirective } from '../../../../../../common/directives/text-space-between/text-space-between.directive';
import { PictureComponent } from '../../../../share/picture/component/picture.component';

import '../../../../../../../assets/js/map/CoordinateTransform.js';
import { ContainerZoomComponent } from '../../../../../../common/components/container-zoom/container-zoom.component';
import { GisType } from '../../../../../../common/data-core/enums/gis-type.enum';
import { Road } from '../../../../../../common/data-core/models/arm/geographic/road.model';
import { ShopRegistration } from '../../../../../../common/data-core/models/arm/geographic/shop-registration.model';
import { WindowComponent } from '../../../../share/window/window.component';
import { SystemModuleShopDetailsMapComponent } from '../../system-module-shop/system-module-shop-details-map/system-module-shop-details-map.component';
import { SystemModuleShopRegistrationInformationBusinessInfoComponent } from '../system-module-shop-registration-information-business-info/system-module-shop-registration-information-business-info.component';
import { SystemModuleShopRegistrationInformationSubnameInputComponent } from '../system-module-shop-registration-information-subname-input/system-module-shop-registration-information-subname-input.component';
import { SystemModuleShopRegistrationInformationSubnamesComponent } from '../system-module-shop-registration-information-subnames/system-module-shop-registration-information-subnames.component';
import { SystemModuleShopRegistrationInformationBusiness } from './business/system-module-shop-registration-information.business';
import { SystemModuleShopRegistrationInformationSourceController } from './controller/system-module-shop-registration-information-source.controller';
import { SystemModuleShopRegistrationInformationWindow } from './system-module-shop-registration-information.window';

@Component({
  selector: 'ias-system-module-shop-registration-information',
  imports: [
    CommonModule,
    FormsModule,
    TextSpaceBetweenDirective,
    UploadControlComponent,
    PictureComponent,
    HowellSelectComponent,
    SystemModuleShopDetailsMapComponent,
    SystemModuleShopRegistrationInformationSubnamesComponent,
    SystemModuleShopRegistrationInformationSubnameInputComponent,
    SystemModuleShopRegistrationInformationBusinessInfoComponent,
    WindowComponent,
    ContainerZoomComponent,
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
  @Input() input = false;
  @Output() create = new EventEmitter<ShopRegistration>();
  @Input() around: ShopRegistration[] = [];
  @Output() picture = new EventEmitter<ShopRegistration>();

  constructor(
    public source: SystemModuleShopRegistrationInformationSourceController,
    private business: SystemModuleShopRegistrationInformationBusiness,
    private toastr: ToastrService
  ) {}
  GisType = GisType;
  private init = {
    shop: () => {
      let shop = new ShopRegistration();
      shop.ObjectState = ShopObjectState.Created;
      return shop;
    },
    road: () => {
      this.business.road.all().then((x) => {
        this.road.datas = x;
      });
    },
  };
  shop = this.init.shop();

  window = new SystemModuleShopRegistrationInformationWindow();

  ngOnInit(): void {
    this.init.road();
    if (this.data) {
      let data = this.data as any;
      let keys = Object.keys(this.shop);
      for (let i = 0; i < keys.length; i++) {
        const key = keys[i];
        (this.shop as any)[key] = data[key];
      }
      if (this.shop.Location) {
        this.location.load(this.shop.Location);
      }

      if (this.shop.ImageUrl) {
        this.image.src = this.business.picture.get(this.shop.ImageUrl);
        if (this.input) {
          this.business.picture.download(this.shop.ImageUrl).then((x) => {
            this.image.data = x as ArrayBuffer;
          });
        }
      }
    } else {
      this.business.one().then((x) => {
        this.shop.Location = x.Location;
      });
    }
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

    if (!this.shop.ImageUrl) {
      this.toastr.warning('请上传商铺图片');
      return false;
    }

    if (!this.shop.RoadId) {
      this.toastr.warning('请选择一条道路');
      return false;
    }

    return true;
  }

  location = {
    change: new EventEmitter<GisPoint>(),
    type: {
      value: GisType.WGS84,
      change: () => {
        if (this.shop.Location) {
          this.location.load(this.shop.Location);
        }
      },
    },
    value: '',

    load: (data: GisPoints) => {
      switch (this.location.type.value) {
        case GisType.WGS84:
          this.location.value = `${data.WGS84.Longitude},${data.WGS84.Latitude}`;
          break;
        case GisType.GCJ02:
          this.location.value = `${data.GCJ02.Longitude},${data.GCJ02.Latitude}`;
          break;
        case GisType.BD09:
          this.location.value = `${data.BD09.Longitude},${data.BD09.Latitude}`;
          break;
        default:
          break;
      }
    },
    set: () => {
      let position = this.location.value
        .split(',')
        .map((x) => parseFloat(x)) as [number, number];
      if (position.length === 2) {
        if (!this.shop.Location) {
          this.shop.Location = new GisPoints();
        }
        let point = GisPoint.create(
          position[0],
          position[1],
          this.location.type.value
        );
        this.shop.Location.set(point, this.location.type.value);
        this.location.change.emit(this.shop.Location.GCJ02);
      } else {
        this.toastr.warning('请输入正确的坐标格式');
      }
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
    full: () => {
      if (this.shop.ImageUrl) {
        this.picture.emit(this.shop);
      }
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
  road = {
    datas: [] as Road[],
  };
  info = {
    business: {
      open: () => {
        this.window.business.show = true;
      },
      ok: (data: ShopRegistration) => {
        this.data = data;
        this.window.business.show = false;
      },
    },
  };

  onposition(data: GisPoint) {
    if (!this.shop.Location) {
      this.shop.Location = new GisPoints();
    }
    this.shop.Location.set(data, GisType.GCJ02);
    this.location.load(this.shop.Location);
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
      let road = this.road.datas.find((x) => x.Id === this.shop.RoadId);
      if (!road) {
        this.toastr.warning('所选择道路不存在');
        return;
      }
      this.shop.RoadName = road.Name;
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
      let road = this.road.datas.find((x) => x.Id === this.shop.RoadId);
      if (!road) {
        this.toastr.warning('所选择道路不存在');
        return;
      }
      this.shop.RoadName = road.Name;
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
            let road = this.road.datas.find((x) => x.Id === this.shop.RoadId);
            if (!road) {
              this.toastr.warning('所选择道路不存在');
              return;
            }
            this.shop.RoadName = road.Name;
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
