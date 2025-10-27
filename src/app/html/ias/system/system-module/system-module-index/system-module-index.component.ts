import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SystemPath } from '../../system.model';

@Component({
  selector: 'ias-system-module-index',
  imports: [],
  templateUrl: './system-module-index.component.html',
  styleUrl: './system-module-index.component.less',
})
export class SystemModuleIndexComponent {
  constructor(private router: Router) {}
  onshop() {
    this.router.navigateByUrl(SystemPath.module_shop);
  }
  onroad() {
    this.router.navigateByUrl(SystemPath.module_road);
  }
  onregistration() {
    this.router.navigateByUrl(SystemPath.module_shop_registration);
  }
  oncompare() {
    this.router.navigateByUrl(SystemPath.module_shop_compare);
  }
  ongpstask() {
    this.router.navigateByUrl(SystemPath.module_gps_task);
  }
}
