import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChange,
  SimpleChanges,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { GisType } from '../../../../../../../common/data-core/enums/gis-type.enum';
import { RoadObject } from '../../../../../../../common/data-core/models/arm/geographic/road-object.model';
import {
  GisPoint,
  GisPoints,
} from '../../../../../../../common/data-core/models/arm/gis-point.model';
import { TextSpaceBetweenDirective } from '../../../../../../../common/directives/text-space-between/text-space-between.directive';
import { VideoCaptureModel } from '../../../../../../../common/directives/video/video.directive';
import { WheelInputNumberDirective } from '../../../../../../../common/directives/wheel-input-number/wheel-input-number.directive';
import { GeoTool } from '../../../../../../../common/tools/geo-tool/geo.tool';
import { PictureComponent } from '../../../../../share/picture/component/picture.component';
import { SystemModuleRoadObjectDetailsSimpleBusiness } from './system-module-road-object-details-simple.business';

@Component({
  selector: 'ias-system-module-road-object-details-simple',
  imports: [
    CommonModule,
    FormsModule,
    TextSpaceBetweenDirective,
    WheelInputNumberDirective,
    PictureComponent,
  ],
  templateUrl: './system-module-road-object-details-simple.component.html',
  styleUrl: './system-module-road-object-details-simple.component.less',
  providers: [SystemModuleRoadObjectDetailsSimpleBusiness],
})
export class SystemModuleRoadObjectDetailsSimpleComponent
  implements OnInit, OnChanges
{
  @Input() data?: RoadObject;
  @Input() gcj02?: [number, number];
  @Input() course?: number;
  @Output() courseChange = new EventEmitter<number>();
  @Output() close = new EventEmitter<void>();
  @Output() capture = new EventEmitter<void>();
  @Input() picture?: VideoCaptureModel;
  @Output() saved = new EventEmitter<void>();

  constructor(
    private business: SystemModuleRoadObjectDetailsSimpleBusiness,
    private toastr: ToastrService
  ) {}
  ngOnChanges(changes: SimpleChanges): void {
    this.change.gcj02(changes['gcj02']);
    this.change.course(changes['course']);
  }

  private change = {
    gcj02: (change: SimpleChange) => {
      if (change) {
        if (GeoTool.point.check(this.gcj02)) {
          let wgs84 = GeoTool.point.convert.gcj02.to.wgs84(
            this.gcj02![0],
            this.gcj02![1]
          );
          this.wgs84 = GisPoint.create(wgs84[0], wgs84[1], GisType.WGS84);
          this.location.load(wgs84);
        }
      }
    },
    course: (change: SimpleChange) => {
      if (change) {
        if (this.data && this.course != undefined) {
          this.data.ImageSampling.Course = this.course;
        }
      }
    },
  };

  ngOnInit(): void {
    if (this.data) {
      this.wgs84 = this.data.Location.WGS84;
      let position: [number, number] = [
        this.wgs84.Longitude,
        this.wgs84.Latitude,
      ];
      this.location.load(position);
    }
  }

  GisType = GisType;
  wgs84?: GisPoint;

  location = {
    value: '',
    change: new EventEmitter<GisPoint>(),
    type: {
      value: GisType.WGS84,
      change: () => {
        if (this.wgs84) {
          let wgs84: [number, number] = [
            this.wgs84.Longitude,
            this.wgs84.Latitude,
          ];
          this.location.load(wgs84);
        }
      },
    },

    load: (wgs84: [number, number]) => {
      let position: [number, number] = [...wgs84];
      switch (this.location.type.value) {
        case GisType.GCJ02:
          position = GeoTool.point.convert.wgs84.to.gcj02(wgs84[0], wgs84[1]);
          break;
        case GisType.BD09:
          position = GeoTool.point.convert.wgs84.to.bd09(wgs84[0], wgs84[1]);
          break;

        case GisType.WGS84:
        default:
          break;
      }
      this.location.value = position.join(',');
    },
    set: () => {
      let position = this.location.value
        .split(',')
        .map((x) => parseFloat(x)) as [number, number];
      if (position.length === 2) {
        let wgs84 = new GisPoint();
        wgs84.GisType = GisType.WGS84;
        wgs84.Altitude = 0;
        switch (this.location.type.value) {
          case GisType.WGS84:
            wgs84.Longitude = position[0];
            wgs84.Latitude = position[1];
            break;
          case GisType.GCJ02:
            position = GeoTool.point.convert.gcj02.to.wgs84(
              position[0],
              position[1]
            );
            wgs84.Longitude = position[0];
            wgs84.Latitude = position[1];
            break;
          case GisType.BD09:
            position = GeoTool.point.convert.bd09.to.wgs84(
              position[0],
              position[1]
            );
            wgs84.Longitude = position[0];
            wgs84.Latitude = position[1];
            break;

          default:
            break;
        }
        this.wgs84 = wgs84;
      } else {
        this.toastr.warning('请输入正确的坐标格式');
      }
    },
    get: () => {
      let position = this.location.value
        .split(',')
        .map((x) => parseFloat(x)) as [number, number];
      let point = GisPoints.create(position, this.location.type.value);
      return point;
    },
  };

  on = {
    course: () => {
      if (this.data) {
        this.courseChange.emit(this.data.ImageSampling.Course);
      }
    },
    close: () => {
      this.close.emit();
    },
    capture: () => {
      this.capture.emit();
    },
    save: async () => {
      if (!this.data) return;
      if (this.picture) {
        this.data.ImageUrl = await this.business.picture.upload(
          this.picture.buffer
        );
      }
      this.data.Location = this.location.get();
      this.business.update(this.data).then((x) => {
        this.toastr.success('保存成功');
        this.saved.emit();
      });
    },
  };
}
