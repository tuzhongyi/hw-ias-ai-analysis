import { Injectable } from '@angular/core';
import { Point } from '../../../../../common/data-core/models/arm/point.model';
import { PointTool } from '../../../../../common/tools/map-tool/point.tool';

@Injectable()
export class SystemModuleShopDetailsInfoImageController {
  init(picture: HTMLDivElement, canvas: HTMLCanvasElement) {
    this.element = { canvas, picture };
    this.regist();
    this.inited = true;
  }

  load(url: string = '', polygon: Point[] = []) {
    if (!this.inited) {
      return;
    }
    Promise.resolve().then(() => {
      if (url) {
        this.element.picture.style.backgroundImage = `url(${url})`;
      } else {
        this.element.picture.style.backgroundImage = url;
      }
      if (this.zoom) {
        this.zoomout();
        this.zoom = false;
      }
      this.polygon = polygon;
      this.loadPolygon(polygon);
    });
  }

  private element!: {
    canvas: HTMLCanvasElement;
    picture: HTMLDivElement;
  };

  private inited = false;

  private polygon: Point[] = [];

  private zoom = false;

  private zoomin() {
    this.element.canvas.style.display = 'none';
    this.element.picture.style.cursor = 'zoom-out';

    let x_array = this.polygon.map((point) => point.X);
    let x = Math.min(...x_array);
    let y_array = this.polygon.map((point) => point.Y);
    let y = Math.min(...y_array);

    let width = Math.max(0, ...x_array) - x;
    let _width = this.element.picture.offsetWidth / width;
    let height = Math.max(0, ...y_array) - y;
    let _height = this.element.picture.offsetHeight / height;
    this.element.picture.style.backgroundSize = `${_width}px ${_height}px`;

    this.element.picture.style.backgroundPositionX = `-${x * _width}px`;
    this.element.picture.style.backgroundPositionY = `-${y * _height}px`;
  }
  private zoomout() {
    this.element.canvas.style.display = '';
    this.element.picture.style.cursor = 'zoom-in';
    this.element.picture.style.backgroundSize = '100% 100%';
    this.element.picture.style.backgroundPosition = 'center';
  }

  private regist() {
    this.element.picture.addEventListener('click', (e) => {
      this.zoom = !this.zoom;
      if (this.zoom) {
        this.zoomin();
      } else {
        this.zoomout();
      }
    });
  }

  private draw(points: Point[]) {
    if (points.length > 0) {
      let width = this.element.canvas.width;
      let height = this.element.canvas.height;
      const ctx = this.element.canvas.getContext(
        '2d'
      ) as CanvasRenderingContext2D;

      this.clear(ctx);
      ctx.strokeStyle = 'red';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(points[0].X * width, points[0].Y * height);
      for (let i = 1; i < points.length; i++) {
        const point = points[i];
        ctx.lineTo(point.X * width, point.Y * height);
      }
      ctx.stroke();

      ctx.closePath();
    }
  }
  private clear(ctx: CanvasRenderingContext2D) {
    ctx.clearRect(0, 0, this.element.canvas.width, this.element.canvas.height);
  }
  private loadPolygon(polygon: Point[]) {
    let points = [...polygon];
    if (points.length > 1) {
      let first = polygon[0];
      let last = polygon[polygon.length - 1];
      if (!PointTool.equals(first, last)) {
        points.push(first);
      }
    }
    this.draw(points);
  }
}
