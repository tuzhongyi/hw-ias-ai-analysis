import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  ViewChild,
} from '@angular/core';
import {
  SystemStatisticRoadObjectMapStateColor,
  SystemStatisticRoadObjectMapStateItem,
} from './system-statistic-road-object-map-state-item.model';

@Component({
  selector: 'ias-system-statistic-road-object-map-state-item',
  imports: [CommonModule],
  templateUrl: './system-statistic-road-object-map-state-item.component.html',
  styleUrl: './system-statistic-road-object-map-state-item.component.less',
})
export class SystemStatisticRoadObjectMapStateItemComponent
  implements AfterViewInit
{
  @Input() data = new SystemStatisticRoadObjectMapStateItem();
  @Input() eventtype?: number;
  @Input() objecttype?: number;
  @Input() selected = false;

  @ViewChild('icon') icon?: ElementRef<HTMLDivElement>;

  ngAfterViewInit(): void {
    if (this.icon) {
      this.icon.nativeElement.insertAdjacentHTML('beforeend', this.data.icon);
      setTimeout(() => {
        this.color.normal.color = this.data.color;
        this.color.selected.color = this.data.color;
      }, 0);
    }
  }

  color = {
    normal: new SystemStatisticRoadObjectMapStateColor(false),
    selected: new SystemStatisticRoadObjectMapStateColor(true),
  };
}
