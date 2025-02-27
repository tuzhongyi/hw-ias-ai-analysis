import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TextSpaceBetweenDirective } from '../../../../common/directives/text-space-between/text-space-between.directive';
import { SystemMapDistanceArgs } from '../system-map/system-map.model';

@Component({
  selector: 'ias-system-map-editor-circle',
  imports: [CommonModule, FormsModule, TextSpaceBetweenDirective],
  templateUrl: './system-map-editor-circle.component.html',
  styleUrl: './system-map-editor-circle.component.less',
})
export class SystemMapEditorCircleComponent implements OnInit {
  @Input() args = new SystemMapDistanceArgs();
  @Output() ok = new EventEmitter<SystemMapDistanceArgs>();
  @Output() close = new EventEmitter<void>();
  @Output() distance = new EventEmitter<number>();

  ngOnInit(): void {}

  ondistance() {
    if (this.args) {
      this.distance.emit(this.args.distance);
    }
  }

  onok() {
    this.ok.emit(this.args);
  }
  onclose() {
    this.close.emit();
  }
}
