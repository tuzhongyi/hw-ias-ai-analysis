import { Point } from '../../../../../common/data-core/models/arm/point.model';

export class PictureImageController {
  src?: Promise<string>;

  constructor(private image: HTMLImageElement, zoom: boolean = false) {
    this.init(zoom);
  }

  _zoom = false;

  private polygon: Point[] = [];

  private init(zoom: boolean) {
    if (zoom) {
      this.image.style.cursor = 'zoom-in';
    }
  }

  load(url: string, polygon: Point[]) {
    this.src = Promise.resolve(url);
    this.image.src = url;
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
}
