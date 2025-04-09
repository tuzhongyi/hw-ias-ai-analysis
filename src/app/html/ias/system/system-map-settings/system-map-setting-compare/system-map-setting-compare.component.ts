import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { SystemMapTaskArgs } from '../../system-map/business/task/system-map-task.model';
import { SystemMapSettingCompareBaseController } from './controller/system-map-setting-compare-base.controller';
import { SystemMapSettingCompareRegistrationController } from './controller/system-map-setting-compare-registration.controller';

@Component({
  selector: 'ias-system-map-setting-compare',
  imports: [CommonModule, FormsModule],
  templateUrl: './system-map-setting-compare.component.html',
  styleUrl: './system-map-setting-compare.component.less',
  providers: [
    SystemMapSettingCompareBaseController,
    SystemMapSettingCompareRegistrationController,
  ],
})
export class SystemMapSettingCompareComponent {
  get taskcount(): number {
    return this.base.max;
  }
  @Input() set taskcount(v: number) {
    this.base.max = v;
  }

  @Input() args? = new SystemMapTaskArgs();
  @Output() argsChange = new EventEmitter<SystemMapTaskArgs>();
  @Output() close = new EventEmitter<void>();

  constructor(
    public base: SystemMapSettingCompareBaseController,
    public registration: SystemMapSettingCompareRegistrationController
  ) {}

  onclose() {
    this.close.emit();
  }
  onreset() {
    this.base.reset();
    this.registration.reset();
  }
}
