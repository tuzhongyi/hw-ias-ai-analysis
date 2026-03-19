import { CommonModule } from '@angular/common';
import {
  Component,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { GisPoint } from '../../../../common/data-core/models/arm/gis-point.model';
import { IASMapAMapController } from './controller/amap/ias-map-amap.controller';
import { IIASMapArgs, MapMarker, MapMarkerStyle } from './ias-map.model';

@Component({
  selector: 'ias-map',
  imports: [CommonModule],
  templateUrl: './ias-map.component.html',
  styleUrl: './ias-map.component.less',
  providers: [IASMapAMapController],
})
export class IASMapComponent implements OnInit, OnChanges, OnDestroy {
  @Input() location?: GisPoint;
  @Input() move = false;
  @Input() marker = new MapMarkerStyle();
  @Input() shops: GisPoint[] = [];
  @Input() points: MapMarker[] = [];

  constructor(private amap: IASMapAMapController) {}

  hasdata = true;
  private args: IIASMapArgs = {
    path: this.marker.path,
    size: this.marker.size,
  };

  ngOnChanges(changes: SimpleChanges): void {
    let load = false;
    if (changes['location'] && !changes['location'].firstChange) {
      load = true;
    }
    if (changes['marker']) {
      this.args.path = this.marker.path;
      this.args.size = this.marker.size;
      if (!changes['marker'].firstChange) {
        load = true;
      }
    }
    if (load) {
      this.amap.clear().then(() => {
        if (
          this.location &&
          this.location.Longitude > 0 &&
          this.location.Latitude > 0
        ) {
          this.hasdata = true;
          this.amap.load(this.location, this.args, this.move);
        } else {
          this.hasdata = false;
        }
      });
    }
    if (changes['shops']) {
      this.amap.shop.clear().then((x) => {
        this.amap.shop.load(this.shops, this.move);
        this.hasdata = true;
      });
    }
    if (changes['points']) {
      this.amap.point.clear().then((x) => {
        this.amap.point.load(this.points, this.move);
        this.hasdata = true;
      });
    }
  }

  ngOnInit(): void {
    if (
      this.location &&
      this.location.Longitude > 0 &&
      this.location.Latitude > 0
    ) {
      this.hasdata = true;
      this.amap.load(this.location, this.args, true);
    } else {
      this.hasdata = false;
    }
  }

  ngOnDestroy(): void {
    this.amap.destroy();
  }

  load(location: GisPoint) {
    this.amap.load(location, this.args);
  }
}
