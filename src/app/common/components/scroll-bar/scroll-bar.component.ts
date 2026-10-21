import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  NgZone,
  OnChanges,
  OnDestroy,
  SimpleChanges,
  ViewChild,
} from '@angular/core';

/** 标记在目标容器上的属性，用来隐藏原生滚动条 */
const HIDDEN_ATTR = 'data-ias-scroll-bar';
let hiddenStyleInjected = false;

function injectHiddenStyle() {
  if (hiddenStyleInjected || typeof document === 'undefined') return;
  hiddenStyleInjected = true;
  let style = document.createElement('style');
  style.textContent =
    `[${HIDDEN_ATTR}]{scrollbar-width:none;-ms-overflow-style:none;}` +
    `[${HIDDEN_ATTR}]::-webkit-scrollbar{width:0;height:0;display:none;}`;
  document.head.appendChild(style);
}

export interface ScrollBarMark {
  /** 标记位置：0 ~ 1，相对可滚动内容的总高度 */
  position: number;
  /** 标记高度：0 ~ 1，相对可滚动内容的总高度 */
  size?: number;
  /** 标记颜色 */
  color: string;
}

/**
 * 模拟滚动条（VS Code 概览尺风格）。
 * 隐藏目标容器的原生滚动条，用轨道 + 滑块代替，轨道上可以叠加彩色标记。
 */
@Component({
  selector: 'ias-scroll-bar',
  imports: [],
  templateUrl: './scroll-bar.component.html',
  styleUrl: './scroll-bar.component.less',
})
export class ScrollBarComponent implements AfterViewInit, OnChanges, OnDestroy {
  /** 需要模拟滚动条的滚动容器 */
  @Input() target?: HTMLElement;
  /** 轨道上的彩色标记 */
  @Input() marks: ScrollBarMark[] = [];
  /** 滑块最小高度（px） */
  @Input() minThumb = 24;

  /** 小于等于该值的溢出视为“没有真正可滚动的内容”，不显示滑块 */
  private static readonly MIN_OVERFLOW = 2;

  @ViewChild('track') track?: ElementRef<HTMLElement>;

  thumbHeight = 0;
  thumbTop = 0;

  private attached?: HTMLElement;
  private resizeObserver?: ResizeObserver;
  private mutationObserver?: MutationObserver;
  private frame = 0;

  private dragging = false;
  private dragY = 0;
  private dragTop = 0;

