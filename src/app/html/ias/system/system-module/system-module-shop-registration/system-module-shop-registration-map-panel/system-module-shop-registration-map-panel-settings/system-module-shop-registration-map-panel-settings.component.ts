import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ContainerExpandCornerComponent } from '../../../../../../../common/components/container-expand-corner/container-expand-corner.component';

@Component({
  selector: 'ias-system-module-shop-registration-map-panel-settings',
  imports: [CommonModule, FormsModule, ContainerExpandCornerComponent],
  templateUrl:
    './system-module-shop-registration-map-panel-settings.component.html',
  styleUrl:
    './system-module-shop-registration-map-panel-settings.component.less',
})
export class SystemModuleShopRegistrationMapPanelSettingsComponent {
  @Input() top = true;
  @Input() left = false;
  @Input() draggable = false;
  @Output() draggableChange = new EventEmitter<boolean>();
  @Input() removable = false;
  @Output() removableChange = new EventEmitter<boolean>();

  on = {
    draggable: () => {
      this.draggableChange.emit(this.draggable);
    },
    removable: () => {
      this.removableChange.emit(this.removable);
    },
  };
}
