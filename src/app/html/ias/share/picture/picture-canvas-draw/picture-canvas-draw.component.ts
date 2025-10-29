import { Component, EventEmitter, Input, Output } from '@angular/core';
import { HowellPoint } from '../../../../../common/data-core/models/arm/point.model';
import { Polygon } from '../../../../../common/data-core/models/arm/polygon.model';
import { PromiseValue } from '../../../../../common/view-models/value.promise';
import { PictureCanvasComponent } from '../picture-canvas/picture-canvas.component';
import { PictureCanvasDrawController } from './picture-canvas-draw.controller';

@Component({
  selector: 'ias-picture-canvas-draw',
  imports: [PictureCanvasComponent],
  templateUrl: './picture-canvas-draw.component.html',
  styleUrl: './picture-canvas-draw.component.less',
})
export class PictureCanvasDrawComponent {
  @Input() src?: string;
  @Input() id?: string;
  @Input() default?: string;
  @Output() error = new EventEmitter<Event>();
  @Output() over = new EventEmitter<Polygon>();

  canvas = new PromiseValue<HTMLCanvasElement>();
  controller = new PromiseValue<PictureCanvasDrawController>();

  on = {
    canvas: (e: HTMLCanvasElement) => {
      this.canvas.set(e);
      this.regist(e);
      let context = e.getContext('2d') as CanvasRenderingContext2D;
      let controller = new PictureCanvasDrawController(context, {
        width: e.width,
        height: e.height,
      });
      this.controller.set(controller);
    },
    error: (e: Event) => {
      this.error.emit(e);
    },
  };

  private regist(canvas: HTMLCanvasElement) {
    canvas.addEventListener('click', (e: MouseEvent) => {
      this.draw.begin(e);
    });
    canvas.addEventListener('mousemove', (e: MouseEvent) => {
      this.draw.move(e);
    });
    canvas.addEventListener('contextmenu', (e: MouseEvent) => {
      this.draw.end(e);
    });
  }

  private draw = {
    doing: false,
    polygon: new Polygon(),
    begin: async (e: MouseEvent) => {
      this.draw.doing = true;
      this.draw.polygon = new Polygon();
      this.draw.polygon.Coordinates = [];
      let point = new HowellPoint();
      point.X = e.offsetX;
      point.Y = e.offsetY;
      this.draw.polygon.Coordinates.push(point);
      let controller = await this.controller.get();
      this.draw.reload(controller);
      controller.drawing(this.draw.polygon, { isnew: true });
    },
    move: async (e: MouseEvent) => {
      if (this.draw.polygon.Coordinates.length > 0) {
        let controller = await this.controller.get();
        this.draw.reload(controller);
        controller.drawing(this.draw.polygon, {
          isnew: true,
          current: { X: e.offsetX, Y: e.offsetY },
        });
      }
    },
    end: async (e: MouseEvent) => {
      this.draw.doing = false;
      if (this.draw.polygon && this.draw.polygon.Coordinates.length > 2) {
        let polygon = new Polygon();
        polygon.Coordinates = [];
        for (let i = 0; i < this.draw.polygon.Coordinates.length; i++) {
          const point = this.draw.polygon.Coordinates[i];
          polygon.Coordinates.push({ X: e.offsetX, Y: e.offsetY });
        }
        polygon.Coordinates.push(polygon.Coordinates[0]);
        this.over.emit(polygon);
      } else {
        let controller = await this.controller.get();
        this.draw.reload(controller);
      }
      this.draw.polygon = new Polygon();
    },
    clear: (controller: PictureCanvasDrawController) => {
      controller.clear();
    },
    reload: (controller: PictureCanvasDrawController) => {
      this.draw.clear(controller);
      controller.load([this.draw.polygon]);
    },
  };
}
