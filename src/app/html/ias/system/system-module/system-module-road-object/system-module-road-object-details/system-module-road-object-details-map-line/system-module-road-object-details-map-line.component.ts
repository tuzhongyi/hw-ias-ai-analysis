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
import { SystemModuleRoadObjectDetailsMapLineController } from './controller/system-module-road-object-details-map-line.controller';

@Component({
  selector: 'ias-system-module-road-object-details-map-line',
  imports: [CommonModule],
  templateUrl: './system-module-road-object-details-map-line.component.html',
  styleUrl: './system-module-road-object-details-map-line.component.less',
})
export class SystemModuleRoadObjectDetailsMapLineComponent
  implements OnChanges, OnInit, OnDestroy
{
  @Input() creating = false;
  @Input() editing = false;

  @Input() datas: GisPoint[] = [];
  @Output() create = new EventEmitter<[number, number][]>();
  @Output('change') _change = new EventEmitter<[number, number][]>();

  constructor() {}

  private subscription = new Subscription();
  private controller = new SystemModuleRoadObjectDetailsMapLineController();
  get position() {
    return this.controller.position;
  }

  ngOnInit(): void {
    this.controller.creator.get().then((creator) => {
      let sub = creator.create.subscribe((x) => {
        this.create.emit(x);
      });
      this.subscription.add(sub);
    });
    this.controller.editor.get().then((editor) => {
      let sub = editor.change.subscribe((x) => {
        this._change.emit(x);
      });
      this.subscription.add(sub);
    });
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
          this.load(this.datas);
        }
      }
    },
    creating: (data: SimpleChange) => {
      if (data) {
        this.controller.creator.get().then((creator) => {
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
        // this.controller.editor.get().then((editor) => {
        //   if (this.editing) {
        //     editor.open();
        //   } else {
        //     editor.close();
        //   }
        // });
      }
    },
  };
  index = 0;
  private async load(datas: GisPoint[]) {
    let editor = await this.controller.editor.get();
    editor.close();
    await this.controller.clear();

    let polyline = await this.controller.load(datas);
    if (!this.index) {
      this.controller.map.focus(polyline);
    }
    editor.open();
    this.index++;
  }
}
