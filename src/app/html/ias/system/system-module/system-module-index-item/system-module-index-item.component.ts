import { Component, Input } from '@angular/core';

@Component({
  selector: 'ias-system-module-index-item',
  imports: [],
  templateUrl: './system-module-index-item.component.html',
  styleUrl: './system-module-index-item.component.less',
})
export class SystemModuleIndexItemComponent {
  @Input() name = '';
  @Input() icon: 'shop' | 'road' | 'gps' | 'analysis' = 'shop';
}
