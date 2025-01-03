import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { GisPoint } from '../../../../common/data-core/models/arm/gis-point.model';
import { SystemModuleShopDetailsAMapController } from './controller/system-module-shop-details-amap.controller';

@Component({
  selector: 'ias-system-module-shop-details-map',
  imports: [CommonModule, FormsModule],
  templateUrl: './system-module-shop-details-map.component.html',
  styleUrl: './system-module-shop-details-map.component.less',
  providers: [SystemModuleShopDetailsAMapController],
})
export class SystemModuleShopDetailsMapComponent implements OnInit {
  @Input() data?: GisPoint;
  @Output() dataChange = new EventEmitter<GisPoint>();
  constructor(private controller: SystemModuleShopDetailsAMapController) {}

  ngOnInit(): void {
    if (this.data) {
      this.controller.load(this.data);
    }

    this.controller.dragging.subscribe((x) => {
      if (this.data) {
        this.data.Longitude = x[0];
        this.data.Latitude = x[1];
        this.dataChange.emit(this.data);
      }
    });
    this.controller.dragend.subscribe((x) => {
      if (this.data) {
        this.data.Longitude = x[0];
        this.data.Latitude = x[1];
        this.dataChange.emit(this.data);
      }
    });
  }
}
