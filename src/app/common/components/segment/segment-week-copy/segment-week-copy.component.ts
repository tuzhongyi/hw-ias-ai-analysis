import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { WindowComponent } from '../../../../html/ias/share/window/component/window.component';
import { Language } from '../../../tools/language-tool/language';
import { WindowViewModel } from '../../window-control/window.model';

@Component({
  selector: 'ias-segment-week-copy',
  imports: [CommonModule, FormsModule, WindowComponent],
  templateUrl: './segment-week-copy.component.html',
  styleUrl: './segment-week-copy.component.less',
})
export class SegmentWeekCopyComponent {
  @Input() model = new WindowViewModel();
  @Input() week: number = 1;
  @Output() select = new EventEmitter<number[]>();
  @Output() close = new EventEmitter<void>();
  @Input() style = { width: '300px', height: 'auto' };

  selected: number[] = [];

  weeks = [1, 2, 3, 4, 5, 6, 0];
  Language = Language;

  on = {
    all: () => {
      this.selected = [];
      for (let i = 0; i < this.weeks.length; i++) {
        const week = this.weeks[i];
        if (week === this.week) continue;
        this.selected.push(week);
      }
    },
    copy: () => {
      this.select.emit(this.selected);
    },
    week: (week: number) => {
      let index = this.selected.indexOf(week);
      if (index < 0) {
        this.selected.push(week);
      } else {
        this.selected.splice(index, 1);
      }
    },
    close: () => {
      this.close.emit();
    },
  };
}
