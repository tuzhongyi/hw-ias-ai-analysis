import { CommonModule } from '@angular/common';
import {
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
import { DateTimeControlComponent } from '../../../../../../../common/components/date-time-control/date-time-control.component';
import { GisType } from '../../../../../../../common/data-core/enums/gis-type.enum';
import { AnalysisGpsTask } from '../../../../../../../common/data-core/models/arm/analysis/llm/analysis-gps-task.model';
import {
  GisPoint,
  GisPoints,
} from '../../../../../../../common/data-core/models/arm/gis-point.model';
import { TextSpaceBetweenDirective } from '../../../../../../../common/directives/text-space-between/text-space-between.directive';
import { WheelInputNumberDirective } from '../../../../../../../common/directives/wheel-input-number/wheel-input-number.directive';
import { Language } from '../../../../../../../common/tools/language-tool/language';
import { SystemModuleGpsTaskDetailsInformationSource } from './system-module-gps-task-details-information.source';

@Component({
  selector: 'ias-system-module-gps-task-details-information',
  imports: [
    CommonModule,
    FormsModule,
    TextSpaceBetweenDirective,
    DateTimeControlComponent,
    WheelInputNumberDirective,
  ],
  templateUrl: './system-module-gps-task-details-information.component.html',
  styleUrl: './system-module-gps-task-details-information.component.less',
  providers: [SystemModuleGpsTaskDetailsInformationSource],
})
export class SystemModuleGpsTaskDetailsInformationComponent
  implements OnInit, OnDestroy
{
  @Input() data = new AnalysisGpsTask();
  @Output() dataChange = new EventEmitter<AnalysisGpsTask>();

  @Output() gispoint = new EventEmitter<GisPoint>();
  @Input() moving?: EventEmitter<GisPoint>;

  constructor(
    public source: SystemModuleGpsTaskDetailsInformationSource,
    private toastr: ToastrService
  ) {}

  Language = Language;
  GisType = GisType;
  private subscription = new Subscription();

  private regist() {
    if (this.moving) {
      let sub = this.moving.subscribe((x) => {
        let points = new GisPoints();
        points.set(x, GisType.GCJ02);
        this.location.load(points);
      });
      this.subscription.add(sub);
    }
  }

  ngOnInit(): void {
    this.regist();
    this.location.load(this.data.Location);
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  time = {
    expired: {
      value: new Date(),
      change: (date: Date) => {
        this.data.ExpiredTime = date;
      },
      clear: () => {
        this.data.ExpiredTime = undefined;
      },
    },
  };

  location = {
    type: {
      value: GisType.WGS84,
      change: () => {
        if (this.data.Location) {
          this.location.load(this.data.Location);
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
        if (!this.data.Location) {
          this.data.Location = new GisPoints();
        }
        let point = GisPoint.create(
          position[0],
          position[1],
          this.location.type.value
        );
        this.data.Location.set(point, this.location.type.value);
        this.gispoint.emit(this.data.Location.GCJ02);
      } else {
        this.toastr.warning('请输入正确的坐标格式');
      }
    },
  };
}
