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
import { Subscription } from 'rxjs';
import { GisPoint } from '../../../../../../../common/data-core/models/arm/gis-point.model';
import { SystemModuleRoadSectionDetailsMapAMapController } from './controller/amap/system-module-road-section-details-map-amap.controller';
import { SystemModuleRoadSectionDetailsMapPositionController } from './controller/system-module-road-section-details-map-position.controller';
import { SystemModuleRoadSectionDetailsMapController } from './controller/system-module-road-section-details-map.controller';
import { SystemModuleRoadSectionDetailsMapBusiness } from './system-module-road-section-details-map.business';

@Component({
  selector: 'ias-system-module-road-section-details-map',
  imports: [CommonModule],
  templateUrl: './system-module-road-section-details-map.component.html',
  styleUrl: './system-module-road-section-details-map.component.less',
  providers: [
    SystemModuleRoadSectionDetailsMapController,
    SystemModuleRoadSectionDetailsMapAMapController,
    SystemModuleRoadSectionDetailsMapPositionController,
    SystemModuleRoadSectionDetailsMapBusiness,
  ],
})
export class SystemModuleRoadSectionDetailsMapComponent
  implements OnChanges, OnInit, OnDestroy
{
  @Input() creating = false;
  @Input() editing = false;

  @Input() datas: GisPoint[] = [];
  @Output() create = new EventEmitter<[number, number][]>();
  @Output('change') _change = new EventEmitter<[number, number][]>();

  constructor(
    public controller: SystemModuleRoadSectionDetailsMapController,
    private business: SystemModuleRoadSectionDetailsMapBusiness
  ) {}

  private subscription = new Subscription();
  private load = {
    road: () => {
      this.business.road().then((datas) => {
        this.controller.road.load(datas).then((x) => {
          if (this.creating) {
            this.controller.map.focus(x);
          }
        });
      });
    },
  };
  ngOnInit(): void {
    this.controller.amap.creator.get().then((creator) => {
      let sub = creator.create.subscribe((x) => {
        this.create.emit(x);
      });
      this.subscription.add(sub);
    });
    this.controller.amap.editor.get().then((editor) => {
      let sub = editor.change.subscribe((x) => {
        this._change.emit(x);
      });
      this.subscription.add(sub);
    });

    this.load.road();
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
    this.controller.map.destroy();
  }
  ngOnChanges(changes: SimpleChanges): void {
    this.change.datas(changes['datas']);
    this.change.creating(changes['creating']);
    this.change.editing(changes['editing']);
  }

  change = {
    datas: (data: SimpleChange) => {
      if (data) {
        if (this.datas.length > 0) {
          this.controller.amap.load(this.datas).then((x) => {
            this.controller.map.focus(x);
          });
        }
      }
    },
    creating: (data: SimpleChange) => {
      if (data) {
        this.controller.amap.creator.get().then((creator) => {
          if (this.creating) {
            creator.open();
          } else {
            creator.clear();
            creator.close();
          }
        });
      }
    },
    editing: (data: SimpleChange) => {
      if (data) {
        this.controller.amap.editor.get().then((editor) => {
          if (this.editing) {
            editor.open();
          } else {
            editor.close();
          }
        });
      }
    },
  };
}
