import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'ias-content-header-tab',
  imports: [CommonModule],
  templateUrl: './content-header-tab.component.html',
  styleUrl: './content-header-tab.component.less',
})
export class ContentHeaderTabComponent {
  @Input() titles: string[] = [];
  @Input() padding = '';
  @Input() selected = 0;
  @Output() selectedChange = new EventEmitter<number>();

  onselect(index: number) {
    this.selected = index;
    this.selectedChange.emit(this.selected);
  }
}
