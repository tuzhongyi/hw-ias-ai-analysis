import { ElementRef } from '@angular/core';
import * as echarts from 'echarts';
import { PromiseValue } from '../../../common/view-models/value.promise';
import { wait } from '../wait';

export abstract class ChartAbstract {
  abstract element?: ElementRef;
  protected chart = new PromiseValue<echarts.ECharts>();
  private handle?: any;
  private observer?: ResizeObserver;
  private frame?: number;
  private size = { width: 0, height: 0 };

  protected init() {
    this.handle = this.resize.bind(this);
    window.addEventListener('resize', this.handle);
  }

  protected view(dark = false) {
    wait(() => {
      return (
        !!this.element &&
        this.element.nativeElement.clientWidth > 0 &&
        this.element.nativeElement.clientHeight > 0
      );
    }).then(() => {
      if (this.element) {
        let el = this.element.nativeElement;
        let chart = echarts.init(el, dark ? 'dark' : undefined);
        this.chart.set(chart);
        // 初始化时容器尺寸可能还在变化（外层 css 过渡、容器查询解析等），
        // 这些变化不会触发 window resize，需要单独监听容器
        this.observe(el);
      }
    });
  }
  protected destroy(): void {
    this.chart.get().then((chart) => {
      chart.dispose();
    });
    if (this.handle) {
      window.removeEventListener('resize', this.handle);
      this.handle = undefined;
    }
    this.unobserve();
  }

  /** 监听容器尺寸变化，尺寸变化后重绘 */
  private observe(element: HTMLElement) {
    if (typeof ResizeObserver === 'undefined') return;
    this.size = {
      width: element.clientWidth,
      height: element.clientHeight,
    };
    this.observer = new ResizeObserver(() => {
      // 过渡期间每帧都会回调，合并到下一帧统一处理
      if (this.frame) {
        cancelAnimationFrame(this.frame);
      }
      this.frame = requestAnimationFrame(() => {
        this.frame = undefined;
        let width = element.clientWidth;
        let height = element.clientHeight;
        // 尺寸没变则不重绘，避免 resize 反向影响布局造成死循环
        if (width === this.size.width && height === this.size.height) {
          return;
        }
        this.size = { width, height };
        this.resize();
      });
    });
    this.observer.observe(element);
  }
  private unobserve() {
    if (this.frame) {
      cancelAnimationFrame(this.frame);
      this.frame = undefined;
    }
    if (this.observer) {
      this.observer.disconnect();
      this.observer = undefined;
    }
  }

  private resize() {
    this.chart.get().then((chart) => {
      chart.resize();
    });
  }
}
