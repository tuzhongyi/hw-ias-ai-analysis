import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { GisPoint } from '../../../../../common/data-core/models/arm/gis-point.model';
import { SystemEventMapAMapController } from './controller/amap/system-event-map-amap.controller';
import { ISystemEventMapArgs, MapMarkerType } from './system-event-map.model';

@Component({
  selector: 'ias-system-event-map',
  imports: [],
  templateUrl: './system-event-map.component.html',
  styleUrl: './system-event-map.component.less',
  providers: [SystemEventMapAMapController],
})
export class SystemEventMapComponent implements OnInit, OnChanges {
  @Input() location?: GisPoint;
  @Input() type = MapMarkerType.other;
  @Input() points: GisPoint[] = [];

  constructor(private amap: SystemEventMapAMapController) {}

  private args: ISystemEventMapArgs = {
    type: this.type,
  };

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['type']) {
      this.args.type = changes['type'].currentValue;
    }
    if (changes['points']) {
      this.amap.point.clear().then((x) => {
        this.amap.point.load(this.points);
      });
    }
  }

  ngOnInit(): void {
    if (this.location) {
      this.amap.load(this.location, this.args);
    }
  }

  load(location: GisPoint) {
    this.amap.load(location, this.args);
  }
}
