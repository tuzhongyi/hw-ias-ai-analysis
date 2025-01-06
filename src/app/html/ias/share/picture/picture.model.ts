import { wait } from '../../../../common/tools/wait';

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
        wait(
          () => {
            return !!this._element;
          },
          () => {
            if (this._element) {
              resolve(this._element);
            }
          }
        );
      }
    });
  }
}
