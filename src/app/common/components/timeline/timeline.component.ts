import { CommonModule } from '@angular/common';
import {
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
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'howell-timeline',
  imports: [CommonModule, FormsModule],
  templateUrl: './timeline.component.html',
  styleUrl: './timeline.component.less',
})
export class TimelineComponent implements OnChanges {
  @Input() datas: Date[] = [];
  @Output('change') _change = new EventEmitter<Date>();
  @Input() playable = true;
  @Input() select?: Date;

  begin?: Date;
  end?: Date;
  current = new Date();
  value = 0;
  min = 0;
  max = 0;
  crossday = false;
  days: { percent: number }[] = [];
  @ViewChild('timelineslider') slider?: ElementRef<HTMLInputElement>;

  private change = {
    datas: (simple: SimpleChange) => {
      if (simple) {
        if (this.datas && this.datas.length > 0) {
          this.begin = this.datas[0];
          this.current = new Date(this.begin.getTime());
          this.min = this.begin.getTime();
          this.value = this.min;

          if (this.datas.length > 1) {
            this.end = this.datas[this.datas.length - 1];
            this.max = this.end.getTime();
          } else {
            this.max = this.min;
          }
          this.loadDays();
        }
      }
    },
    select: (simple: SimpleChange) => {
      if (simple && this.select) {
        this.value = this.select.getTime();
        this.current = new Date(this.value);
      }
    },
  };
  ngOnChanges(changes: SimpleChanges): void {
    this.change.datas(changes['datas']);
    this.change.select(changes['select']);
  }

  private sameDay(a: Date, b: Date) {
    return (
      a.getFullYear() === b.getFullYear() &&
      a.getMonth() === b.getMonth() &&
      a.getDate() === b.getDate()
    );
  }

  private loadDays() {
    this.days = [];
    this.crossday = false;
    if (this.datas.length < 2 || !this.begin || !this.end) return;
    this.crossday = !this.sameDay(this.begin, this.end);
    if (!this.crossday) return;

    let total = this.end.getTime() - this.begin.getTime();
    if (total <= 0) return;

    let day = this.key(this.begin);
    for (let i = 1; i < this.datas.length; i++) {
      let key = this.key(this.datas[i]);
      if (key !== day) {
        this.days.push({
          percent:
            ((this.datas[i].getTime() - this.begin!.getTime()) / total) * 100,
        });
        day = key;
      }
    }
  }

  private key(date: Date) {
    return `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;
  }

  on = {
    change: () => {
      if (this.slider) {
        let input = this.slider.nativeElement;
        this.mouse.left = this.position(input.clientWidth);
      }
      this.current = new Date(this.value);
      this._change.emit(this.current);
    },
  };

  control = {
    playing: false,
    handle: undefined as any,
    play: () => {
      if (this.control.playing) {
        return;
      }
      this.control.handle = setInterval(() => {
        let next = this.datas.find((x) => x.getTime() > this.value);
        if (next) {
          this.value = next.getTime();
          this.on.change();
        } else {
          this.control.stop();
        }
      }, 500);
      this.control.playing = true;
    },
    stop: () => {
      if (this.control.playing) {
        clearInterval(this.control.handle);
        this.control.handle = undefined;
        this.control.playing = false;
      }
    },
  };

  mouse = {
    enter: false,
    left: 0,
    up: (e: MouseEvent) => {
      this.mouse.enter = false;
    },
    down: (e: MouseEvent) => {
      this.mouse.enter = true;
      let input = e.currentTarget as HTMLInputElement;
      this.mouse.left = this.position(input.clientWidth);
    },
  };

  private position(width: number): number {
    let total = this.max - this.min;
    if (total <= 0) {
      return 0;
    }
    return ((this.value - this.min) / total) * width;
  }
}
