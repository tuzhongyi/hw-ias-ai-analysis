import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SystemMapShopRadiusArgs } from '../system-map/system-map.model';

@Component({
  selector: 'ias-system-map-editor-circle',
  imports: [FormsModule],
  templateUrl: './system-map-editor-circle.component.html',
  styleUrl: './system-map-editor-circle.component.less',
})
export class SystemMapEditorCircleComponent {
  @Input() args = new SystemMapShopRadiusArgs();
  @Output() ok = new EventEmitter<SystemMapShopRadiusArgs>();
  @Output() close = new EventEmitter<void>();

  onok() {
    this.ok.emit(this.args);
  }
  onclose() {
    this.close.emit();
  }
}
