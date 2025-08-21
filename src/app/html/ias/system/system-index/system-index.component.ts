import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { CommonModule } from '@angular/common';
import { SystemPath } from '../system.model';
import { SystemIndexBusiness } from './system-index.business';

@Component({
  selector: 'ias-system-index',
  imports: [CommonModule],
  templateUrl: './system-index.component.html',
  styleUrl: './system-index.component.less',
  providers: [SystemIndexBusiness],
})
export class SystemIndexComponent {
  constructor(private router: Router, private business: SystemIndexBusiness) {
    this.init();
  }
  Path = SystemPath;

  display = {
    task: false,
    module: false,
    map: true,
    record: true,
  };

  private init() {
    this.business.get().then((user) => {
      if (user) {
        if (user.Priorities && user.Priorities.length > 0) {
          if (user.Priorities.includes('1')) {
            this.display.task = true;
            this.display.module = true;
          }
        }
      }
    });
  }

  onpath(path: SystemPath) {
    this.router.navigateByUrl(path);
  }
}
