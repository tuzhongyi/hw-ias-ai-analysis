import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'ias-system-map-controls',
  imports: [],
  templateUrl: './system-map-controls.component.html',
  styleUrl: './system-map-controls.component.less',
})
export class SystemMapControlsComponent {
  @Input() distance = false;
  @Output() distanceChange = new EventEmitter<boolean>();

  @Input() source = false;
  @Output() sourceChange = new EventEmitter<boolean>();

  @Input() filter = false;
  @Output() filterChange = new EventEmitter<boolean>();

  ondsitance() {
    this.distance = !this.distance;
    this.distanceChange.emit(this.distance);
  }
  onsource() {
    this.source = !this.source;
    this.sourceChange.emit(this.source);
  }
  onfilter() {
    this.filter = !this.filter;
    this.filterChange.emit(this.filter);
  }
}
