import { Injectable } from '@angular/core';
import { wait } from '../../../../../common/tools/wait';
import { PictureCanvasController } from './picture-canvas.controller';
import { PictureImageController } from './picture-image.controller';

@Injectable()
export class PictureController {
  image = new Controller<PictureImageController>();
  canvas = new Controller<PictureCanvasController>();
}

class Controller<T> {
  private _value?: T;
  get(): Promise<T> {
    return new Promise<T>((resolve) => {
      if (this._value) {
        resolve(this._value);
      } else {
        wait(
          () => {
            return !!this._value;
          },
          () => {
            if (this._value) {
              resolve(this._value);
            }
          }
        );
      }
    });
  }
  set(value: T): void {
    this._value = value;
  }
}
