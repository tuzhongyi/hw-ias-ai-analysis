import { HowellPoint } from '../../../../../common/data-core/models/arm/point.model';

export class PictureImageController {
  constructor(public image: HTMLImageElement, zoom: boolean = false) {
    this.init(zoom);
  }

  _zoom = false;

  private polygon: HowellPoint[] = [];

  private init(zoom: boolean) {
    if (zoom) {
      this.image.style.cursor = 'zoom-in';
    }
  }

  _load(url: string) {
    return new Promise<string>((resolve) => {
      let img = new Image();

      img.onload = (x) => {
        let target = x.target as HTMLImageElement;
        resolve(target.src);
      };
      img.onerror = (error) => {
        resolve(
          'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsIAAA7CARUoSoAAAAANSURBVBhXY2BgYPgPAAEEAQBwIGULAAAAAElFTkSuQmCC'
        );
      };
      img.src = url;
    });
  }

  async load(url: string, polygon: HowellPoint[]) {
    this.image.src = await this._load(url);
    this.polygon = polygon;
  }

  private async zoomin() {
    this.image.style.cursor = 'zoom-out';

    let x_array = this.polygon.map((point) => point.X);
    let x = Math.min(...x_array);
    let y_array = this.polygon.map((point) => point.Y);
    let y = Math.min(...y_array);

    let width = Math.max(0, ...x_array) - x;
    let _width = this.image.offsetWidth / width;
    let height = Math.max(0, ...y_array) - y;
    let _height = this.image.offsetHeight / height;

    this.image.style.width = `${_width}px`;
    this.image.style.height = `${_height}px`;

    let position = [`-${x * _width}px`, `-${y * _height}px`];

    this.image.style.objectPosition = position.join(' ');
  }
  private async zoomout() {
    this.image.style.cursor = 'zoom-in';
    this.image.style.objectPosition = '';
    this.image.style.width = '';
    this.image.style.height = '';
  }

  zoom() {
    this._zoom = !this._zoom;
    if (this._zoom) {
      this.zoomin();
    } else {
      this.zoomout();
    }
    return this._zoom;
  }

  onerror() {
    this.image.src =
      'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsIAAA7CARUoSoAAAAANSURBVBhXY2BgYPgPAAEEAQBwIGULAAAAAElFTkSuQmCC';
  }
}
