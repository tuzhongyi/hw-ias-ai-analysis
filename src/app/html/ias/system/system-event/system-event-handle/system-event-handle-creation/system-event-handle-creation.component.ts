import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'ias-system-event-handle-creation',
  imports: [CommonModule, FormsModule],
  templateUrl: './system-event-handle-creation.component.html',
  styleUrl: './system-event-handle-creation.component.less',
})
export class SystemEventHandleCreationComponent {
  @Input() name = '';

  @Input() is = false;
  @Output() isChange = new EventEmitter<boolean>();

  @Output() ok = new EventEmitter<boolean>();
  @Output() cancel = new EventEmitter<void>();

  onmain() {
    this.is = false;
  }
  onsub() {
    this.is = true;
  }
  onok() {
    this.ok.emit(this.is);
  }
  oncancel() {
    this.cancel.emit();
  }
}
