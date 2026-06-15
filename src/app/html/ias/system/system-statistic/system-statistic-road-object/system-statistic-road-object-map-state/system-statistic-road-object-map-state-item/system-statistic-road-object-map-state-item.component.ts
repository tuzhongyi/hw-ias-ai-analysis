import { CommonModule } from '@angular/common';
import {
  Component,
  ElementRef,
  Input,
  OnChanges,
  SimpleChange,
  SimpleChanges,
  ViewChild,
} from '@angular/core';

import { wait } from '../../../../../../../common/tools/wait';
import { SystemStatisticRoadObjectMapStateItem } from './system-statistic-road-object-map-state-item.model';

@Component({
  selector: 'ias-system-statistic-road-object-map-state-item',
  imports: [CommonModule],
  templateUrl: './system-statistic-road-object-map-state-item.component.html',
  styleUrl: './system-statistic-road-object-map-state-item.component.less',
})
export class SystemStatisticRoadObjectMapStateItemComponent implements OnChanges {
  @Input() data = new SystemStatisticRoadObjectMapStateItem();

  @Input() selected = false;

  constructor() {}

  @ViewChild('container') container?: ElementRef<HTMLDivElement>;

  private change = {
    data: (change: SimpleChange) => {
      if (change) {
        if (this.data) {
          let element: HTMLDivElement;
          wait(() => {
            if (this.container && this.container.nativeElement) {
              element = this.container?.nativeElement;
              return true;
            }

            return false;
          }).then(() => {
            if (typeof this.data.color === 'string') {
              element.classList.add(this.data.color);
            } else {
              element.classList.add(`color-r-${this.data.color.r}`);
              element.classList.add(`color-g-${this.data.color.g}`);
              element.classList.add(`color-b-${this.data.color.b}`);
            }
          });
        }
      }
    },
  };

  ngOnChanges(changes: SimpleChanges): void {
    this.change.data(changes['data']);
  }
}
