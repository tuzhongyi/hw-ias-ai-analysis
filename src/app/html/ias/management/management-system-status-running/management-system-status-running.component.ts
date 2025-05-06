import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { RunningStatus } from '../../../../common/data-core/models/arm/running-status.model';
import { Language } from '../../../../common/tools/language-tool/language';
import { ManagementSystemStatusRunningBusiness } from './management-system-status-running.business';

@Component({
  selector: 'ias-management-system-status-running',
  imports: [CommonModule],
  templateUrl: './management-system-status-running.component.html',
  styleUrl: './management-system-status-running.component.less',
  providers: [ManagementSystemStatusRunningBusiness],
})
export class ManagementSystemStatusRunningComponent
  implements OnInit, OnDestroy
{
  constructor(private business: ManagementSystemStatusRunningBusiness) {}

  data?: RunningStatus;
  private handle?: NodeJS.Timeout;

  Language = Language;

  ngOnInit(): void {
    this.load();
    this.keep();
  }
  ngOnDestroy(): void {
    if (this.handle) {
      clearTimeout(this.handle);
    }
  }

  private keep() {
    this.handle = setTimeout(() => {
      this.load();
      this.keep();
    }, 1000);
  }

  private load() {
    this.business.load().then((x) => {
      this.data = x;
    });
  }
}
