import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChange,
  SimpleChanges,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HowellSelectComponent } from '../../../../../../../common/components/hw-select/select-control.component';
import { SelectMultipleComponent } from '../../../../../../../common/components/select-multiple/select-multiple.component';
import { RoadArea } from '../../../../../../../common/data-core/models/arm/geographic/road-area.model';
import { IIdNameModel } from '../../../../../../../common/data-core/models/interface/model.interface';
import { TextSpaceBetweenDirective } from '../../../../../../../common/directives/text-space-between/text-space-between.directive';
import { wait } from '../../../../../../../common/tools/wait';
import { SystemModuleRoadAreaDetailsInfoSource } from './system-module-road-area-details-info.source';

@Component({
  selector: 'ias-system-module-road-area-details-info',
  imports: [
    CommonModule,
    FormsModule,
    TextSpaceBetweenDirective,
    HowellSelectComponent,
    SelectMultipleComponent,
  ],
  templateUrl: './system-module-road-area-details-info.component.html',
  styleUrl: './system-module-road-area-details-info.component.less',
  providers: [SystemModuleRoadAreaDetailsInfoSource],
})
export class SystemModuleRoadAreaDetailsInfoComponent implements OnChanges {
  @Input('data') data = new RoadArea();
  @Output() dataChange = new EventEmitter<RoadArea>();

  constructor(public source: SystemModuleRoadAreaDetailsInfoSource) {}

  private change = {
    data: (simple: SimpleChange) => {
      if (simple) {
        this.event.load(this.data.EventTypes);
      }
    },
  };

  ngOnChanges(changes: SimpleChanges): void {
    this.change.data(changes['data']);
  }

  event = {
    selected: [] as IIdNameModel<number>[],
    load: async (types?: number[]) => {
      wait(() => this.source.events.length > 0).then(() => {
        if (types) {
          this.event.selected = [];
          for (let i = 0; i < types.length; i++) {
            const type = types[i];
            let item = this.source.events.find((x) => x.Id == type);
            if (item) {
              this.event.selected.push(item);
            }
          }
        }
      });
    },
    change: (items: IIdNameModel<number>[]) => {
      this.data.EventTypes = items.map((x) => x.Id);
      this.on.change();
    },
  };

  on = {
    change: () => {
      if (!this.data) {
        this.data = new RoadArea();
      }
      this.data = Object.assign(this.data, this.data);
      this.dataChange.emit(this.data);
    },
  };
}
