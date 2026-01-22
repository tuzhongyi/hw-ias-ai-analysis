import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { GisType } from '../../../../../../../common/data-core/enums/gis-type.enum';
import { RoadObjectType } from '../../../../../../../common/data-core/enums/road/road-object/road-object-type.enum';
import { ObjectImageSamplingConfig } from '../../../../../../../common/data-core/models/arm/geographic/object-image-sampling-config.model';
import { RoadObject } from '../../../../../../../common/data-core/models/arm/geographic/road-object.model';
import {
  GisPoint,
  GisPoints,
} from '../../../../../../../common/data-core/models/arm/gis-point.model';
import { GeoTool } from '../../../../../../../common/tools/geo-tool/geo.tool';
import { SystemModuleRoadObjectDetailsConfigComponent } from '../system-module-road-object-details-config/system-module-road-object-details-config.component';
import { SystemModuleRoadObjectDetailsImageComponent } from '../system-module-road-object-details-image/system-module-road-object-details-image.component';
import { SystemModuleRoadObjectDetailsInfoComponent } from '../system-module-road-object-details-info/system-module-road-object-details-info.component';
import { SystemModuleRoadObjectDetailsMapComponent } from '../system-module-road-object-details-map/system-module-road-object-details-map.component';
import { SystemModuleRoadObjectDetailsManagerBusiness } from './system-module-road-object-details-manager.business';

@Component({
  selector: 'ias-system-module-road-object-details-manager',
  imports: [
    CommonModule,
    FormsModule,
    SystemModuleRoadObjectDetailsMapComponent,
    SystemModuleRoadObjectDetailsInfoComponent,
    SystemModuleRoadObjectDetailsConfigComponent,
    SystemModuleRoadObjectDetailsImageComponent,
  ],
  templateUrl: './system-module-road-object-details-manager.component.html',
  styleUrl: './system-module-road-object-details-manager.component.less',
  providers: [SystemModuleRoadObjectDetailsManagerBusiness],
})
export class SystemModuleRoadObjectDetailsManagerComponent implements OnInit {
  @Input() operable = true;
  @Input() data?: RoadObject;
  @Output() picture = new EventEmitter<RoadObject>();
  @Output() ok = new EventEmitter<RoadObject>();
  @Output() close = new EventEmitter<void>();

  constructor(
    private business: SystemModuleRoadObjectDetailsManagerBusiness,
    private toastr: ToastrService
  ) {}

  model = new RoadObject();

  private init() {
    let obj = new RoadObject();
    obj.ObjectType = 1;
    obj.ObjectState = 0;
    obj.DisappearTimes = 2;
    obj.ImageSampling = new ObjectImageSamplingConfig();
    obj.ImageSampling.Enabled = false;
    obj.ImageSampling.Distance = 5;
    obj.ImageSampling.SamplePlan = 1;
    obj.ImageSampling.InspectionInterval = 0;
    obj.ImageSampling.Course = 0;
    obj.ImageSampling.InspectionTime = new Date();
    obj.ImageSampling.LatestInspectionTime = new Date();

    obj.Location = new GisPoints();
    return obj;
  }

  ngOnInit(): void {
    if (this.data) {
      this.model = Object.assign(this.init(), this.data);
      this.map.load(this.model);
    } else {
      this.model = this.init();
    }
  }

  private get check() {
    if (!this.model.Name) {
      this.toastr.warning('请填写物件名称');
      return false;
    }
    if (!this.model.ObjectType) {
      this.toastr.warning('请选择物件类型');
      return false;
    }
    if (!this.model.Address) {
      this.toastr.warning('请填写物件地址');
      return false;
    }
    if (!this.model.ImageUrl && !this.image.data) {
      this.toastr.warning('请上传物件图片');
      return false;
    }
    if (!this.map.wgs84) {
      this.toastr.warning('请设置物件位置');
      return false;
    }
    return true;
  }

  on = {
    change: (data: RoadObject) => {
      this.map.type = data.ObjectType;
    },
    create: async () => {
      if (this.check) {
        if (this.image.data) {
          this.model.ImageUrl = await this.business.picture.upload(
            this.image.data
          );
        }
        if (this.map.wgs84) {
          let point = GisPoint.create(
            this.map.wgs84.Longitude,
            this.map.wgs84.Latitude,
            GisType.WGS84
          );
          this.model.Location.set(point, GisType.WGS84);
        }

        this.business
          .create(this.model)
          .then((x) => {
            this.data = x;
            this.toastr.success('物件创建成功');
            this.ok.emit(this.data);
            this.close.emit();
          })
          .catch((e) => {
            console.error(e);
            this.toastr.error('物件创建失败');
          });
      }
    },
    update: async () => {
      if (this.check) {
        if (this.image.data) {
          this.model.ImageUrl = await this.business.picture.upload(
            this.image.data
          );
        }
        if (this.map.wgs84) {
          let point = GisPoint.create(
            this.map.wgs84.Longitude,
            this.map.wgs84.Latitude,
            GisType.WGS84
          );
          this.model.Location.set(point, GisType.WGS84);
        }

        this.business
          .update(this.model)
          .then((x) => {
            this.data = x;
            this.toastr.success('物件修改成功');
            this.ok.emit(this.data);
            this.close.emit();
          })
          .catch((e) => {
            console.error(e);
            this.toastr.error('物件修改失败');
          });
      }
    },
    cancel: () => {
      this.close.emit();
    },
  };

  save() {}

  map = {
    wgs84: undefined as GisPoint | undefined,
    gcj02: [0, 0] as [number, number],
    type: RoadObjectType.FireHydrant,
    load: (data: RoadObject) => {
      if (data.Location) {
        this.map.wgs84 = data.Location.WGS84;
        this.map.gcj02 = [
          data.Location.GCJ02.Longitude,
          data.Location.GCJ02.Latitude,
        ];
      }

      this.map.type = data.ObjectType;
    },
    on: {
      wgs84: (data: GisPoint) => {
        this.map.wgs84 = Object.assign(new GisPoint(), data);
        this.model.Location = new GisPoints();
        this.model.Location.set(data, GisType.WGS84);
      },
      gcj02: (data: [number, number]) => {
        let wgs84 = GeoTool.point.convert.gcj02.to.wgs84(data[0], data[1]);
        let point = new GisPoint();
        point.GisType = GisType.WGS84;
        point.Altitude = 0;
        point.Longitude = wgs84[0];
        point.Latitude = wgs84[1];
        this.map.wgs84 = point;
        this.map.on.wgs84(point);
      },
    },
  };

  image = {
    data: undefined as ArrayBuffer | undefined,
    upload: (data: ArrayBuffer) => {
      this.image.data = data;
    },
    open: () => {
      this.picture.emit(this.model);
    },
  };
}
