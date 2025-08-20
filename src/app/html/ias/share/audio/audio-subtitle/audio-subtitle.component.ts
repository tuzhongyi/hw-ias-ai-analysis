import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'ias-audio-subtitle',
  imports: [CommonModule],
  templateUrl: './audio-subtitle.component.html',
  styleUrl: './audio-subtitle.component.less',
})
export class AudioSubtitleComponent {
  @Input() text?: string = '';
  @Input() progress: number = 0;
}
