import {
  Component,
  ElementRef,
  Input,
  OnChanges,
  SimpleChange,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { MediumRequestService } from '../../../../../common/data-core/requests/services/medium/medium.service';
import { PromiseValue } from '../../../../../common/view-models/value.promise';

@Component({
  selector: 'ias-audio',
  imports: [],
  templateUrl: './audio.component.html',
  styleUrl: './audio.component.less',
})
export class AudioComponent implements OnChanges {
  @Input() id?: string;
  @Input() src?: string;

  constructor(private medium: MediumRequestService) {}

  @ViewChild('player') set element(e: ElementRef<HTMLAudioElement>) {
    if (e && e.nativeElement) {
      this.player.set(e.nativeElement);
    }
  }
  private player = new PromiseValue<HTMLAudioElement>();

  ngOnChanges(changes: SimpleChanges): void {
    this.change.id(changes['id']);
  }
  private change = {
    id: (data: SimpleChange) => {
      if (data) {
        if (this.id) {
          this.src = this.medium.audio(this.id);
        }
      }
    },
  };
}
