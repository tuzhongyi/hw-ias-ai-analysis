import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { GlobalStorage } from '../../../../../common/storage/global.storage';
import { PathTool } from '../../../../../common/tools/path-tool/path.tool';
import { SystemPath } from '../../system.model';

@Component({
  selector: 'ias-system-task-index',
  imports: [CommonModule],
  templateUrl: './system-task-index.component.html',
  styleUrl: './system-task-index.component.less',
})
export class SystemTaskIndexComponent {
  constructor(private router: Router, private global: GlobalStorage) {}

  get display() {
    return this.global.display.task;
  }

  Path = PathTool;

  on = {
    shop: () => {
      this.router.navigateByUrl(SystemPath.task_shop);
    },
    gps: () => {
      this.router.navigateByUrl(SystemPath.task_gps);
    },
    road_object: () => {
      this.router.navigateByUrl(SystemPath.task_road_object);
    },
  };
}
