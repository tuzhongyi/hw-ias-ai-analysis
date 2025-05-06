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
      }
    }
    if (changes['id']) {
      if (this.id) {
        this.src = this.business.load(this.id);
      }
    }
  }

  onerror(e: Event) {
    this.src =
      'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsIAAA7CARUoSoAAAAANSURBVBhXY2BgYPgPAAEEAQBwIGULAAAAAElFTkSuQmCC';
    this.error.emit(e);
  }
}
