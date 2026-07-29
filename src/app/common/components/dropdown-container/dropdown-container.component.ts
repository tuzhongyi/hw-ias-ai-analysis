import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'dropdown-container',
  imports: [CommonModule],
  templateUrl: './dropdown-container.component.html',
  styleUrl: './dropdown-container.component.less',
})
export class DropdownContainerComponent {
  /** 触发方式：hover 鼠标悬停 / click 点击 */
  @Input() trigger: 'hover' | 'click' = 'click';

  /** 未选中时显示的文本 */
  @Input() placeholder = '';

  /** 是否禁用 */
  @Input() disabled = false;

  /** 下拉面板打开/关闭事件 */
  @Output() opened = new EventEmitter<void>();
  /** 下拉面板打开/关闭事件 */
  @Output() closed = new EventEmitter<void>();

  show = false;
  private closeTimer?: ReturnType<typeof setTimeout>;

  onMouseEnter() {
    if (this.disabled) return;
    if (this.trigger === 'hover') {
      clearTimeout(this.closeTimer);
      this.open();
    }
  }

  onMouseLeave() {
    if (this.trigger === 'hover') {
      this.closeTimer = setTimeout(() => this.close(), 150);
    }
  }

  onClick() {
    if (this.disabled) return;
    if (this.trigger === 'click') {
      this.show ? this.close() : this.open();
    }
  }

  onOverlayClick() {
    this.close();
  }

  private open() {
    if (this.show) return;
    this.show = true;
    this.opened.emit();
  }

  close() {
    if (!this.show) return;
    this.show = false;
    this.closed.emit();
  }
}
