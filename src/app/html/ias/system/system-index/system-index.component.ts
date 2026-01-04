import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { CommonModule } from '@angular/common';
import { GlobalStorage } from '../../../../common/storage/global.storage';
import { SystemPath } from '../system.model';

@Component({
  selector: 'ias-system-index',
  imports: [CommonModule],
  templateUrl: './system-index.component.html',
  styleUrl: './system-index.component.less',
})
export class SystemIndexComponent {
  constructor(private router: Router, private global: GlobalStorage) {}
  Path = SystemPath;

  get display() {
    return this.global.display;
  }

  onpath(path: SystemPath) {
    this.router.navigateByUrl(path);
  }
}
