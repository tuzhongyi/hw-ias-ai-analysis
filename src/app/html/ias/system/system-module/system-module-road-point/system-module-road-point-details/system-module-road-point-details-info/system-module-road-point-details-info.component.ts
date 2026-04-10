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
import { DateTimeControlComponent } from '../../../../../../../common/components/date-time-control/date-time-control.component';
import { HowellSelectComponent } from '../../../../../../../common/components/hw-select/select-control.component';
import { SelectMultipleComponent } from '../../../../../../../common/components/select-multiple/select-multiple.component';
import { GisType } from '../../../../../../../common/data-core/enums/gis-type.enum';
import { RoadPoint } from '../../../../../../../common/data-core/models/arm/geographic/road-point.model';
import { GisPoint } from '../../../../../../../common/data-core/models/arm/gis-point.model';
import { IIdNameModel } from '../../../../../../../common/data-core/models/interface/model.interface';
import { TextSpaceBetweenDirective } from '../../../../../../../common/directives/text-space-between/text-space-between.directive';
import { GeoTool } from '../../../../../../../common/tools/geo-tool/geo.tool';
import { wait } from '../../../../../../../common/tools/wait';
import { SystemModuleRoadPointDetailsInfoSource } from './system-module-road-point-details-info.source';

@Component({
  selector: 'ias-system-module-road-point-details-info',
  imports: [
    CommonModule,
    FormsModule,
    TextSpaceBetweenDirective,
    HowellSelectComponent,
    SelectMultipleComponent,
    DateTimeControlComponent,
  ],
  templateUrl: './system-module-road-point-details-info.component.html',
  styleUrl: './system-module-road-point-details-info.component.less',
  providers: [SystemModuleRoadPointDetailsInfoSource],
})
export class SystemModuleRoadPointDetailsInfoComponent
  implements OnChanges, OnInit
{
  @Input() operable = true;
  @Input() data = new RoadPoint();
  @Output() dataChange = new EventEmitter<RoadPoint>();
  @Input() wgs84?: GisPoint;
  @Output() wgs84Change = new EventEmitter<GisPoint>();

  constructor(
    public source: SystemModuleRoadPointDetailsInfoSource,
    private toastr: ToastrService
  ) {}

  GisType = GisType;

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
  ngOnInit(): void {
    this.selected.event.load(this.data.EventTypes);
    this.selected.roadobject.load(this.data.RoadObjectTypes);
  }

  on = {
    type: () => {
      switch (this.data.PointType) {
        case 1:
          this.data.RoadObjectTypes = [];
          break;
        case 2:
          this.data.EventTypes = [];
          break;

        default:
          break;
      }
      this.on.change();
    },
    change: () => {
      if (!this.data) {
        this.data = new RoadPoint();
      }
      this.data = Object.assign(this.data, this.data);
      this.dataChange.emit(this.data);
    },
  };

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
        this.wgs84Change.emit(this.wgs84);
      } else {
        this.toastr.warning('请输入正确的坐标格式');
      }
    },
  };

  selected = {
    event: {
      values: [] as IIdNameModel<number>[],
      load: async (types?: number[]) => {
        wait(() => this.source.type.event.length > 0).then(() => {
          if (types) {
            this.selected.event.values = [];
            for (let i = 0; i < types.length; i++) {
              const type = types[i];
              let item = this.source.type.event.find((x) => x.Id == type);
              if (item) {
                this.selected.event.values.push(item);
              }
            }
          }
        });
      },
      change: (items: IIdNameModel<number>[]) => {
        this.data.EventTypes = items.map((x) => x.Id);
        this.on.change();
      },
    },
    roadobject: {
      values: [] as IIdNameModel<number>[],
      load: async (types?: number[]) => {
        wait(() => this.source.type.roadobject.length > 0).then(() => {
          if (types) {
            this.selected.roadobject.values = [];
            for (let i = 0; i < types.length; i++) {
              const type = types[i];
              let item = this.source.type.roadobject.find((x) => x.Id == type);
              if (item) {
                this.selected.roadobject.values.push(item);
              }
            }
          }
        });
      },
      change: (items: IIdNameModel<number>[]) => {
        this.data.RoadObjectTypes = items.map((x) => x.Id);
        this.on.change();
      },
    },
  };
}
