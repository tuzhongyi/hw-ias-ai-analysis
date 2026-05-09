import {
  Component,
  ElementRef,
  Input,
  OnChanges,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { wait } from '../../../../../../common/tools/wait';

@Component({
  selector: 'ias-system-statistic-road-object-statement-5-chart',
  imports: [],
  templateUrl:
    './system-statistic-road-object-statement-5-chart.component.html',
  styleUrl: './system-statistic-road-object-statement-5-chart.component.less',
})
export class SystemStatisticRoadObjectStatement5ChartComponent
  implements OnChanges
{
  @Input() value = 50;

  get angle() {
    let value = 360 * (this.value / 100);
    return value % 360;
  }

  @ViewChild('container')
  container?: ElementRef<HTMLDivElement>;

  ngOnChanges(changes: SimpleChanges): void {
    wait(() => {
      return (
        !!this.container &&
        this.container.nativeElement.clientWidth > 0 &&
        this.container.nativeElement.clientHeight > 0
      );
    }).then((x) => {
      // if (this.container) {
      //   let svg = this.svg(
      //     this.angle,
      //     this.container.nativeElement.clientWidth * 0.5
      //   );
      //   this.container.nativeElement.insertAdjacentHTML('afterbegin', svg);
      // }
    });
  }

  private svg(angle: number, r: number) {
    // 扇形路径
    const a1 = angle - 5; // 开始渐变
    const a2 = angle - 4; // 变实
    const a3 = angle; // 指针结束

    return `
    <svg width="${r * 2}" height="${r * 2}" viewBox="0 0 200 200">
  <!-- 60° 扇形裁剪 -->
  <clipPath id="clip">
    <path d="M100 100 L100 0 A100 100 0 0 1 186.6 150 Z" />
  </clipPath>

  <!-- 绕圆心旋转的渐变（真正锥形渐变） -->
  <g clip-path="url(#clip)">
    <circle r="100" cx="100" cy="100" fill="transparent" stroke="url(#gradient)" stroke-width="100" />
    <defs>
      <linearGradient id="gradient" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="transparent"/>
        <stop offset="91%" stop-color="rgb(243,180,71)" stop-opacity="0.8"/>
        <stop offset="100%" stop-color="rgb(243,180,71)" stop-opacity="1"/>
      </linearGradient>
    </defs>
  </g>
</svg>
    `;
  }
}
