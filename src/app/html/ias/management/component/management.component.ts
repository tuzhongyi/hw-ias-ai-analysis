import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ConfigRequestService } from '../../../../common/data-core/requests/services/config/config.service';
import { GlobalStorage } from '../../../../common/storage/global.storage';
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
  constructor(
    private config: ConfigRequestService,
    private global: GlobalStorage,
  ) {}
  ngOnInit(): void {
    this.config.version.then((version) => {
      console.log(version);
      if (this.global.version !== version) {
        location.replace(window.location.href);
        return;
      }
    });
  }
}
