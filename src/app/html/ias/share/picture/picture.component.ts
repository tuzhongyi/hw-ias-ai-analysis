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

import { HowellPoint } from '../../../../common/data-core/models/arm/point.model';
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
  @Input() polygon: HowellPoint[] = [];
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

  async ngOnChanges(changes: SimpleChanges) {
    if (changes['url']) {
      await this.url_change(changes['url']);
    }
    if (changes['id']) {
      await this.id_change(changes['id']);
    }
    if (changes['polygon']) {
      await this.polygon_change(changes['polygon']);
    }
  }

  private async polygon_change(change: SimpleChange) {
    if (change.firstChange == false) {
      let canvas = await this.controller.canvas.get();
      canvas.load(this.polygon);

      let image = await this.controller.image.get();
      if (this.url) {
        return image.load(this.url, this.polygon);
      }
    }
  }
  private async url_change(change: SimpleChange) {
    if (change.firstChange == false) {
      let image = await this.controller.image.get();
      if (this.url) {
        return image.load(this.url, this.polygon);
      }
    }
  }
  private async id_change(change: SimpleChange) {
    if (change.firstChange == false) {
      let image = await this.controller.image.get();
      if (this.id) {
        this.url = this.business.load(this.id);
        image.load(this.url, this.polygon);
      }
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
