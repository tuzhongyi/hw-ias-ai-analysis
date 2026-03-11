import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { GlobalStorage } from '../../../../../common/storage/global.storage';
import { SystemPath } from '../../system.model';

@Component({
  selector: 'ias-system-statistic-index',
  imports: [CommonModule],
  templateUrl: './system-statistic-index.component.html',
  styleUrl: './system-statistic-index.component.less',
})
export class SystemStatisticIndexComponent {
  constructor(private router: Router, private global: GlobalStorage) {}

  get display() {
    return this.global.display.module;
  }

  on = {
    road_object: () => {
      this.router.navigateByUrl(SystemPath.statistic_road_object);
    },
  };
}
