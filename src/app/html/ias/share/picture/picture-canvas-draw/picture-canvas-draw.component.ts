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

  canvas = new PromiseValue<HTMLCanvasElement>();
  controller = new PromiseValue<PictureCanvasDrawController>();

  on = {
    canvas: (e: HTMLCanvasElement) => {
      this.canvas.set(e);
      this.regist(e);
      let context = e.getContext('2d') as CanvasRenderingContext2D;
      let controller = new PictureCanvasDrawController(context);
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
    move: (e: MouseEvent) => {},
    end: (e: MouseEvent) => {
      this.draw.doing = false;
    },
    clear: () => {},
    reload: async (controller: PictureCanvasDrawController) => {
      controller.load([this.draw.polygon]);
    },
  };
}
