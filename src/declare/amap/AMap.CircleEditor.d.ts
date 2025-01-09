declare namespace AMap {
  class CircleEditor {
    constructor(...opts: any);
    open(): void;
    close(): void;
    on(event: string, cb: Function): void;
  }
}
