import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
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
  @Output() error = new EventEmitter<Event>();
  @Output() canvas = new EventEmitter<HTMLCanvasElement>();
  @Output() image = new EventEmitter<HTMLImageElement>();

  @ViewChild('canvas')
  set element(value: ElementRef<HTMLCanvasElement>) {
    this.canvas.emit(value.nativeElement);
  }

  onimage(img: HTMLImageElement) {
    this.image.emit(img);
  }

  onerror(e: Event) {
    this.error.emit(e);
  }
}
