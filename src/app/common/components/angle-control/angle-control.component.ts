import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  SimpleChange,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { ChartAbstract } from '../../tools/chart-tool/chart.abstract';
import { AngleControlEChartOption } from './angle-control.option';

@Component({
  selector: 'ias-angle-control',
  imports: [],
  templateUrl: './angle-control.component.html',
  styleUrl: './angle-control.component.less',
})
export class AngleControlComponent
  extends ChartAbstract
  implements OnInit, OnChanges, AfterViewInit, OnDestroy
{
  @Input() option = Object.assign({}, AngleControlEChartOption);
  @Input() value = 0;
  @Output() valueChange = new EventEmitter<number>();
  constructor() {
    super();
  }
  @ViewChild('angle_control') element?: ElementRef;

  ngOnInit(): void {
    this.init();
  }

  private change = {
    value: (change: SimpleChange) => {
      if (change) {
        this.load(this.value);
      }
    },
  };

  ngOnChanges(changes: SimpleChanges): void {
    this.change.value(changes['value']);
  }

  ngAfterViewInit(): void {
    this.view(true);
  }
  ngOnDestroy() {
    this.destroy();
  }

  private async load(angle: number) {
    const v = Math.max(0, Math.min(360, angle));
    let chart = await this.chart.get();

    this.option.series[0].data = [{ value: v }];
    chart.setOption(this.option);
  }

  mouse = {
    dragging: false,

    down: async (e: MouseEvent) => {
      e.preventDefault();
      this.mouse.dragging = true;
      await this.mouse.move(e);

      window.addEventListener('mousemove', this.mouse.move);
      window.addEventListener('mouseup', this.mouse.up);
    },

    move: async (e: MouseEvent) => {
      if (!this.mouse.dragging || !this.element) return;

      const rect = this.element.nativeElement.getBoundingClientRect();

      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;

      const dx = e.clientX - cx;
      const dy = cy - e.clientY; // ⚠️ 反转 Y 轴（关键）

      // atan2 返回 [-PI, PI]
      let angle = Math.atan2(dx, dy) * (180 / Math.PI);

      if (angle < 0) angle += 360;

      await this.on.angle(angle);
    },

    up: () => {
      this.mouse.dragging = false;
      window.removeEventListener('mousemove', this.mouse.move);
      window.removeEventListener('mouseup', this.mouse.up);
    },
  };

  on = {
    angle: (angle: number) => {
      angle = Math.round(angle);

      this.value = angle;
      this.valueChange.emit(angle);

      this.load(angle);
    },
  };
}
