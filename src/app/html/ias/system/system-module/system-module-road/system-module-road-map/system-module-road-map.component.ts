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
import { Road } from '../../../../../../common/data-core/models/arm/geographic/road.model';
import { SystemModuleRoadMapAMapController } from './controller/amap/system-module-road-map-amap.controller';
import { SystemModuleRoadMapPositionController } from './controller/system-module-road-map-position.controller';
import { SystemModuleRoadMapController } from './controller/system-module-road-map.controller';

@Component({
  selector: 'ias-system-module-road-map',
  imports: [CommonModule],
  templateUrl: './system-module-road-map.component.html',
  styleUrl: './system-module-road-map.component.less',
  providers: [
    SystemModuleRoadMapController,
    SystemModuleRoadMapAMapController,
    SystemModuleRoadMapPositionController,
  ],
})
export class SystemModuleRoadMapComponent
  implements OnChanges, OnInit, OnDestroy
{
  @Input() creating = false;
  @Input() editing = false;

  @Input() datas: Road[] = [];
  @Output() create = new EventEmitter<[number, number][]>();
  @Input() selected?: Road;
  @Output('change') _change = new EventEmitter<[number, number][]>();

  constructor(public controller: SystemModuleRoadMapController) {}

  private subscription = new Subscription();

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
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
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
