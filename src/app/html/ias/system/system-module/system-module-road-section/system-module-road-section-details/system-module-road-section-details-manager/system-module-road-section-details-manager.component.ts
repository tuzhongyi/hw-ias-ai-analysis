import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SegmentWeekComponent } from '../../../../../../../common/components/segment/segment-week/segment-week.component';
import { RoadSection } from '../../../../../../../common/data-core/models/arm/geographic/road-section.model';
import { SystemModuleRoadSectionDetailsInfoComponent } from '../system-module-road-section-details-info/system-module-road-section-details-info.component';
import { SystemModuleRoadSectionDetailsMapComponent } from '../system-module-road-section-details-map/system-module-road-section-details-map.component';

@Component({
  selector: 'ias-system-module-road-section-details-manager',
  imports: [
    CommonModule,
    FormsModule,
    SystemModuleRoadSectionDetailsMapComponent,
    SystemModuleRoadSectionDetailsInfoComponent,
    SegmentWeekComponent,
  ],
  templateUrl: './system-module-road-section-details-manager.component.html',
  styleUrl: './system-module-road-section-details-manager.component.less',
})
export class SystemModuleRoadSectionDetailsManagerComponent implements OnInit {
  @Input() data?: RoadSection;
  @Input()
  ngOnInit(): void {
    if (!this.data) {
      this.data = this.init();
    }
  }

  private init() {
    let data = new RoadSection();
    data.Raduis = 30;
    data.SectionType = 0;
    return data;
  }

  on = {
    change: () => {
      console.log(this.data);
    },
    ok: () => {},
    cancel: () => {},
  };
}
