import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PatrolSection } from '../../../../../../common/data-core/models/arm/geographic/patrol/patrol-section.model';
import { GeoPolyline } from '../../../../../../common/tools/geo-tool/geo.model';

@Component({
  selector: 'ias-system-module-patrol-section-info',
  imports: [CommonModule, FormsModule],
  templateUrl: './system-module-patrol-section-info.component.html',
  styleUrl: './system-module-patrol-section-info.component.less',
})
export class SystemModulePatrolSectionInfoComponent {
  @Input('data') source?: PatrolSection;
  @Output() dataChange = new EventEmitter<PatrolSection>();
  @Input() lines: GeoPolyline = [];

  @Output() ok = new EventEmitter<PatrolSection>();

  data = this.init();

  private init() {
    let data = new PatrolSection();
    data.Id = '';
    data.GeoLine = [];
    return data;
  }

  on = {
    ok: () => {},
    cancel: () => {},
  };
}
