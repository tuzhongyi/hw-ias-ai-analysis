import { Injectable } from '@angular/core';
import { AudioButtonComponent } from './audio-button.component';

@Injectable({
  providedIn: 'root',
})
export class AudioButtonService {
  private playing?: AudioButtonComponent;

  play(component: AudioButtonComponent): void {
    if (this.playing && this.playing !== component) {
      this.playing.stop(); // 调用其它组件的 stop
    }
    this.playing = component;
  }

  stop(component: AudioButtonComponent): void {
    if (this.playing === component) {
      this.playing = undefined;
    }
  }
}
