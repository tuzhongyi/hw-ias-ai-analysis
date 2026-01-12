import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { SegmentWeekComponent } from '../../../../../../../common/components/segment/segment-week/segment-week.component';
import { GisType } from '../../../../../../../common/data-core/enums/gis-type.enum';
import { WeekTimeSegment } from '../../../../../../../common/data-core/models/arm/analysis/segment/week-time-segment.model';
import { RoadSection } from '../../../../../../../common/data-core/models/arm/geographic/road-section.model';
import { GisPoint } from '../../../../../../../common/data-core/models/arm/gis-point.model';
import { SystemModuleRoadSectionDetailsInfoComponent } from '../system-module-road-section-details-info/system-module-road-section-details-info.component';
import { SystemModuleRoadSectionDetailsMapComponent } from '../system-module-road-section-details-map/system-module-road-section-details-map.component';
import { SystemModuleRoadSectionDetailsManagerBusiness } from './system-module-road-section-details-manager.business';

@Component({
  selector: 'ias-system-module-road-section-details-manager',
  imports: [
    CommonModule,
    FormsModule,
    SystemModuleRoadSectionDetailsMapComponent,
    SystemModuleRoadSectionDetailsInfoComponent,
    SegmentWeekComponent,
  ],
  templateUrl: './system-module-road-section-details-manager.component.html',
  styleUrl: './system-module-road-section-details-manager.component.less',
  providers: [SystemModuleRoadSectionDetailsManagerBusiness],
})
export class SystemModuleRoadSectionDetailsManagerComponent implements OnInit {
  @Input() data?: RoadSection;
  @Output() ok = new EventEmitter<RoadSection>();
  @Output() cancel = new EventEmitter<void>();

  constructor(
    private toastr: ToastrService,
    private business: SystemModuleRoadSectionDetailsManagerBusiness
  ) {}

  private _model = this.init();

  public get model(): RoadSection {
    return this._model;
  }
  public set model(v: RoadSection) {
    this._model = v;
  }

  ngOnInit(): void {
    if (this.data) {
      this.model = Object.assign(new RoadSection(), this.data);
    }
    if (this.model.Schedule) {
      this.schedule.data = this.model.Schedule;
    }
  }

  private init() {
    let data = new RoadSection();
    data.Raduis = 30;
    data.SectionType = 0;
    return data;
  }

  get check() {
    if (!this.model.Name) {
      this.toastr.warning('请输入路段名称');
      return false;
    }
    if (!this.model.GeoLine || this.model.GeoLine.length == 0) {
      this.toastr.warning('请绘制路段');
      return false;
    }
    return true;
  }

  on = {
    ok: () => {
      if (this.check) {
        let promise: Promise<RoadSection>;
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
    enable: () => {
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
      this.model.GeoLine = datas.map((x) => {
        // let position = GeoTool.point.convert.gcj02.to.wgs84(x[0], x[1]);
        let position = [...x];
        let point = new GisPoint();
        point.Longitude = position[0];
        point.Latitude = position[1];
        point.Altitude = 0;
        point.GisType = GisType.WGS84;
        return point;
      });
      console.log(this.model);
    },
  };
}
