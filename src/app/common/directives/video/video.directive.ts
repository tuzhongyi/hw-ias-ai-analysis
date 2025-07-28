import { Directive, ElementRef } from '@angular/core';

@Directive({ selector: '[video-directive]' })
export class VideoDirective {
  constructor(private e: ElementRef<HTMLVideoElement>) {}

  pause() {
    this.nativeElement.pause();
  }
  play() {
    this.nativeElement.play();
  }

  get currentTime() {
    return this.nativeElement.currentTime;
  }

  get nativeElement() {
    return this.e.nativeElement;
  }
}
