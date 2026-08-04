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
import { HowellSelectComponent } from '../../../../../../../common/components/hw-select/select-control.component';
import { GisType } from '../../../../../../../common/data-core/enums/gis-type.enum';
import { RoadObjectStock } from '../../../../../../../common/data-core/models/arm/geographic/road-object-stock.model';
import { GisPoint } from '../../../../../../../common/data-core/models/arm/gis-point.model';
import { TextSpaceBetweenDirective } from '../../../../../../../common/directives/text-space-between/text-space-between.directive';
import { WheelInputNumberDirective } from '../../../../../../../common/directives/wheel-input-number/wheel-input-number.directive';
import { GeoTool } from '../../../../../../../common/tools/geo-tool/geo.tool';
import { SystemModuleRoadObjectStockDetailsInfoBusiness } from './system-module-road-object-stock-details-info.business';
import { SystemModuleRoadObjectStockDetailsInfoSource } from './system-module-road-object-stock-details-info.source';

@Component({
  selector: 'ias-system-module-road-object-stock-details-info',
  imports: [
    CommonModule,
    FormsModule,
    TextSpaceBetweenDirective,
    WheelInputNumberDirective,
    HowellSelectComponent,
  ],
  templateUrl: './system-module-road-object-stock-details-info.component.html',
  styleUrl: './system-module-road-object-stock-details-info.component.less',
  providers: [
    SystemModuleRoadObjectStockDetailsInfoBusiness,
    SystemModuleRoadObjectStockDetailsInfoSource,
  ],
})
export class SystemModuleRoadObjectStockDetailsInfoComponent
  implements OnInit, OnChanges
{
  @Input() operable = true;
  @Input() data = new RoadObjectStock();
  @Output() dataChange = new EventEmitter<RoadObjectStock>();
  @Input() wgs84?: GisPoint;
  @Output() wgs84Change = new EventEmitter<GisPoint>();
  @Output() locate = new EventEmitter<void>();

  constructor(
    private business: SystemModuleRoadObjectStockDetailsInfoBusiness,
    public source: SystemModuleRoadObjectStockDetailsInfoSource,
  ) {}

  GisType = GisType;

  location = {
    value: '',
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
      let wgs84 = this.location.get();
      if (wgs84) {
        this.wgs84 = wgs84;
        this.wgs84Change.emit(this.wgs84);
      }
    },
    get: () => {
      let position = this.location.value
        .split(',')
        .map((x) => parseFloat(x)) as [number, number];
      if (position.length === 2 && !isNaN(position[0]) && !isNaN(position[1])) {
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
              position[1],
            );
            wgs84.Longitude = position[0];
            wgs84.Latitude = position[1];
            break;
          case GisType.BD09:
            position = GeoTool.point.convert.bd09.to.wgs84(
              position[0],
              position[1],
            );
            wgs84.Longitude = position[0];
            wgs84.Latitude = position[1];
            break;
          default:
            break;
        }
        return wgs84;
      }
      return undefined;
    },
  };

  private change = {
    wgs84: (change: SimpleChange) => {
      if (change && this.wgs84) {
        let wgs84: [number, number] = [
          this.wgs84.Longitude,
          this.wgs84.Latitude,
        ];
        this.location.load(wgs84);
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
    getaddress: () => {
      let wgs84 = this.location.get();
      if (wgs84) {
        let position: [number, number] = [wgs84.Longitude, wgs84.Latitude];
        this.business.address(position).then((x) => {
          this.data.Address = x;
          this.on.change();
        });
      }
    },
    locate: () => {
      this.locate.emit();
    },
  };
}
