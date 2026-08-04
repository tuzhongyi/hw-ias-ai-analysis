import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { SegmentWeekComponent } from '../../../../../../../common/components/segment/segment-week/segment-week.component';
import { RoadObjectState } from '../../../../../../../common/data-core/enums/road/road-object/road-object-state.enum';
import { WeekTimeSegment } from '../../../../../../../common/data-core/models/arm/analysis/segment/week-time-segment.model';
import { ObjectImageSamplingConfig } from '../../../../../../../common/data-core/models/arm/geographic/object-image-sampling-config.model';
import { RoadObjectStock } from '../../../../../../../common/data-core/models/arm/geographic/road-object-stock.model';
import { RoadObject } from '../../../../../../../common/data-core/models/arm/geographic/road-object.model';
import { SystemModuleRoadObjectDetailsConfigComponent } from '../../../system-module-road-object/system-module-road-object-details/system-module-road-object-details-config/system-module-road-object-details-config.component';
import { SystemModuleRoadObjectSource } from '../../../system-module-road-object/system-module-road-object.source';
import { SystemModuleRoadObjectStockTransformInfoComponent } from '../system-module-road-object-stock-transform-info/system-module-road-object-stock-transform-info.component';
import { SystemModuleRoadObjectStockTransformManagerBusiness } from './system-module-road-object-stock-transform-manager.business';

@Component({
  selector: 'ias-system-module-road-object-stock-transform-manager',
  imports: [
    CommonModule,
    FormsModule,
    SystemModuleRoadObjectStockTransformInfoComponent,
    SystemModuleRoadObjectDetailsConfigComponent,
    SegmentWeekComponent,
  ],
  templateUrl:
    './system-module-road-object-stock-transform-manager.component.html',
  styleUrl:
    './system-module-road-object-stock-transform-manager.component.less',
  providers: [SystemModuleRoadObjectStockTransformManagerBusiness],
})
export class SystemModuleRoadObjectStockTransformManagerComponent implements OnInit {
  @Input() operable = true;
  @Input() datas: RoadObjectStock[] = [];
  @Output() ok = new EventEmitter<RoadObject[]>();
  @Output() close = new EventEmitter<void>();

  constructor(
    private business: SystemModuleRoadObjectStockTransformManagerBusiness,
    private toastr: ToastrService,
    private source: SystemModuleRoadObjectSource,
  ) {}

  model = this.init();
  autoremove = true;
  private has = {
    division: false,
    gridcell: false,
  };

  private init() {
    let obj = new RoadObject();
    obj.ObjectState = RoadObjectState.None;
    obj.DisappearTimes = 2;
    obj.ImageSampling = new ObjectImageSamplingConfig();
    obj.ImageSampling.Enabled = true;
    obj.ImageSampling.Distance = 5;
    obj.ImageSampling.SamplePlan = 3;
    obj.ImageSampling.InspectionInterval = 1;
    obj.ImageSampling.Course = 0;
    obj.ImageSampling.InspectionTime = new Date();
    obj.ImageSampling.LatestInspectionTime = new Date();

    return obj;
  }

  private load(datas: RoadObjectStock[]) {
    if (!datas || datas.length === 0) return;

    let first = datas[0];
    // 部件类型
    if (first.ObjectType && datas.every((x) => x.ObjectType === first.ObjectType)) {
      this.model.ObjectType = first.ObjectType;
    }
    // 行政区划
    if (first.DivisionId && datas.every((x) => x.DivisionId === first.DivisionId)) {
      this.model.DivisionId = first.DivisionId;
    }
    // 责任网格
    if (first.GridCellId && datas.every((x) => x.GridCellId === first.GridCellId)) {
      this.model.GridCellId = first.GridCellId;
    }
    // 部件分类
    if (first.Category != null && datas.every((x) => x.Category === first.Category)) {
      this.model.Category = first.Category;
    }
  }

  ngOnInit(): void {
    this.load(this.datas);
    this.source.divisions.then((x) => {
      this.has.division = x.length > 0;
    });
    this.source.gridcells.then((x) => {
      this.has.gridcell = x.length > 0;
    });
  }

  private get check() {
    let needType =
      this.datas.length > 0 && this.datas.some((x) => !x.ObjectType);
    if (needType && !this.model.ObjectType) {
      this.toastr.warning('请选择部件类型');
      return false;
    }
    if (this.has.division) {
      let needDivision =
        this.datas.length > 0 && this.datas.some((x) => !x.DivisionId);
      if (needDivision && !this.model.DivisionId) {
        this.toastr.warning('请选择行政区划');
        return false;
      }
    }
    if (!this.model.DisappearTimes) {
      this.toastr.warning('请填写连续消失次数');
      return false;
    }
    if (this.has.gridcell) {
      let needGridCell =
        this.datas.length > 0 && this.datas.some((x) => !x.GridCellId);
      if (needGridCell && !this.model.GridCellId) {
        this.toastr.warning('请选择责任网格');
        return false;
      }
    }
    return true;
  }

  on = {
    create: async () => {
      if (!this.check) return;
      if (!this.datas || this.datas.length === 0) {
        this.toastr.warning('没有待转换的数据');
        return;
      }

      let results: RoadObject[] = [];
      let errors: number[] = [];
      for (let i = 0; i < this.datas.length; i++) {
        try {
          let stock = this.datas[i];
          let obj = await this.business.transform(stock, this.model);
          results.push(obj);
          if (this.autoremove && stock.Id) {
            await this.business.delete(stock.Id);
          }
        } catch (e) {
          console.error(e);
          errors.push(i + 1);
        }
      }

      if (errors.length > 0) {
        this.toastr.error(`转换失败: 第 ${errors.join(', ')} 条数据`);
      }
      if (results.length > 0) {
        this.toastr.success(`成功转换 ${results.length} 条数据`);
        this.ok.emit(results);
      }
    },
    cancel: () => {
      this.close.emit();
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
