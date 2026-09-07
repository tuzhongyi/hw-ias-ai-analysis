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
  index = 0;
  crossday = false;
  days: { percent: number }[] = [];
  @ViewChild('timelineslider') slider?: ElementRef<HTMLInputElement>;

  private change = {
    datas: (simple: SimpleChange) => {
      if (simple) {
        if (this.datas && this.datas.length > 0) {
          this.begin = this.datas[0];
          this.current = new Date(this.begin.getTime());

          if (this.datas.length > 1) {
            this.end = this.datas[this.datas.length - 1];
          }
          this.loadDays();
        }
      }
    },
    select: (simple: SimpleChange) => {
      if (simple && this.select) {
        let time = this.select.getTime();
        let index = this.datas.findIndex((x) => x.getTime() === time);
        if (index >= 0) {
          this.index = index;
          this.current = this.datas[index];
        }
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

    let day = this.key(this.begin);
    let total = this.datas.length - 1;
    for (let i = 1; i < this.datas.length; i++) {
      let key = this.key(this.datas[i]);
      if (key !== day) {
        this.days.push({ percent: (i / total) * 100 });
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
        this.mouse.left = (input.clientWidth / this.datas.length) * this.index;
      }
      this.current = this.datas[this.index];
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
        if (this.index < this.datas.length - 1) {
          this.index++;
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
      this.mouse.left = (input.clientWidth / this.datas.length) * this.index;
    },
  };
}
