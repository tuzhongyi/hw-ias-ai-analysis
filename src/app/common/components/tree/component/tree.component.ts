import {
  AfterViewChecked,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { FlatTreeNode } from './tree.model';
export type { FlatTreeNode };

@Component({
  selector: 'hw-tree',
  standalone: true,
  templateUrl: './tree.component.html',
  styleUrl: './tree.component.less',
})
export class TreeComponent implements OnChanges, AfterViewChecked {
  @Input() nodes: FlatTreeNode[] = [];
  @Input() selectedId?: string;
  /** 默认展开深度（level < displaydeep 的节点自动展开），默认 1 = 仅根展开 */
  @Input() displaydeep = 1;
  /** 节点变化时是否自动应用默认展开深度；false 时由外部维护展开状态 */
  @Input() autoExpand = true;
  /** 渲染后把选中节点滚动到可视区域 */
  @Input() scrollToSelected = false;
  @Output() selectedIdChange = new EventEmitter<string>();
  @Output() nodeClick = new EventEmitter<FlatTreeNode>();
  @Output() nodeDblclick = new EventEmitter<FlatTreeNode>();
  @Output() toggle = new EventEmitter<FlatTreeNode>();
  @Output() action = new EventEmitter<{ action: string; node: FlatTreeNode }>();

  @ViewChild('container')
  container?: ElementRef<HTMLElement>;
  private scrolledId?: string;
  /** 等待下一帧再定位：展开/渲染完成前容器尺寸可能还未稳定 */
  private scrollScheduled = false;
  private scrollAttempts = 0;
  private static readonly SCROLL_ATTEMPTS = 5;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['nodes'] || changes['selectedId']) {
      /* 节点重新生成或选中项变化后，允许再次定位 */
      this.scrolledId = undefined;
      this.scrollAttempts = 0;
    }
    if (this.autoExpand && (changes['nodes'] || changes['displaydeep'])) {
      this.applyExpandDeep();
    }
  }

  ngAfterViewChecked(): void {
    if (!this.scrollToSelected || !this.selectedId) return;
    if (this.scrolledId === this.selectedId) return;
    if (this.scrollScheduled) return;
    if (this.scrollAttempts >= TreeComponent.SCROLL_ATTEMPTS) return;

    let id = this.selectedId;
    this.scrollScheduled = true;
    requestAnimationFrame(() => {
      this.scrollScheduled = false;
      this.scrollAttempts++;
      if (!this.scrollToSelected || this.selectedId !== id) return;
      let node = this.selectedElement(id);
      if (!node) return;
      if (this.scrollIntoView(node)) {
        this.scrolledId = id;
      }
    });
  }

  private selectedElement(id: string): HTMLElement | null {
    let container = this.container?.nativeElement;
    if (!container) return null;
    let nodes = container.querySelectorAll<HTMLElement>('.hw-tree-node');
    for (const node of Array.from(nodes)) {
      if (node.getAttribute('data-node-id') === id) {
        return node;
      }
    }
    return null;
  }

  /** 只滚动树自身的容器，避免带动页面一起滚动 */
  private scrollIntoView(node: HTMLElement): boolean {
    let container = this.container?.nativeElement;
    if (!container) return false;
    /* 容器还没有高度（下拉刚展开等）时先不处理，留给下一帧重试 */
    if (container.clientHeight === 0) return false;
    let box = container.getBoundingClientRect();
    let target = node.getBoundingClientRect();
    if (target.top < box.top) {
      container.scrollTop -= box.top - target.top;
    } else if (target.bottom > box.bottom) {
      container.scrollTop += target.bottom - box.bottom;
    }
    return true;
  }

  private applyExpandDeep(): void {
    for (const node of this.nodes) {
      if (!node.expandable) continue;
      node.expanded = node.level < this.displaydeep;
    }
  }

  /** 只返回可见节点（父级收起时隐藏子节点） */
  get visibleNodes(): FlatTreeNode[] {
    const collapsed = new Set<string>();
    for (const n of this.nodes) {
      if (n.expandable && !n.expanded) {
        collapsed.add(n.id);
      }
    }
    if (collapsed.size === 0) return this.nodes;
    return this.nodes.filter((n) => {
      if (!n.parentId) return true;
      return !this.isAncestorCollapsed(n.parentId, collapsed);
    });
  }

  private isAncestorCollapsed(parentId: string, collapsed: Set<string>): boolean {
    if (collapsed.has(parentId)) return true;
    const parent = this.nodes.find((n) => n.id === parentId);
    if (parent?.parentId) return this.isAncestorCollapsed(parent.parentId, collapsed);
    return false;
  }

  onTreeClick(e: MouseEvent): void {
    const target = e.target as HTMLElement;
    /* 向上查找带 action class 的元素（处理 <div><i/></div> 嵌套） */
    let cls = '';
    let actionEl: HTMLElement | null = target;
    while (actionEl && actionEl !== e.currentTarget) {
      // 用 getAttribute 取类名，innerHTML 里若出现 SVG，className 不是字符串
      const value = actionEl.getAttribute('class') ?? '';
      if (value.includes('hw-tree-action-')) {
        cls = value;
        break;
      }
      actionEl = actionEl.parentElement;
    }
    let actionName: string | null = null;
    if (cls.includes('hw-tree-action-bind')) actionName = 'bind';
    else if (cls.includes('hw-tree-action-unbind')) actionName = 'unbind';
    else if (cls.includes('hw-tree-action-position')) actionName = 'position';
    else if (cls.includes('hw-tree-action-download')) actionName = 'download';
    else if (cls.includes('hw-tree-action-play')) actionName = 'play';

    if (actionName) {
      e.stopPropagation();
      const nodeEl = target.closest('.hw-tree-node') as HTMLElement;
      const nodeId = nodeEl?.getAttribute('data-node-id');
      const node = this.nodes.find((n) => n.id === nodeId);
      if (node) {
        this.action.emit({ action: actionName, node });
        this.onSelect(node);
      }
      return;
    }
    /* 点击 content 或 actions 区域 → 选中节点 */
    const nodeId = target.closest('[data-node-id]')?.getAttribute('data-node-id');
    if (nodeId) {
      const node = this.nodes.find((n) => n.id === nodeId);
      if (node) this.onSelect(node);
    }
  }

  onSelect(node: FlatTreeNode): void {
    this.selectedId = node.id;
    this.selectedIdChange.emit(node.id);
    this.nodeClick.emit(node);
  }

  onTreeDblclick(e: MouseEvent): void {
    const target = e.target as HTMLElement;
    // 双击展开箭头或操作按钮时不视为双击节点
    if (target.closest('.hw-tree-toggle') || target.closest('[class*="hw-tree-action-"]')) return;
    const nodeId = target.closest('[data-node-id]')?.getAttribute('data-node-id');
    if (!nodeId) return;
    const node = this.nodes.find((n) => n.id === nodeId);
    if (node) this.nodeDblclick.emit(node);
  }

  onToggle(node: FlatTreeNode): void {
    if (node.expandable) {
      node.expanded = !node.expanded;
      this.toggle.emit(node);
    }
  }
}
