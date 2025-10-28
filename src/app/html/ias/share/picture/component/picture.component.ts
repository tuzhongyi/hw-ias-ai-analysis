import { CommonModule } from '@angular/common';
import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
  ViewChild,
} from '@angular/core';

import { PictureBusiness } from './picture.business';

@Component({
  selector: 'ias-picture',
  imports: [CommonModule],
  templateUrl: './picture.component.html',
  styleUrl: './picture.component.less',
  providers: [PictureBusiness],
})
export class PictureComponent implements OnChanges {
  @Input('src') url?: string;
  @Input() id?: string;

  @Output() error = new EventEmitter<Event>();
  @Output('image') image_ = new EventEmitter<HTMLImageElement>();

  private _default =
    'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsIAAA7CARUoSoAAAAANSURBVBhXY2BgYPgPAAEEAQBwIGULAAAAAElFTkSuQmCC';
  private nodata = '/assets/image/no-image.png';
  public get default(): string {
    return this._default;
  }
  @Input()
  public set default(v: string | undefined) {
    if (v) {
      this._default = v;
    }
  }

  constructor(private business: PictureBusiness) {}

  @ViewChild('image')
  set element(value: ElementRef<HTMLImageElement>) {
    this.image_.emit(value.nativeElement);
  }

  src?: string;

  ngOnChanges(changes: SimpleChanges) {
    if (changes['url']) {
      if (this.url) {
        this.src = this.url;
      } else {
        this.src = undefined;
      }
    }
    if (changes['id']) {
      if (this.id) {
        this.src = this.business.load(this.id);
      } else {
        this.src = undefined;
      }
    }
  }

  onerror(e: Event) {
    let trigger = e.currentTarget as HTMLImageElement;
    let src = this.nodata;
    trigger.src = src;

    this.error.emit(e);
  }
}
