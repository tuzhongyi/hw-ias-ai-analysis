import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'ias-system-map-controls',
  imports: [],
  templateUrl: './system-map-controls.component.html',
  styleUrl: './system-map-controls.component.less',
})
export class SystemMapControlsComponent {
  @Output() radius = new EventEmitter<void>();
  @Output() source = new EventEmitter<void>();
  @Output() filter = new EventEmitter<void>();
  onradius() {
    this.radius.emit();
  }
  onsource() {
    this.source.emit();
  }
  onfilter() {
    this.filter.emit();
  }
}
