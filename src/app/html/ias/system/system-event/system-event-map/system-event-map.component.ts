import { Component, Input, OnInit } from '@angular/core';
import { GisPoint } from '../../../../../common/data-core/models/arm/gis-point.model';
import { ContentHeaderComponent } from '../../../share/header/content-header/content-header.component';
import { SystemEventMapAMapController } from './controller/amap/system-event-map-amap.controller';

@Component({
  selector: 'ias-system-event-map',
  imports: [ContentHeaderComponent],
  templateUrl: './system-event-map.component.html',
  styleUrl: './system-event-map.component.less',
  providers: [SystemEventMapAMapController],
})
export class SystemEventMapComponent implements OnInit {
  @Input() title: string = '';
  @Input() location?: GisPoint;

  constructor(private amap: SystemEventMapAMapController) {}
  ngOnInit(): void {
    if (this.location) {
      this.amap.load(this.location);
    }
  }

  load(location: GisPoint) {
    this.amap.load(location);
  }
}
