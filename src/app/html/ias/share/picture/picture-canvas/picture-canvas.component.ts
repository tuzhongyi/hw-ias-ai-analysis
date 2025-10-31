import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import { wait } from '../../../../../common/tools/wait';
import { PictureComponent } from '../component/picture.component';

@Component({
  selector: 'ias-picture-canvas',
  imports: [PictureComponent],
  templateUrl: './picture-canvas.component.html',
  styleUrl: './picture-canvas.component.less',
})
export class PictureCanvasComponent {
  @Input() src?: string;
  @Input() id?: string;
  @Input() default?: string;
  @Input() drawable = false;
  @Output() error = new EventEmitter<Event>();
  @Output() canvas = new EventEmitter<HTMLCanvasElement>();
  @Output() image = new EventEmitter<HTMLImageElement>();

  @ViewChild('canvas')
  set _canvas(value: ElementRef<HTMLCanvasElement>) {
    wait(() => {
      return !!this.element;
    }).then(() => {
      if (this.element) {
        let canvas = value.nativeElement;
        let element = this.element.nativeElement;
        canvas.width = element.clientWidth;
        canvas.height = element.clientHeight;
        this.canvas.emit(value.nativeElement);
      }
    });
  }
  @ViewChild('element')
  element?: ElementRef<HTMLDivElement>;

  onimage(img: HTMLImageElement) {
    this.image.emit(img);
  }

  onerror(e: Event) {
    this.error.emit(e);
  }
}
