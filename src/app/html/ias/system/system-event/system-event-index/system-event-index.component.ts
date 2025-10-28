import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SystemPath } from '../../system.model';

@Component({
  selector: 'ias-system-event-index',
  imports: [],
  templateUrl: './system-event-index.component.html',
  styleUrl: './system-event-index.component.less',
})
export class SystemEventIndexComponent {
  constructor(private router: Router) {}

  on = {
    shop: () => {
      this.router.navigateByUrl(SystemPath.event_shop_manager);
    },
    realtime: () => {
      this.router.navigateByUrl(SystemPath.event_realtime_manager);
    },
    analysis: () => {
      this.router.navigateByUrl(SystemPath.event_analysis_manager);
    },
    task: () => {
      this.router.navigateByUrl(SystemPath.event_gps_task_manager);
    },
  };
}
