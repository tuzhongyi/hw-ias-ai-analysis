import { Component, EventEmitter, Output } from '@angular/core';
import { FactoryResetMode } from '../../../../common/data-core/enums/factory-reset-mode.enum';

@Component({
  selector: 'ias-management-system-maintain-config-factory',
  imports: [],
  templateUrl: './management-system-maintain-config-factory.component.html',
  styleUrl: './management-system-maintain-config-factory.component.less',
})
export class ManagementSystemMaintainConfigFactoryComponent {
  @Output() reset = new EventEmitter<FactoryResetMode>();

  Mode = FactoryResetMode;

  onreset(mode: FactoryResetMode) {
    this.reset.emit(mode);
  }
}
