import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';
import { HowellPoint } from '../../../../../common/data-core/models/arm/point.model';
import { PromiseValue } from '../../../../../common/view-models/value.promise';
import { PictureCanvasComponent } from '../picture-canvas/picture-canvas.component';
import { PictureCanvasController } from './picture-canvas.controller';

@Component({
  selector: 'ias-picture-polygon',
  imports: [PictureCanvasComponent],
  templateUrl: './picture-polygon.component.html',
  styleUrl: './picture-polygon.component.less',
})
export class PicturePolygonComponent implements OnChanges {
  @Input() src?: string;
  @Input() id?: string;
  @Output() error = new EventEmitter<Event>();
  @Input() polygon: HowellPoint[] = [];
  @Output() image = new EventEmitter<HTMLImageElement>();
  @Input() draw = true;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['polygon']) {
      this.controller.get().then((controller) => {
        controller.load(this.polygon);
      });
    }
    if (changes['draw']) {
      this.controller.get().then((controller) => {
        controller.show = this.draw;
      });
    }
  }

  private controller = new PromiseValue<PictureCanvasController>();

  oncanvas(canvas: HTMLCanvasElement) {
    let controller = new PictureCanvasController(canvas);
    this.controller.set(controller);
  }
  onimage(img: HTMLImageElement) {
    this.image.emit(img);
  }
  onerror(e: Event) {
    this.error.emit(e);
  }
}
