import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
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
export class SystemModuleRoadSectionDetailsInfoComponent implements OnInit {
  @Input('data') data?: RoadSection;
  @Output() dataChange = new EventEmitter<RoadSection>();

  constructor(
    private toastr: ToastrService,
    public source: SystemModuleRoadSectionDetailsInfoSource
  ) {}

  model = new RoadSection();

  ngOnInit(): void {
    if (this.data) {
      this.model = Object.assign(this.model, this.data);
      this.event.load(this.model.EventTypes);
    }
  }

  get check() {
    if (!this.model.Name) {
      this.toastr.error('请输入道路名称');
      return false;
    }
    if (!this.model.GeoLine || this.model.GeoLine.length < 2) {
      this.toastr.error('请绘制道路线路');
      return false;
    }
    return true;
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
      this.model.EventTypes = items.map((x) => x.Id);
      this.on.change();
    },
  };

  on = {
    type: () => {
      if (this.model.SectionType != 1) {
        this.event.selected = [];
        this.model.EventTypes = [];
      }
      this.on.change();
    },
    change: () => {
      if (!this.data) {
        this.data = new RoadSection();
      }
      this.data = Object.assign(this.data, this.model);
      this.dataChange.emit(this.data);
    },
  };
}
