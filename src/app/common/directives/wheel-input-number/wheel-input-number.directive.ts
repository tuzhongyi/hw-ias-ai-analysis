import {
  AfterContentInit,
  Directive,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';

declare let $: any;

@Directive({
  selector: '[wheel-input-number]',
})
export class WheelInputNumberDirective
  implements OnInit, OnChanges, AfterContentInit, OnDestroy
{
  @Input() value?: number = 0;
  @Output() valueChange = new EventEmitter<number>();

  constructor(e: ElementRef) {
    this.ele = e.nativeElement;
  }

  private ele: HTMLInputElement;
  private handle: any;

  ngOnInit(): void {
    this.ele.value = `${this.value?.toFixed(0)}`;
    this.handle = this.event.bind(this);
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.ele.value = `${this.value?.toFixed(0)}`;
    this.valueChange.emit(this.value);
  }
  ngAfterContentInit(): void {
    this.ele.addEventListener('wheel', this.handle);
  }
  ngOnDestroy(): void {
    this.ele.removeEventListener('wheel', this.handle);
  }
  event(e: WheelEvent) {
    e.preventDefault();
    let min = Number.MIN_SAFE_INTEGER;
    let max = Number.MAX_SAFE_INTEGER;
    let step = 1;
    let value = this.value ?? 0;
    if (this.ele.value) {
      value = parseInt(this.ele.value);
    }
    if (this.ele.min) {
      min = parseInt(this.ele.min);
    }
    if (this.ele.max) {
      max = parseInt(this.ele.max);
    }
    if (this.ele.step) {
      step = parseInt(this.ele.step);
    }

    if (e.deltaY < 0) {
      if (value + step < max) {
        value += step;
      } else {
        value = max;
      }
    } else {
      if (value - step > min) {
        value -= step;
      } else {
        value = min;
      }
    }
    this.value = value;
    this.ele.value = `${this.value}`;
    this.valueChange.emit(this.value);
  }
}
