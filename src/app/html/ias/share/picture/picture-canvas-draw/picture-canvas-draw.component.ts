import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChange,
  SimpleChanges,
} from '@angular/core';
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
export class PictureCanvasDrawComponent implements OnChanges, OnInit {
  @Input() src?: string;
  @Input() id?: string;
  @Input() default?: string;
  @Input() drawable = true;
  @Input() clear = false;
  @Input() polygon: HowellPoint[] = [];
  @Output() clearChange = new EventEmitter<boolean>();
  @Output() error = new EventEmitter<Event>();
  @Output() over = new EventEmitter<Polygon>();
  constructor() {}

  private canvas = new PromiseValue<HTMLCanvasElement>();
  private controller = new PromiseValue<PictureCanvasDrawController>();
  private size = {
    width: 0,
    height: 0,
  };

  private change = {
    clear: (simple: SimpleChange) => {
      if (simple) {
        if (this.clear) {
          this.controller.get().then((controller) => {
            this.draw.clear(controller);
            this.clear = false;
            this.clearChange.emit(this.clear);
          });
        }
      }
    },
  };

  ngOnChanges(changes: SimpleChanges): void {
    this.change.clear(changes['clear']);
  }

  ngOnInit(): void {
    if (this.polygon && this.polygon.length > 0) {
      this.controller.get().then((controller) => {
        let polygon = new Polygon();
        polygon.Coordinates = [];
        for (let i = 0; i < this.polygon.length; i++) {
          const point = this.polygon[i];
          polygon.Coordinates.push({
            X: point.X * this.size.width,
            Y: point.Y * this.size.height,
          });
        }
        controller.load([polygon]);
      });
    }
  }

  private regist(canvas: HTMLCanvasElement) {
    canvas.addEventListener('click', (e: MouseEvent) => {
      if (!this.drawable) return;
      if (this.draw.doing) {
        this.draw.push(e);
      } else {
        this.draw.begin(e);
      }
    });
    canvas.addEventListener('mousemove', (e: MouseEvent) => {
      if (!this.drawable) return;
      this.draw.move(e);
    });
    // canvas.addEventListener('contextmenu', (e: MouseEvent) => {
    //   this.draw.end(e);
    // });
    canvas.oncontextmenu = (e: MouseEvent) => {
      if (!this.drawable) return;
      this.draw.end(e);
      return false;
    };
  }

  private draw = {
    doing: false,
    polygon: new Polygon(),
    init: () => {
      this.draw.polygon = new Polygon();
      this.draw.polygon.Coordinates = [];
    },
    begin: async (e: MouseEvent) => {
      this.draw.doing = true;
      this.draw.init();
      let point = new HowellPoint();
      point.X = e.offsetX;
      point.Y = e.offsetY;
      this.draw.polygon.Coordinates.push(point);
      let controller = await this.controller.get();
      this.draw.reload(controller);
      controller.drawing(this.draw.polygon, { isnew: true });
    },
    push: (e: MouseEvent) => {
      let point = new HowellPoint();
      point.X = e.offsetX;
      point.Y = e.offsetY;
      this.draw.polygon.Coordinates.push(point);
    },
    move: async (e: MouseEvent) => {
      if (this.draw.doing === false) return;
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
      let controller = await this.controller.get();
      if (this.draw.polygon && this.draw.polygon.Coordinates.length > 2) {
        this.draw.polygon.Coordinates.push(this.draw.polygon.Coordinates[0]);
        let polygon = new Polygon();
        polygon.Coordinates = [];
        for (let i = 0; i < this.draw.polygon.Coordinates.length; i++) {
          const point = this.draw.polygon.Coordinates[i];
          polygon.Coordinates.push({
            X: point.X / this.size.width,
            Y: point.Y / this.size.height,
          });
        }
        this.over.emit(polygon);
      }
      this.draw.reload(controller);
      this.draw.init();
    },
    clear: (controller: PictureCanvasDrawController) => {
      controller.clear();
    },
    reload: (controller: PictureCanvasDrawController) => {
      this.draw.clear(controller);
      controller.load([this.draw.polygon]);
    },
  };

  on = {
    canvas: (e: HTMLCanvasElement) => {
      this.size.width = e.width;
      this.size.height = e.height;
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
}
