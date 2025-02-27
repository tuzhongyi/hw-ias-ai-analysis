import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChange,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { Point } from '../../../../common/data-core/models/arm/point.model';
import { PictureCanvasController } from './controller/picture-canvas.controller';
import { PictureImageController } from './controller/picture-image.controller';
import { PictureController } from './controller/picture.controller';
import { PictureBusiness } from './picture.business';

@Component({
  selector: 'ias-picture',
  imports: [CommonModule],
  templateUrl: './picture.component.html',
  styleUrl: './picture.component.less',
  providers: [PictureController, PictureBusiness],
})
export class PictureComponent implements OnChanges, AfterViewInit {
  @Input('src') url?: string;
  @Input() id?: string;
  @Input() polygon: Point[] = [];
  @Input('zoom') zoom = false;
  @Output() error = new EventEmitter<Error>();

  constructor(
    private controller: PictureController,
    private business: PictureBusiness
  ) {}

  @ViewChild('canvas') set canvas(value: ElementRef<HTMLCanvasElement>) {
    if (value) {
      this.controller.canvas.set(
        new PictureCanvasController(value.nativeElement)
      );
    }
  }
  @ViewChild('image') set image(value: ElementRef<HTMLImageElement>) {
    if (value) {
      this.controller.image.set(
        new PictureImageController(value.nativeElement, this.zoom)
      );
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['polygon']) {
      this.polygon_change(changes['polygon']);
    }
    if (changes['url']) {
      this.url_change(changes['url']);
    }
    if (changes['id']) {
      this.id_change(changes['id']);
    }
  }

  private polygon_change(change: SimpleChange) {
    if (change.firstChange == false) {
      this.controller.canvas.get().then((x) => {
        x.load(this.polygon);
      });
      this.controller.image.get().then((x) => {
        if (this.url) {
          x.load(this.url, this.polygon);
        }
      });
    }
  }
  private url_change(change: SimpleChange) {
    if (change.firstChange == false) {
      this.controller.image.get().then((x) => {
        if (this.url) {
          x.load(this.url, this.polygon);
        }
      });
    }
  }
  private id_change(change: SimpleChange) {
    if (change.firstChange == false) {
      this.controller.image.get().then((x) => {
        if (this.id) {
          this.url = this.business.load(this.id);
          x.load(this.url, this.polygon);
        }
      });
    }
  }

  ngAfterViewInit(): void {
    this.controller.canvas.get().then((x) => {
      x.load(this.polygon);
    });
    this.controller.image.get().then((x) => {
      if (this.url) {
        x.load(this.url, this.polygon);
      } else if (this.id) {
        this.url = this.business.load(this.id);
        x.load(this.url, this.polygon);
      }
    });
  }

  onzoom() {
    if (!this.zoom) return;
    this.controller.image.get().then((image) => {
      this.controller.canvas.get().then((canvas) => {
        canvas.show = !image.zoom();
      });
    });
  }
  onerror() {
    this.controller.image.get().then((x) => {
      x.onerror();
    });
  }
}
