import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SystemPath } from '../../system.model';

@Component({
  selector: 'ias-system-task-index',
  imports: [],
  templateUrl: './system-task-index.component.html',
  styleUrl: './system-task-index.component.less',
})
export class SystemTaskIndexComponent {
  constructor(private router: Router) {}

  on = {
    shop: () => {
      this.router.navigateByUrl(SystemPath.task_shop);
    },
    gps: () => {
      this.router.navigateByUrl(SystemPath.task_gps);
    },
  };
}
