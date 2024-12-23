import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SystemPath } from '../system.model';

@Component({
  selector: 'ias-system-module',
  imports: [],
  templateUrl: './system-module.component.html',
  styleUrl: './system-module.component.less',
})
export class SystemModuleComponent {
  constructor(private router: Router) {}
  onshop() {
    this.router.navigateByUrl(SystemPath.module_shop);
  }
}
