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
import { RoadSection } from '../../../../../../common/data-core/models/arm/geographic/road-section.model';
import { SystemModuleRoadSectionMapAMapController } from './controller/amap/system-module-road-section-map-amap.controller';
import { SystemModuleRoadSectionMapPositionController } from './controller/system-module-road-section-map-position.controller';
import { SystemModuleRoadSectionMapController } from './controller/system-module-road-section-map.controller';
import { SystemModuleRoadSectionMapBusiness } from './system-module-road-section-map.business';

@Component({
  selector: 'ias-system-module-road-section-map',
  imports: [CommonModule],
  templateUrl: './system-module-road-section-map.component.html',
  styleUrl: './system-module-road-section-map.component.less',
  providers: [
    SystemModuleRoadSectionMapController,
    SystemModuleRoadSectionMapAMapController,
    SystemModuleRoadSectionMapPositionController,
    SystemModuleRoadSectionMapBusiness,
  ],
})
export class SystemModuleRoadSectionMapComponent
  implements OnChanges, OnInit, OnDestroy
{
  @Input() creating = false;
  @Input() editing = false;

  @Input() datas: RoadSection[] = [];
  @Output() create = new EventEmitter<[number, number][]>();
  @Input() selected?: RoadSection;
  @Output('change') _change = new EventEmitter<[number, number][]>();

  constructor(
    public controller: SystemModuleRoadSectionMapController,
    private business: SystemModuleRoadSectionMapBusiness
  ) {}

  private subscription = new Subscription();
  private load = {
    road: () => {
      this.business.road().then((datas) => {
        this.controller.road.load(datas);
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
    this.change.selected(changes['selected']);
    this.change.editing(changes['editing']);
  }

  change = {
    datas: (data: SimpleChange) => {
      if (data && !data.firstChange) {
        this.controller.amap.load(this.datas);
      }
    },
    selected: (data: SimpleChange) => {
      if (data && !data.firstChange) {
        if (this.selected) {
          this.controller.amap.select(this.selected.Id);
        } else {
          this.controller.amap.blur();
          this.controller.amap.focus();
        }
      }
    },
    creating: (data: SimpleChange) => {
      if (data && !data.firstChange) {
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
      if (data && !data.firstChange) {
        this.controller.amap.editor.get().then((editor) => {
          if (this.editing && this.selected) {
            editor.open(this.selected.Id);
          } else {
            editor.close();
          }
        });
      }
    },
  };
}
