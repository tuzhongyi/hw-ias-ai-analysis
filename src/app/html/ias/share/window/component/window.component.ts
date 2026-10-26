import { Component, DoCheck, HostListener, OnDestroy } from '@angular/core';
import { WindowComponent as WindowControl } from '../../../../../common/components/window-control/window.component';
import { ContentHeaderComponent } from '../../header/content-header/content-header.component';

@Component({
  selector: 'ias-window',
  imports: [WindowControl, ContentHeaderComponent],
  templateUrl: './window.component.html',
  styleUrl: './window.component.less',
})
export class WindowComponent
  extends WindowControl
  implements DoCheck, OnDestroy
{
  /** 打开着的窗口，越往后越靠上层；ESC 只关最上面那一个 */
  private static opened: WindowComponent[] = [];
  private shown = false;

  protected override _style: any = {
    width: '80%',
    height: '80%',
    position: 'absolute',
    transform: 'translate(-50%, -50%)',
    top: '50%',
    left: '50%',
    paddingTop: 0,
  };

  /**
   * Model.show 是外部直接改的对象属性，没有 @Input 变更可监听，
   * 只能每轮变更检测自己看一眼，打开时把窗口挪到栈顶
   */
  ngDoCheck(): void {
    let show = this.Model?.show === true;
    if (show && !this.shown) {
      WindowComponent.opened = WindowComponent.opened.filter(
        (x) => x !== this,
      );
      WindowComponent.opened.push(this);
    }
    this.shown = show;
  }

  ngOnDestroy(): void {
    WindowComponent.opened = WindowComponent.opened.filter((x) => x !== this);
  }

  @HostListener('document:keydown.escape', ['$event'])
  onescape(event: Event) {
    // 全屏时 ESC 先退全屏；内层控件已经处理过的也不再抢
    if (event.defaultPrevented || document.fullscreenElement) {
      return;
    }
    // 嵌套窗口（详情上面再开视频、确认框等）只关最上层
    if (WindowComponent.top !== this) {
      return;
    }
    // 与右上角关闭按钮走同一条路：manualClose 为 false 时顺带收起 Model
    this.closeButtonClick();
  }

  private static get top(): WindowComponent | undefined {
    for (let i = WindowComponent.opened.length - 1; i >= 0; i--) {
      if (WindowComponent.opened[i].Model?.show === true) {
        return WindowComponent.opened[i];
      }
    }
    return undefined;
  }

  onclose() {
    this.close.emit();
  }
}
