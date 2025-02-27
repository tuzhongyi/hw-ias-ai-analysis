import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LogoComponent } from '../../share/logo/logo.component';
import { SettingsComponent } from '../../share/settings/settings.component';
import { ManagementNavigationComponent } from '../management-navigation/management-navigation.component';

@Component({
  selector: 'ias-management',
  imports: [
    RouterOutlet,
    LogoComponent,
    SettingsComponent,
    // ManagementBreadcrumbComponent,
    ManagementNavigationComponent,
  ],
  templateUrl: './management.component.html',
  styleUrl: './management.component.less',
})
export class ManagementComponent implements OnInit {
  ngOnInit(): void {}
}
