import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { SystemPath } from '../system.model';

@Component({
  selector: 'ias-system-index',
  imports: [],
  templateUrl: './system-index.component.html',
  styleUrl: './system-index.component.less',
})
export class SystemIndexComponent {
  constructor(private router: Router) {}
  Path = SystemPath;

  onpath(path: SystemPath) {
    this.router.navigateByUrl(path);
  }
}
