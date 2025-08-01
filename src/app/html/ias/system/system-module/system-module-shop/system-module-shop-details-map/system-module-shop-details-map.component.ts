import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  SimpleChange,
  SimpleChanges,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';
import { IShop } from '../../../../../../common/data-core/models/arm/analysis/shop.interface';
import { GisPoint } from '../../../../../../common/data-core/models/arm/gis-point.model';
import { SystemModuleShopDetailsAMapController } from './controller/system-module-shop-details-amap.controller';

@Component({
  selector: 'ias-system-module-shop-details-map',
  imports: [CommonModule, FormsModule],
  templateUrl: './system-module-shop-details-map.component.html',
  styleUrl: './system-module-shop-details-map.component.less',
  providers: [SystemModuleShopDetailsAMapController],
})
export class SystemModuleShopDetailsMapComponent
  implements OnInit, OnChanges, OnDestroy
{
  @Input() data?: GisPoint;
  @Output() dataChange = new EventEmitter<GisPoint>();

  @Input() load?: EventEmitter<GisPoint>;
  @Input() points: IShop[] = [];

  constructor(private controller: SystemModuleShopDetailsAMapController) {}

  private subscription = new Subscription();

  ngOnChanges(changes: SimpleChanges): void {
    this.change.data(changes['data']);
    this.change.points(changes['points']);
  }

  private change = {
    data: (simple: SimpleChange) => {
      if (simple) {
        if (this.data) {
          this.controller.load(this.data);
        }
      }
    },
    points: (simple: SimpleChange) => {
      if (simple) {
        this.controller.point.load(this.points);
      }
    },
  };

  ngOnInit(): void {
    if (this.load) {
      let sub = this.load.subscribe((x) => {
        this.controller.load(x);
      });
      this.subscription.add(sub);
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

  ngOnDestroy(): void {
    this.controller.destroy();
    this.subscription.unsubscribe();
  }
}
