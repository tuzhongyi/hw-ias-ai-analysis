import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'ias-video-player-header',
  imports: [CommonModule],
  templateUrl: './video-player-header.component.html',
  styleUrl: './video-player-header.component.less',
})
export class VideoPlayerHeaderComponent {
  @Input() title = '';
  @Output() close = new EventEmitter<void>();

  on = {
    close: () => {
      this.close.emit();
    },
  };
}
