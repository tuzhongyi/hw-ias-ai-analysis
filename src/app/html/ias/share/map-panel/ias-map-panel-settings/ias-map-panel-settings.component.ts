import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ContainerExpandCornerComponent } from '../../../../../common/components/container-expand-corner/container-expand-corner.component';

@Component({
  selector: 'ias-map-panel-settings',
  imports: [CommonModule, FormsModule, ContainerExpandCornerComponent],
  templateUrl: './ias-map-panel-settings.component.html',
  styleUrl: './ias-map-panel-settings.component.less',
})
export class IASMapPanelSettingsComponent {
  @Input() rectified: boolean = false;
  @Output() rectifiedChange = new EventEmitter<boolean>();
  @Input() top = true;
  @Input() left = false;

  on = {
    rectified: () => {
      this.rectifiedChange.emit(this.rectified);
    },
  };
}
