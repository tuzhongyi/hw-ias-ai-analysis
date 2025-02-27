import { Component, OnInit } from '@angular/core';
import { DateTimeControlComponent } from '../../../../common/components/date-time-control/date-time-control.component';
import { ManagementSystemMaintainLogBusiness } from './management-system-maintain-log.business';

@Component({
  selector: 'ias-management-system-maintain-log',
  imports: [DateTimeControlComponent],
  templateUrl: './management-system-maintain-log.component.html',
  styleUrl: './management-system-maintain-log.component.less',
  providers: [ManagementSystemMaintainLogBusiness],
})
export class ManagementSystemMaintainLogComponent implements OnInit {
  constructor(private business: ManagementSystemMaintainLogBusiness) {}

  data: string = '';

  date = new Date();

  ngOnInit(): void {}

  private load(date: Date) {
    this.business.load(date).then((x) => {
      let content = x.replace(/\n/g, '<br />');
      this.data = content.replace(
        /\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}.\d+ \+\d{2}:\d{2} \[\w+\]/g,
        (matching, index) => {
          let status = matching.match(/Information|Warning|Error/) ?? '';
          return `<div class="time ${status[0]}">${matching}</div>`;
        }
      );
    });
  }

  onsearch() {
    this.load(this.date);
  }
  ondownload() {
    this.business.download(this.date);
  }
}
