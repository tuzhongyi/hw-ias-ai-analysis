import { EventEmitter } from '@angular/core';
import { SafeResourceUrl } from '@angular/platform-browser';

export class SystemTaskFileDetailsVideoController {
  current = 0;
  time = new EventEmitter<number>();

  src?: SafeResourceUrl;

  constructor(private video: HTMLVideoElement) {}

  play(src: string) {}
}
