import { wait } from '../tools/wait';

export class PromiseValue<T> {
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
