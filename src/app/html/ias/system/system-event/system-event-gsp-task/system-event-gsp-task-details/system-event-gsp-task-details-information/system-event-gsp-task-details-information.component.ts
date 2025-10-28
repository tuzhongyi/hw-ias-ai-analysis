import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { GpsTaskSampleRecord } from '../../../../../../../common/data-core/models/arm/analysis/llm/gps-task-sample-record.model';
import { Language } from '../../../../../../../common/tools/language-tool/language';

@Component({
  selector: 'ias-system-event-gsp-task-details-information',
  imports: [CommonModule, FormsModule],
  templateUrl: './system-event-gsp-task-details-information.component.html',
  styleUrl: './system-event-gsp-task-details-information.component.less',
})
export class SystemEventGspTaskDetailsInformationComponent implements OnInit {
  @Input() data = new GpsTaskSampleRecord();

  Language = Language;

  ngOnInit(): void {
    console.log(this.data);
  }
}
