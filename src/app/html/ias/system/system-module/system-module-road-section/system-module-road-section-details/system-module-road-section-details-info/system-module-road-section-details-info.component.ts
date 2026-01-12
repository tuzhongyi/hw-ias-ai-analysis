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
import { ToastrService } from 'ngx-toastr';
import { HowellSelectComponent } from '../../../../../../../common/components/hw-select/select-control.component';
import { SelectMultipleComponent } from '../../../../../../../common/components/select-multiple/select-multiple.component';
import { RoadSection } from '../../../../../../../common/data-core/models/arm/geographic/road-section.model';
import { IIdNameModel } from '../../../../../../../common/data-core/models/model.interface';
import { TextSpaceBetweenDirective } from '../../../../../../../common/directives/text-space-between/text-space-between.directive';
import { wait } from '../../../../../../../common/tools/wait';
import { SystemModuleRoadSectionDetailsInfoBusiness } from './system-module-road-section-details-info.business';
import { SystemModuleRoadSectionDetailsInfoSource } from './system-module-road-section-details-info.source';

@Component({
  selector: 'ias-system-module-road-section-details-info',
  imports: [
    CommonModule,
    FormsModule,
    TextSpaceBetweenDirective,
    HowellSelectComponent,
    SelectMultipleComponent,
  ],
  templateUrl: './system-module-road-section-details-info.component.html',
  styleUrl: './system-module-road-section-details-info.component.less',
  providers: [
    SystemModuleRoadSectionDetailsInfoBusiness,
    SystemModuleRoadSectionDetailsInfoSource,
  ],
})
export class SystemModuleRoadSectionDetailsInfoComponent implements OnChanges {
  @Input('data') data = new RoadSection();
  @Output() dataChange = new EventEmitter<RoadSection>();

  constructor(
    private toastr: ToastrService,
    public source: SystemModuleRoadSectionDetailsInfoSource
  ) {}

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
    type: () => {
      if (this.data.SectionType != 1) {
        this.event.selected = [];
        this.data.EventTypes = [];
      }
      this.on.change();
    },
    change: () => {
      if (!this.data) {
        this.data = new RoadSection();
      }
      this.data = Object.assign(this.data, this.data);
      this.dataChange.emit(this.data);
    },
  };
}
