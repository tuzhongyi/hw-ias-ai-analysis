import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'ias-management-system-maintain-config-power',
  imports: [],
  templateUrl: './management-system-maintain-config-power.component.html',
  styleUrl: './management-system-maintain-config-power.component.less',
})
export class ManagementSystemMaintainConfigPowerComponent {
  @Output() reboot = new EventEmitter<void>();
  @Output() shutdown = new EventEmitter<void>();

  onreboot() {
    this.reboot.emit();
  }

  onshutdown() {
    this.shutdown.emit();
  }
}
