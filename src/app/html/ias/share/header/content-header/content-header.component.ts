import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'ias-content-header',
  imports: [CommonModule],
  templateUrl: './content-header.component.html',
  styleUrl: './content-header.component.less',
})
export class ContentHeaderComponent {
  @Input() title: string = '';
  @Input() padding = '';
}
