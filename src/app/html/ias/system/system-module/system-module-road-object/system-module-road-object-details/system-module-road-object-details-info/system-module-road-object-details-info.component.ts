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
import { HowellSelectComponent } from '../../../../../../../common/components/hw-select/select-control.component';
import { GisType } from '../../../../../../../common/data-core/enums/gis-type.enum';
import { RoadObject } from '../../../../../../../common/data-core/models/arm/geographic/road-object.model';
import { GisPoint } from '../../../../../../../common/data-core/models/arm/gis-point.model';
import { TextSpaceBetweenDirective } from '../../../../../../../common/directives/text-space-between/text-space-between.directive';
import { WheelInputNumberDirective } from '../../../../../../../common/directives/wheel-input-number/wheel-input-number.directive';
import { GeoTool } from '../../../../../../../common/tools/geo-tool/geo.tool';
import { SystemModuleRoadObjectDetailsInfoSource } from './system-module-road-object-details-info.source';

@Component({
  selector: 'ias-system-module-road-object-details-info',
  imports: [
    CommonModule,
    FormsModule,
    TextSpaceBetweenDirective,
    WheelInputNumberDirective,
    HowellSelectComponent,
  ],
  templateUrl: './system-module-road-object-details-info.component.html',
  styleUrl: './system-module-road-object-details-info.component.less',
  providers: [SystemModuleRoadObjectDetailsInfoSource],
})
export class SystemModuleRoadObjectDetailsInfoComponent
  implements OnInit, OnChanges
{
  @Input() operable = true;
  @Input() data = new RoadObject();
  @Output() dataChange = new EventEmitter<RoadObject>();
  @Input() wgs84?: GisPoint;
  @Output() wgs84Change = new EventEmitter<GisPoint>();

  constructor(
    public source: SystemModuleRoadObjectDetailsInfoSource,
    private toastr: ToastrService
  ) {
    source.loaded = () => {
      if (source.divisions.length == 1) {
        if (!this.data.DivisionId) {
          this.data.DivisionId = source.divisions[0].Id;
        }
      }
    };
  }

  GisType = GisType;

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
        this.wgs84 = this.data.Location.WGS84;
        this.wgs84Change.emit(this.wgs84);
      } else {
        this.toastr.warning('请输入正确的坐标格式');
      }
    },
  };

  private change = {
    wgs84: (change: SimpleChange) => {
      if (change) {
        if (this.wgs84) {
          let wgs84: [number, number] = [
            this.wgs84.Longitude,
            this.wgs84.Latitude,
          ];
          this.location.load(wgs84);
        }
      }
    },
  };

  ngOnChanges(changes: SimpleChanges): void {
    this.change.wgs84(changes['wgs84']);
  }
  ngOnInit(): void {}

  on = {
    change: () => {
      this.dataChange.emit(this.data);
    },
  };
}
