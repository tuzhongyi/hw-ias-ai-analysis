import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { SegmentWeekComponent } from '../../../../../../../common/components/segment/segment-week/segment-week.component';
import { GisType } from '../../../../../../../common/data-core/enums/gis-type.enum';
import { RoadAreaUsageType } from '../../../../../../../common/data-core/enums/road/road-area/road-area-usage-type.enum';
import { WeekTimeSegment } from '../../../../../../../common/data-core/models/arm/analysis/segment/week-time-segment.model';
import { RoadArea } from '../../../../../../../common/data-core/models/arm/geographic/road-area.model';
import { GisPoint } from '../../../../../../../common/data-core/models/arm/gis-point.model';
import { SystemModuleRoadAreaDetailsInfoComponent } from '../system-module-road-area-details-info/system-module-road-area-details-info.component';
import { SystemModuleRoadAreaDetailsMapComponent } from '../system-module-road-area-details-map/system-module-road-area-details-map.component';
import { SystemModuleRoadAreaDetailsManagerBusiness } from './system-module-road-area-details-manager.business';

@Component({
  selector: 'ias-system-module-road-area-details-manager',
  imports: [
    CommonModule,
    FormsModule,
    SystemModuleRoadAreaDetailsMapComponent,
    SystemModuleRoadAreaDetailsInfoComponent,
    SegmentWeekComponent,
  ],
  templateUrl: './system-module-road-area-details-manager.component.html',
  styleUrl: './system-module-road-area-details-manager.component.less',
  providers: [SystemModuleRoadAreaDetailsManagerBusiness],
})
export class SystemModuleRoadAreaDetailsManagerComponent implements OnInit {
  @Input() data?: RoadArea;
  @Output() ok = new EventEmitter<RoadArea>();
  @Output() cancel = new EventEmitter<void>();

  constructor(
    private toastr: ToastrService,
    private business: SystemModuleRoadAreaDetailsManagerBusiness
  ) {}

  private _model = this.init();

  public get model(): RoadArea {
    return this._model;
  }
  public set model(v: RoadArea) {
    this._model = v;
  }

  ngOnInit(): void {
    if (this.data) {
      this.model = Object.assign(new RoadArea(), this.data);
    }
    if (this.model.Schedule) {
      this.schedule.data = this.model.Schedule;
    }
  }

  private init() {
    let data = new RoadArea();
    data.UsageType = RoadAreaUsageType.EventEnhanced;
    return data;
  }

  get check() {
    if (!this.model.Name) {
      this.toastr.warning('请输入区域名称');
      return false;
    }
    // 多边形至少要三个点，和绘制时的收尾限制保持一致
    if (!this.model.Area || this.model.Area.length < 3) {
      this.toastr.warning('请绘制区域');
      return false;
    }
    return true;
  }

  on = {
    ok: () => {
      if (this.check) {
        let promise: Promise<RoadArea>;
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
    datas: [] as [number, number][],
    change: (datas: [number, number][]) => {
      this.map.datas = [...datas];
      // 区域最后一个点会与第一个点做闭合多边形，闭合交给服务端，这里不要补重复点
      this.model.Area = datas.map((x) => {
        return GisPoint.create(x[0], x[1], GisType.WGS84);
      });
    },
  };
}
