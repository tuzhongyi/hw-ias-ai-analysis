import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { SystemMainMapStateItem } from './system-main-map-state-item.model';

@Component({
  selector: 'ias-system-main-map-state-item',
  imports: [CommonModule],
  templateUrl: './system-main-map-state-item.component.html',
  styleUrl: './system-main-map-state-item.component.less',
})
export class SystemMainMapStateItemComponent {
  @Input() data = new SystemMainMapStateItem<number>(0);
}
