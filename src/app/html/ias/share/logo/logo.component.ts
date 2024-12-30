import { Component, Input } from '@angular/core';

@Component({
  selector: 'ias-logo',
  imports: [],
  templateUrl: './logo.component.html',
  styleUrl: './logo.component.less',
})
export class LogoComponent {
  @Input() title = 'AI分析平台';
  @Input() subtitle = 'AI Analysis Platform';
}
