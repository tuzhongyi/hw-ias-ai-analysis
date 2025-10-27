import { HowellPoint } from '../../../../../common/data-core/models/arm/point.model';
import { wait } from '../../../../../common/tools/wait';

export class PictureElement<T> {
  set(e: T) {
    this._element = e;
  }

  private _element?: T;
  get(): Promise<T> {
    return new Promise<T>((resolve) => {
      if (this._element) {
        resolve(this._element);
      } else {
        wait(() => {
          return !!this._element;
        }).then(() => {
          if (this._element) {
            resolve(this._element);
          }
        });
      }
    });
  }
}

export interface IPictureModel {
  src?: string;
  id?: string;
  polygon?: HowellPoint[][];
  zoom?: boolean;
}
