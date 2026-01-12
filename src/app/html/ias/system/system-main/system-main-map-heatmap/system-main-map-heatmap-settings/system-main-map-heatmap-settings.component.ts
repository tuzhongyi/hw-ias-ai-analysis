import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ContainerExpandCornerComponent } from '../../../../../../common/components/container-expand-corner/container-expand-corner.component';

@Component({
  selector: 'ias-system-main-map-heatmap-settings',
  imports: [CommonModule, FormsModule, ContainerExpandCornerComponent],
  templateUrl: './system-main-map-heatmap-settings.component.html',
  styleUrl: './system-main-map-heatmap-settings.component.less',
})
export class SystemMainMapHeatmapSettingsComponent {
  @Input() textable: boolean = false;
  @Output() textableChange = new EventEmitter<boolean>();
  @Input() top = true;
  @Input() left = false;

  on = {
    textable: () => {
      this.textableChange.emit(this.textable);
    },
  };
}
