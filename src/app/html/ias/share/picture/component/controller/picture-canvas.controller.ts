import { HowellPoint } from '../../../../../../common/data-core/models/arm/point.model';
import { EqualsTool } from '../../../../../../common/tools/equals-tool/equals.tool';

export class PictureCanvasController {
  set show(value: boolean) {
    this.canvas.style.display = value ? '' : 'none';
  }
  constructor(private canvas: HTMLCanvasElement) {}

  load(polygon: HowellPoint[][] = []) {
    for (let i = 0; i < polygon.length; i++) {
      this.loadPolygon(polygon[i]);
    }
  }

  private draw(points: HowellPoint[]) {
    if (points.length > 0) {
      let width = this.canvas.width;
      let height = this.canvas.height;
      const ctx = this.canvas.getContext('2d') as CanvasRenderingContext2D;

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
    ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }
  private loadPolygon(polygon: HowellPoint[]) {
    let points = [...polygon];
    if (points.length > 1) {
      let first = polygon[0];
      let last = polygon[polygon.length - 1];
      if (!EqualsTool.Point(first, last)) {
        points.push(first);
      }
    }
    this.draw(points);
  }
}
