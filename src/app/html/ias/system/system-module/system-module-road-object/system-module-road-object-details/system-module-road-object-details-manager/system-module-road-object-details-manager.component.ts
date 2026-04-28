import { CommonModule } from '@angular/common';
import {
  AfterViewChecked,
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { AngleControlComponent } from '../../../../../../../common/components/angle-control/angle-control.component';
import { SegmentWeekComponent } from '../../../../../../../common/components/segment/segment-week/segment-week.component';
import { GisType } from '../../../../../../../common/data-core/enums/gis-type.enum';
import { RoadObjectState } from '../../../../../../../common/data-core/enums/road/road-object/road-object-state.enum';
import { RoadObjectType } from '../../../../../../../common/data-core/enums/road/road-object/road-object-type.enum';
import { WeekTimeSegment } from '../../../../../../../common/data-core/models/arm/analysis/segment/week-time-segment.model';
import { ObjectImageSamplingConfig } from '../../../../../../../common/data-core/models/arm/geographic/object-image-sampling-config.model';
import { RoadObject } from '../../../../../../../common/data-core/models/arm/geographic/road-object.model';
import {
  GisPoint,
  GisPoints,
} from '../../../../../../../common/data-core/models/arm/gis-point.model';
import { GeoTool } from '../../../../../../../common/tools/geo-tool/geo.tool';
import { WindowComponent } from '../../../../../share/window/component/window.component';
import {
  PickupLineModel,
  PickupModel,
  PickupPointModel,
} from '../../system-module-road-object-video/system-module-road-object-video-manager/system-module-road-object-video-manager.model';
import { SystemModuleRoadObjectDetailsConfigComponent } from '../system-module-road-object-details-config/system-module-road-object-details-config.component';
import { SystemModuleRoadObjectDetailsImageComponent } from '../system-module-road-object-details-image/system-module-road-object-details-image.component';
import { SystemModuleRoadObjectDetailsInfoComponent } from '../system-module-road-object-details-info/system-module-road-object-details-info.component';
import { SystemModuleRoadObjectDetailsInfoSource } from '../system-module-road-object-details-info/system-module-road-object-details-info.source';
import { SystemModuleRoadObjectDetailsMapLineComponent } from '../system-module-road-object-details-map-line/system-module-road-object-details-map-line.component';
import { SystemModuleRoadObjectDetailsMapComponent } from '../system-module-road-object-details-map/system-module-road-object-details-map.component';
import { SystemModuleRoadObjectDetailsManagerBusiness } from './system-module-road-object-details-manager.business';
import { SystemModuleRoadObjectDetailsManagerWindow } from './system-module-road-object-details-manager.window';

@Component({
  selector: 'ias-system-module-road-object-details-manager',
  imports: [
    CommonModule,
    FormsModule,
    SystemModuleRoadObjectDetailsMapComponent,
    SystemModuleRoadObjectDetailsMapLineComponent,
    SystemModuleRoadObjectDetailsInfoComponent,
    SystemModuleRoadObjectDetailsConfigComponent,
    SystemModuleRoadObjectDetailsImageComponent,
    WindowComponent,
    AngleControlComponent,
    SegmentWeekComponent,
  ],
  templateUrl: './system-module-road-object-details-manager.component.html',
  styleUrl: './system-module-road-object-details-manager.component.less',
  providers: [
    SystemModuleRoadObjectDetailsManagerBusiness,
    SystemModuleRoadObjectDetailsInfoSource,
  ],
})
export class SystemModuleRoadObjectDetailsManagerComponent
  implements OnInit, AfterViewChecked, OnDestroy
{
  @Input() operable = true;
  @Input() data?: RoadObject;
  @Output() picture = new EventEmitter<RoadObject>();
  @Output() ok = new EventEmitter<RoadObject>();
  @Output() close = new EventEmitter<void>();
  @Input() pickup?: EventEmitter<PickupModel>;

  constructor(
    private business: SystemModuleRoadObjectDetailsManagerBusiness,
    private source: SystemModuleRoadObjectDetailsInfoSource,
    private toastr: ToastrService
  ) {}

  RoadObjectType = RoadObjectType;
  model = new RoadObject();
  window = new SystemModuleRoadObjectDetailsManagerWindow();
  In = {
    point: false,
    line: false,
  };
  linestepeditable = true;
  private subscription = new Subscription();

  private init() {
    let obj = new RoadObject();
    obj.ObjectType = 1;
    obj.ObjectState = 0;
    obj.DisappearTimes = 2;
    obj.ImageSampling = new ObjectImageSamplingConfig();
    obj.ImageSampling.Enabled = true;
    obj.ImageSampling.Distance = 5;
    obj.ImageSampling.SamplePlan = 3;
    obj.ImageSampling.InspectionInterval = 1;
    obj.ImageSampling.Course = 0;
    obj.ImageSampling.InspectionTime = new Date();
    obj.ImageSampling.LatestInspectionTime = new Date();

    this.source.divisions.then((x) => {
      if (x.length == 1) {
        obj.DivisionId = x[0].Id;
      }
    });

    obj.Location = new GisPoints();

    return obj;
  }
  private regist() {
    if (this.pickup) {
      let sub = this.pickup.subscribe((picked) => {
        this.model = this.init();
        this.model.ObjectType = picked.objecttype;
        this.model.Address = picked.address;
        this.model.ImageSampling.Course = picked.course;
        this.image.data = picked.capture.buffer;

        this.image.load.emit(picked.capture.src);

        if (picked.type == 'point') {
          let data = picked as PickupPointModel;
          this.model.Location = GisPoints.create(data.point, GisType.GCJ02);
        } else if (picked.type == 'line') {
          let data = picked as PickupLineModel;
          this.linestepeditable = data.auto;
          this.model.ImageSampling.SamplePlan = 2;
          this.model.IsGeoLine = true;
          this.map.line.editing = true;
          let first = data.line[0];
          this.map.point.gcj02 = first;
          this.model.Location = GisPoints.create(first, GisType.GCJ02);
          console.log(this.model.Location.WGS84);
          this.map.line.source = [...data.line];
          this.map.line.on.step(this.map.line.step);
        }
        this.map.point.load(this.model);
      });
      this.subscription.add(sub);
    }
  }

  ngOnInit(): void {
    if (this.data) {
      this.model = Object.assign(this.init(), this.data);
      this.map.load(this.model);
    } else {
      this.model = this.init();
    }
    this.regist();
  }
  ngAfterViewChecked(): void {
    this.In.point =
      this.source.points.findIndex((x) => x.Value == this.model.ObjectType) >=
      0;
    this.In.line =
      this.source.lines.findIndex((x) => x.Value == this.model.ObjectType) >= 0;
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  private get check() {
    if (!this.model.Name) {
      this.toastr.warning('请填写部件名称');
      return false;
    }
    if (!this.model.ObjectType) {
      this.toastr.warning('请选择部件类型');
      return false;
    }
    if (!this.model.Address) {
      this.toastr.warning('请填写部件地址');
      return false;
    }
    if (!this.model.ImageUrl && !this.image.data) {
      this.toastr.warning('请上传部件图片');
      return false;
    }
    if (this.model.ObjectType != RoadObjectType.CycleLaneSeparator) {
      if (!this.map.point.wgs84) {
        this.toastr.warning('请设置部件位置');
        return false;
      }
    }
    return true;
  }

  on = {
    error: (e: Error) => {
      let message = '';
      if (typeof e == 'string') {
        message = e;
      } else {
        message = e.message;
      }
      this.toastr.error(message);
    },
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
        if (this.model.IsGeoLine) {
          this.model.GeoLine = [...this.map.line.datas];
          let first = this.model.GeoLine[0];
          this.model.Location = GisPoints.create(
            [first.Longitude, first.Latitude],
            GisType.GCJ02,
            first
          );
        } else {
          if (this.map.point.wgs84) {
            let point = GisPoint.create(
              this.map.point.wgs84.Longitude,
              this.map.point.wgs84.Latitude,
              GisType.WGS84,
              this.map.point.wgs84
            );
            this.model.Location.set(point, GisType.WGS84);
          }
        }

        this.business
          .create(this.model)
          .then((x) => {
            this.data = x;
            this.toastr.success('部件创建成功');
            this.ok.emit(this.data);
            this.close.emit();
          })
          .catch((e) => {
            console.error(e);
            this.toastr.error('部件创建失败');
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
        if (this.map.point.wgs84) {
          let point = GisPoint.create(
            this.map.point.wgs84.Longitude,
            this.map.point.wgs84.Latitude,
            GisType.WGS84,
            this.map.point.wgs84
          );
          this.model.Location.set(point, GisType.WGS84);
        }

        this.business
          .update(this.model)
          .then((x) => {
            this.data = x;
            this.toastr.success('部件修改成功');
            this.ok.emit(this.data);
            this.close.emit();
          })
          .catch((e) => {
            console.error(e);
            this.toastr.error('部件修改失败');
          });
      }
    },
    cancel: () => {
      this.close.emit();
    },
  };

  save() {}

  map = {
    type: RoadObjectType.FireHydrant,
    state: RoadObjectState.None,
    load: (data: RoadObject) => {
      if (data.IsGeoLine && data.GeoLine) {
        this.map.line.source = data.GeoLine.map(
          (x) => [x.Longitude, x.Latitude] as [number, number]
        );
        this.map.line.load(data);
      } else {
        this.map.point.load(data);
      }
    },
    line: {
      creating: false,
      editing: false,
      step: 20,
      source: [] as [number, number][],
      datas: [] as GisPoint[],
      load: (data: RoadObject) => {
        if (data.IsGeoLine && data.GeoLine) {
          this.map.line.datas = [...data.GeoLine];
        }
      },
      on: {
        step: (step: number) => {
          let line = GeoTool.polyline.sampleLineByDistance(
            this.map.line.source,
            step
          );
          this.model.GeoLine = line.map((x) => {
            let point = GisPoint.create(x[0], x[1], GisType.GCJ02);
            return point;
          });
          this.map.line.load(this.model);
        },
      },
    },
    point: {
      wgs84: undefined as GisPoint | undefined,
      gcj02: [0, 0] as [number, number],

      get: {
        address: new EventEmitter<[number, number]>(),
      },
      load: (data: RoadObject) => {
        if (data.Location) {
          this.map.point.wgs84 = data.Location.WGS84;
          this.map.point.gcj02 = [
            data.Location.GCJ02.Longitude,
            data.Location.GCJ02.Latitude,
          ];
        }

        this.map.type = data.ObjectType;
      },
      on: {
        wgs84: (data: GisPoint, sync = false) => {
          this.map.point.wgs84 = Object.assign(new GisPoint(), data);
          this.model.Location = new GisPoints();
          this.model.Location.set(data, GisType.WGS84);
          this.map.point.gcj02 = GeoTool.point.convert.wgs84.to.gcj02(
            this.map.point.wgs84.Longitude,
            this.map.point.wgs84.Latitude
          );
        },
        gcj02: (data: [number, number], sync = false) => {
          let wgs84 = GeoTool.point.convert.gcj02.to.wgs84(data[0], data[1]);
          let point = new GisPoint();
          point.GisType = GisType.WGS84;
          point.Altitude = 0;
          point.Longitude = wgs84[0];
          point.Latitude = wgs84[1];
          this.map.point.wgs84 = point;
          if (sync) {
            this.map.point.on.wgs84(point);
          }
        },
        address: (address: string) => {
          this.model.Address = address;
        },
      },
    },
  };

  image = {
    hidden: false,
    data: undefined as ArrayBuffer | undefined,
    load: new EventEmitter<string>(),
    upload: (data: ArrayBuffer) => {
      this.image.data = data;
    },
    open: () => {
      this.picture.emit(this.model);
    },
  };

  schedule = {
    data: new WeekTimeSegment(),
    enable: (enabled: boolean) => {
      this.model.BlockScheduleEnabled = enabled;
      if (this.model.BlockScheduleEnabled) {
        if (!this.model.BlockSchedule) {
          this.model.BlockSchedule = new WeekTimeSegment();
        }
      }
    },
    change: () => {
      this.model.BlockSchedule = this.schedule.data;
    },
  };
}
