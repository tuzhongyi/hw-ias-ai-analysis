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
import { PicturePolygonComponent } from '../picture-polygon/picture-polygon.component';

@Component({
  selector: 'ias-picture-polygon-zoom',
  imports: [PicturePolygonComponent, ContainerZoomComponent],
  templateUrl: './picture-polygon-zoom.component.html',
  styleUrl: './picture-polygon-zoom.component.less',
})
export class PicturePolygonZoomComponent implements OnChanges {
  @Input() src?: string;
  @Input() id?: string;
  @Input() default?: string;
  @Output() error = new EventEmitter<Event>();
  @Input() polygon: HowellPoint[] = [];
  @Input('zoom') canzoom = false;

  private image = new PromiseValue<HTMLElement>();

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['polygon'] || changes['canzoom']) {
      if (this.canzoom) {
        this.zoom.out();
        if (this.zoom.is) {
          this.zoom.in();
        }
      }
    }
  }

  onimage(img: HTMLImageElement) {
    this.image.set(img);
  }

  onerror(e: Event) {
    this.error.emit(e);
  }

  zoom = {
    is: false,
    in: () => {
      this.image.get().then((image) => {
        image.style.cursor = 'zoom-out';

        let x_array = this.polygon.map((point) => point.X);
        let x = Math.min(...x_array);
        let y_array = this.polygon.map((point) => point.Y);
        let y = Math.min(...y_array);

        let width = Math.max(0, ...x_array) - x;
        let _width = image.offsetWidth / width;
        let height = Math.max(0, ...y_array) - y;
        let _height = image.offsetHeight / height;

        image.style.width = `${_width}px`;
        image.style.height = `${_height}px`;

        let position = [`-${x * _width}px`, `-${y * _height}px`];

        image.style.objectPosition = position.join(' ');
      });
    },
    out: () => {
      this.image.get().then((image) => {
        image.style.cursor = 'zoom-in';
        image.style.objectPosition = '';
        image.style.width = '';
        image.style.height = '';
      });
    },
    on: () => {
      if (this.canzoom) {
        this.zoom.is = !this.zoom.is;
        if (this.zoom.is) {
          this.zoom.in();
        } else {
          this.zoom.out();
        }
      }
    },
  };
}