  constructor(private zone: NgZone) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['target']) {
      /* 首次变更发生在视图创建前，交给 ngAfterViewInit 处理 */
      if (this.track) {
        this.attach();
      }
    }
  }

  ngAfterViewInit(): void {
    this.attach();
  }

  ngOnDestroy(): void {
    this.detach();
  }

  private attach() {
    if (this.attached === this.target) return;
    this.detach();

    let target = this.target;
    if (!target) return;
    this.attached = target;

    /* 由组件自己隐藏原生滚动条，外部不用再处理 */
    injectHiddenStyle();
    target.setAttribute(HIDDEN_ATTR, '');

    target.addEventListener('scroll', this.onScroll, { passive: true });

    if (typeof ResizeObserver !== 'undefined') {
      this.resizeObserver = new ResizeObserver(() => this.scheduleUpdate());
      this.resizeObserver.observe(target);
    }
    if (typeof MutationObserver !== 'undefined') {
      /* 展开/收起、搜索过滤会替换节点，需要重新计算滑块尺寸 */
      this.mutationObserver = new MutationObserver(() => this.scheduleUpdate());
      this.mutationObserver.observe(target, {
        childList: true,
        subtree: true,
      });
    }

    this.scheduleUpdate();
  }

  private detach() {
    if (this.attached) {
      this.attached.removeEventListener('scroll', this.onScroll);
      this.attached.removeAttribute(HIDDEN_ATTR);
      this.attached = undefined;
    }
    this.resizeObserver?.disconnect();
    this.resizeObserver = undefined;
    this.mutationObserver?.disconnect();
    this.mutationObserver = undefined;
    if (this.frame) {
      cancelAnimationFrame(this.frame);
      this.frame = 0;
    }
    if (this.dragging) {
      this.dragging = false;
      document.removeEventListener('mousemove', this.onDocumentMouseMove);
      document.removeEventListener('mouseup', this.onDocumentMouseUp);
      document.body.style.userSelect = '';
    }
    this.thumbHeight = 0;
    this.thumbTop = 0;
  }

  private onScroll = () => {
    this.scheduleUpdate();
  };

  /**
   * 立即刷新滑块位置。
   * 用场景：程序化修改 scrollTop 发生在浏览器处理滚动事件之后，
   * 等 scroll 事件再调度要晚一帧，滑块会先按旧的滚动位置画出来。
   */
  refresh(): void {
    if (this.frame) {
      cancelAnimationFrame(this.frame);
      this.frame = 0;
    }
    this.zone.run(() => this.update());
  }

  private scheduleUpdate() {
    if (this.frame) return;
    this.frame = requestAnimationFrame(() => {
      this.frame = 0;
      /* 观察者回调不在 Angular zone 内，手动进入以刷新视图 */
      this.zone.run(() => this.update());
    });
  }

  private update() {
    let target = this.target;
    let track = this.track?.nativeElement;
    if (!target || !track) return;

    let view = target.clientHeight;
    let content = target.scrollHeight;
    let trackHeight = track.clientHeight;

    /* 几像素的溢出不是真的能滚，多半是为了稳定文字绘制预留的（见 tree-multiple.less），不显示滑块 */
    if (view <= 0 || content - view <= ScrollBarComponent.MIN_OVERFLOW || trackHeight <= 0) {
      this.thumbHeight = 0;
      this.thumbTop = 0;
      return;
    }

    let height = Math.max(this.minThumb, (view / content) * trackHeight);
    height = Math.min(height, trackHeight);

    let maxTop = trackHeight - height;
    let maxScroll = content - view;

    this.thumbHeight = height;
    this.thumbTop = maxScroll > 0 ? (target.scrollTop / maxScroll) * maxTop : 0;
  }

  // -------------------
  // 轨道点击
  // -------------------
  onTrackMouseDown(e: MouseEvent) {
    let target = this.target;
    let track = this.track?.nativeElement;
    if (!target || !track || e.target !== track) return;

    let maxTop = track.clientHeight - this.thumbHeight;
    let maxScroll = target.scrollHeight - target.clientHeight;
    if (maxTop <= 0 || maxScroll <= ScrollBarComponent.MIN_OVERFLOW) return;

    let box = track.getBoundingClientRect();
    let y = e.clientY - box.top - this.thumbHeight / 2;
    let ratio = Math.max(0, Math.min(1, y / maxTop));

    target.scrollTop = ratio * maxScroll;
    this.update();
  }

  // -------------------
  // 拖动滑块
  // -------------------
  onThumbMouseDown(e: MouseEvent) {
    let target = this.target;
    if (!target) return;

    e.preventDefault();
    e.stopPropagation();

    this.dragging = true;
    this.dragY = e.clientY;
    this.dragTop = target.scrollTop;

    document.addEventListener('mousemove', this.onDocumentMouseMove);
    document.addEventListener('mouseup', this.onDocumentMouseUp);
    document.body.style.userSelect = 'none';
  }

  private onDocumentMouseMove = (e: MouseEvent) => {
    let target = this.target;
    let track = this.track?.nativeElement;
    if (!this.dragging || !target || !track) return;

    let maxTop = track.clientHeight - this.thumbHeight;
    let maxScroll = target.scrollHeight - target.clientHeight;
    if (maxTop <= 0 || maxScroll <= ScrollBarComponent.MIN_OVERFLOW) return;

    let delta = e.clientY - this.dragY;
    target.scrollTop = this.dragTop + (delta / maxTop) * maxScroll;
  };

  private onDocumentMouseUp = () => {
    this.dragging = false;
    document.removeEventListener('mousemove', this.onDocumentMouseMove);
    document.removeEventListener('mouseup', this.onDocumentMouseUp);
    document.body.style.userSelect = '';
  };

  // -------------------
  // 滚轮
  // -------------------
  onWheel(e: WheelEvent) {
    let target = this.target;
    if (!target) return;

    e.preventDefault();
    target.scrollTop += e.deltaY;
  }
}
