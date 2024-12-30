import { Component, OnInit } from '@angular/core';
import { LogoComponent } from '../../share/logo/logo.component';
import { SettingsComponent } from '../../share/settings/settings.component';

import { SystemBreadcrumbComponent } from '../system-breadcrumb/system-breadcrumb.component';

@Component({
  selector: 'ias-system-head',
  imports: [LogoComponent, SettingsComponent, SystemBreadcrumbComponent],
  templateUrl: './system-head.component.html',
  styleUrl: './system-head.component.less',
})
export class SystemHeadComponent implements OnInit {
  constructor() {}
  ngOnInit(): void {}
}
