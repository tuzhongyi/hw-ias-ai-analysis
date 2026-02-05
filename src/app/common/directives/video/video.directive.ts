import { Directive, ElementRef, Input, OnDestroy, OnInit } from '@angular/core';

@Directive({ selector: '[video-directive]' })
export class VideoDirective implements OnInit, OnDestroy {
  @Input() keycontrol = false;
  constructor(private e: ElementRef<HTMLVideoElement>) {
    this.playing = !!e.nativeElement.getAttribute('autoplay');
  }

  playing = false;

  pause() {
    this.nativeElement.pause();
    this.playing = false;
  }
  play() {
    this.nativeElement.play();
    this.playing = true;
  }

  get controls() {
    return this.nativeElement.controls;
  }
  set controls(value: boolean) {
    this.nativeElement.controls = value;
  }

  get currentTime() {
    return this.nativeElement.currentTime;
  }

  get nativeElement() {
    return this.e.nativeElement;
  }

  private handle: { keypress?: any } = {};

  ngOnInit(): void {
    if (this.keycontrol) {
      this.regist();
    }
  }
  ngOnDestroy(): void {
    if (this.handle.keypress) {
      window.removeEventListener('keydown', this.handle.keypress);
      this.handle.keypress = undefined;
    }
  }

  private regist() {
    this.handle.keypress = this.on.key.press;
    window.addEventListener('keydown', this.handle.keypress);
  }

  async capture() {
    return new Promise<VideoCaptureModel>((resolve) => {
      let canvas = document.createElement('canvas');
      canvas.width = this.nativeElement.clientWidth;
      canvas.height = this.nativeElement.clientHeight;
      let context = canvas.getContext('2d') as CanvasRenderingContext2D;
      context.drawImage(this.nativeElement, 0, 0, canvas.width, canvas.height);
      let src = canvas.toDataURL('image/png');
      this.pause();
      canvas.toBlob((blob) => {
        if (blob) {
          blob.arrayBuffer().then((buffer) => {
            resolve({ src, buffer });
          });
        }
      });
    });
  }

  on = {
    key: {
      press: (e: KeyboardEvent) => {
        if (e.target instanceof HTMLInputElement) {
          return;
        }

        let time = this.currentTime;
        switch (e.code) {
          case 'Space':
            if (this.playing) {
              this.pause();
            } else {
              this.play();
            }
            break;
          case 'ArrowLeft':
            if (this.playing) {
              this.pause();
            }

            if (time != undefined) {
              time -= 1 / 4;
              this.nativeElement.currentTime = time;
            }

            break;
          case 'ArrowRight':
            if (this.playing) {
              this.pause();
            }
            if (time != undefined) {
              time += 1 / 4;
              this.nativeElement.currentTime = time;
            }
            break;

          default:
            break;
        }
      },
    },
  };
}

export interface VideoCaptureModel {
  src: string;
  buffer: ArrayBuffer;
}
