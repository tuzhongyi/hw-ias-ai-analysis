import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';
import { ContainerZoomComponent } from '../../../../../common/components/container-zoom/container-zoom.component';
import { HowellPoint } from '../../../../../common/data-core/models/arm/point.model';
import { PromiseValue } from '../../../../../common/view-models/value.promise';
import { PictureCanvasComponent } from '../picture-canvas/picture-canvas.component';
import { PictureCanvasController } from './picture-canvas.controller';

@Component({
  selector: 'ias-picture-polygon-multiple',
  imports: [PictureCanvasComponent, ContainerZoomComponent],
  templateUrl: './picture-polygon-multiple.component.html',
  styleUrl: './picture-polygon-multiple.component.less',
})
export class PicturePolygonMultipleComponent implements OnChanges {
  @Input() src?: string;
  @Input() id?: string;
  @Input() default?: string;
  @Output() error = new EventEmitter<Event>();
  @Input() polygon: HowellPoint[][] = [];
  @Output() image = new EventEmitter<HTMLImageElement>();
  @Input() draw = true;
  @Input() fullable = false;
  @Output() full = new EventEmitter<void>();

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
  onfull() {
    this.full.emit();
  }
}
