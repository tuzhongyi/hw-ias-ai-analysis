import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  SimpleChange,
  SimpleChanges,
} from '@angular/core';
import { Subscription } from 'rxjs';
import { MediumRequestService } from '../../../../../common/data-core/requests/services/medium/medium.service';
import { AudioButtonService } from './audio-button.service';

@Component({
  selector: 'ias-audio-button',
  imports: [CommonModule],
  templateUrl: './audio-button.component.html',
  styleUrl: './audio-button.component.less',
})
export class AudioButtonComponent implements OnChanges, OnInit, OnDestroy {
  @Input() id?: string;
  @Input() src?: string;
  @Input() play?: EventEmitter<void>;
  @Output() playing = new EventEmitter<number>();
  @Output() stoped = new EventEmitter<void>();
  @Output() inited = new EventEmitter<void>();

  constructor(
    private medium: MediumRequestService,
    private service: AudioButtonService
  ) {}

  private subscription = new Subscription();

  ngOnChanges(changes: SimpleChanges): void {
    this.change.id(changes['id']);
  }
  private change = {
    id: (change: SimpleChange) => {
      if (change) {
        if (this.id) {
          this.src = this.medium.audio(this.id);
        }
      }
    },
  };

  ngOnInit(): void {
    this.regist();
  }

  private regist() {
    if (this.play) {
      let sub = this.play.subscribe((x) => {
        this.on.play();
      });
      this.subscription.add(sub);
    }
  }

  animation = {
    handle: undefined as any,
    icons: ['mdi-volume-high', 'mdi-volume-low', 'mdi-volume-medium'],
    index: 0,
    run: () => {
      this.animation.handle = setInterval(() => {
        this.animation.index =
          (this.animation.index + 1) % this.animation.icons.length;

        if (this.audio.data) {
          let ratio =
            this.audio.data.duration > 0
              ? this.audio.data.currentTime / this.audio.data.duration
              : 0;
          this.playing.emit(ratio);
        }
      }, 200);
    },
  };

  audio = {
    data: undefined as HTMLAudioElement | undefined,
    playing: false,
    inited: false,
    init: () => {
      this.audio.clear();
      this.audio.data = new Audio(this.src);
      this.audio.data.addEventListener('ended', () => {
        this.audio.stop();
      });

      let context = new AudioContext();
      let source = context.createMediaElementSource(this.audio.data);
      let node = context.createGain();
      node.gain.value = 10;
      source.connect(node);
      node.connect(context.destination);
      this.audio.inited = true;
      this.inited.emit();
    },
    clear: () => {
      if (this.audio.data) {
        this.audio.data.pause();
        this.audio.data.removeAttribute('src');
        this.audio.data.load();
        this.audio.data = undefined;
      }
    },
    play: () => {
      if (!this.audio.inited) {
        this.audio.init();
      }
      if (!this.audio.data) return;
      this.audio.playing = true;
      this.audio.data.play();
      this.animation.run();
    },
    stop: () => {
      if (!this.audio.data) return;

      this.audio.playing = false;
      this.audio.data.pause();
      this.audio.data.currentTime = 0;

      if (this.animation.handle) {
        clearInterval(this.animation.handle);
        this.animation.handle = null;
      }
      this.animation.index = 0;

      this.service.stop(this); // 通知服务我停了
      this.stoped.emit(); // 通知外部我停了
    },
  };

  on = {
    play: () => {
      if (!this.audio.data) {
        this.audio.init();
      }

      if (this.audio.playing) {
        this.audio.stop();
      } else {
        this.service.play(this); // 通知服务我要开始播
        this.audio.play();
      }
    },
  };

  /** 被其它组件强制停止播放 */
  stop(): void {
    if (this.audio.playing) {
      this.audio.stop();
    }
  }

  ngOnDestroy(): void {
    this.audio.stop();
    this.audio.clear();
    this.subscription.unsubscribe();
  }
}
