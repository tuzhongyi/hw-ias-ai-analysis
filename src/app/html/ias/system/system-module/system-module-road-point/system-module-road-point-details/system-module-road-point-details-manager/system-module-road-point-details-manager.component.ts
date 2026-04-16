import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { SegmentWeekComponent } from '../../../../../../../common/components/segment/segment-week/segment-week.component';
import { GisType } from '../../../../../../../common/data-core/enums/gis-type.enum';
import { WeekTimeSegment } from '../../../../../../../common/data-core/models/arm/analysis/segment/week-time-segment.model';
import { RoadPoint } from '../../../../../../../common/data-core/models/arm/geographic/road-point.model';
import {
  GisPoint,
  GisPoints,
} from '../../../../../../../common/data-core/models/arm/gis-point.model';
import { GeoTool } from '../../../../../../../common/tools/geo-tool/geo.tool';
import { SystemModuleRoadPointDetailsInfoComponent } from '../system-module-road-point-details-info/system-module-road-point-details-info.component';
import { SystemModuleRoadPointDetailsMapComponent } from '../system-module-road-point-details-map/system-module-road-point-details-map.component';
import { SystemModuleRoadPointDetailsManagerBusiness } from './system-module-road-point-details-manager.business';

@Component({
  selector: 'ias-system-module-road-point-details-manager',
  imports: [
    CommonModule,
    FormsModule,
    SystemModuleRoadPointDetailsMapComponent,
    SystemModuleRoadPointDetailsInfoComponent,
    SegmentWeekComponent,
  ],
  templateUrl: './system-module-road-point-details-manager.component.html',
  styleUrl: './system-module-road-point-details-manager.component.less',
  providers: [SystemModuleRoadPointDetailsManagerBusiness],
})
export class SystemModuleRoadPointDetailsManagerComponent implements OnInit {
  @Input() data?: RoadPoint;
  @Output() ok = new EventEmitter<RoadPoint>();
  @Output() cancel = new EventEmitter<void>();

  constructor(
    private toastr: ToastrService,
    private business: SystemModuleRoadPointDetailsManagerBusiness
  ) {}

  private _model = this.init();

  public get model(): RoadPoint {
    return this._model;
  }
  public set model(v: RoadPoint) {
    this._model = v;
  }

  ngOnInit(): void {
    if (this.data) {
      this.model = Object.assign(new RoadPoint(), this.data);
    }
    if (this.model.Schedule) {
      this.schedule.data = this.model.Schedule;
    }
  }

  private init() {
    let data = new RoadPoint();
    data.Raduis = 15;
    data.PointType = 1;
    let date = new Date();
    date.setDate(date.getDate() + 7);
    date.setHours(23, 59, 59, 999);
    data.ExpiredTime = date;
    return data;
  }

  get check() {
    if (!this.model.Name) {
      this.toastr.warning('请输入路段名称');
      return false;
    }
    if (!this.model.Location) {
      this.toastr.warning('请在输入坐标');
      return false;
    }
    return true;
  }

  on = {
    ok: () => {
      if (this.check) {
        let promise: Promise<RoadPoint>;
        if (this.data) {
          promise = this.business.update(this.model);
        } else {
          promise = this.business.create(this.model);
        }

        promise.then((x) => {
          this.toastr.success('保存成功');
          this.ok.emit(x);
        });
      }
    },
    cancel: () => {
      this.cancel.emit();
    },
  };

  schedule = {
    data: new WeekTimeSegment(),
    enable: (enabled: boolean) => {
      this.model.ScheduleEnabled = enabled;
      if (this.model.ScheduleEnabled) {
        if (!this.model.Schedule) {
          this.model.Schedule = new WeekTimeSegment();
        }
      }
    },
    change: () => {
      this.model.Schedule = this.schedule.data;
    },
  };

  map = {
    wgs84: undefined as GisPoint | undefined,
    gcj02: [0, 0] as [number, number],
    get: {
      address: new EventEmitter<[number, number]>(),
    },
    load: (data: RoadPoint) => {
      if (data.Location) {
        this.map.wgs84 = data.Location.WGS84;
        this.map.gcj02 = [
          data.Location.GCJ02.Longitude,
          data.Location.GCJ02.Latitude,
        ];
      }
    },
    on: {
      wgs84: (data: GisPoint, sync = false) => {
        this.map.wgs84 = Object.assign(new GisPoint(), data);
        this.model.Location = new GisPoints();
        this.model.Location.set(data, GisType.WGS84);
        this.map.gcj02 = GeoTool.point.convert.wgs84.to.gcj02(
          this.map.wgs84.Longitude,
          this.map.wgs84.Latitude
        );
      },
      gcj02: (data: [number, number], sync = false) => {
        let wgs84 = GeoTool.point.convert.gcj02.to.wgs84(data[0], data[1]);
        let point = new GisPoint();
        point.GisType = GisType.WGS84;
        point.Altitude = 0;
        point.Longitude = wgs84[0];
        point.Latitude = wgs84[1];
        this.map.wgs84 = point;
        if (sync) {
          this.map.on.wgs84(point);
        }
      },
    },
  };
}
