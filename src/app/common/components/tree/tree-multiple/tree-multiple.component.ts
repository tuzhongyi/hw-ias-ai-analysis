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
import {
  ScrollBarComponent,
  ScrollBarMark,
} from '../../scroll-bar/scroll-bar.component';
import { FlatTreeNode } from '../component/tree.model';
export type { FlatTreeNode };

/** 滚动条标记颜色 */
const MARK_COLOR = '#ffba00';

@Component({
  selector: 'ias-tree-multiple',
  standalone: true,
  imports: [ScrollBarComponent],
  templateUrl: './tree-multiple.component.html',
  styleUrl: './tree-multiple.component.less',
})
export class TreeMultipleComponent implements OnChanges, AfterViewChecked {
  @Input() nodes: FlatTreeNode[] = [];
  /** 勾选的节点 ID，支持 [(selectedIds)] */
  @Input() selectedIds: string[] = [];
  @Output() selectedIdsChange = new EventEmitter<string[]>();
  /** 默认展开深度（level < displaydeep 的节点自动展开），默认 1 = 仅根展开 */
  @Input() displaydeep = 1;
  /** 节点变化时是否自动应用默认展开深度；false 时由外部维护展开状态 */
  @Input() autoExpand = true;
  /** 渲染后把第一条勾选节点滚动到顶部 */
  @Input() scrollToSelected = false;
  /** 使用模拟滚动条，并在轨道上标出勾选节点 */
  @Input() scrollbar = true;
  /** 勾选/取消父节点时，是否连带勾选/取消它的所有子节点（含被收起的），默认关闭 */
  @Input() cascadeCheck = false;

  @Output() nodeClick = new EventEmitter<FlatTreeNode>();
  @Output() nodeDblclick = new EventEmitter<FlatTreeNode>();
  @Output() toggle = new EventEmitter<FlatTreeNode>();
  @Output() action = new EventEmitter<{ action: string; node: FlatTreeNode }>();

  constructor() {}

  @ViewChild('container')
  container?: ElementRef<HTMLElement>;
  @ViewChild(ScrollBarComponent)
  scrollBar?: ScrollBarComponent;
  /** 首次加载节点后定位一次，后续勾选变化不再跟随滚动 */
  private initialScrollPending = false;
  private initialScrollDone = false;
  /** 等待下一帧再定位：展开/渲染完成前容器尺寸可能还未稳定 */
  private scrollScheduled = false;
  private scrollAttempts = 0;
  private static readonly SCROLL_ATTEMPTS = 20;

  ngOnChanges(changes: SimpleChanges): void {
    /* 只在节点第一次加载时定位 */
    if (
      changes['nodes'] &&
      this.scrollToSelected &&
      !this.initialScrollDone &&
      !this.initialScrollPending &&
      this.nodes.length > 0
    ) {
      this.initialScrollPending = true;
      this.scrollAttempts = 0;
    }
    if (this.autoExpand && (changes['nodes'] || changes['displaydeep'])) {
      this.applyExpandDeep();
    }
  }

  ngAfterViewChecked(): void {
    this.tryInitialScroll();
  }

  /** 首次加载后把第一条勾选节点顶到最上方，成功或放弃后不再处理 */
  private tryInitialScroll() {
    if (!this.initialScrollPending || this.scrollScheduled) return;

    let id = this.firstSelectedId;
    if (!id) {
      /* 首次加载时没有勾选项，后续勾选也不再自动定位 */
      this.initialScrollPending = false;
      this.initialScrollDone = true;
      return;
    }
    if (this.scrollAttempts >= TreeMultipleComponent.SCROLL_ATTEMPTS) {
      this.initialScrollPending = false;
      this.initialScrollDone = true;
      return;
    }

    this.scrollScheduled = true;
    requestAnimationFrame(() => {
      this.scrollScheduled = false;
      if (!this.initialScrollPending) return;
      this.scrollAttempts++;

      let node = this.nodeElement(id as string);
      if (node && this.scrollToTop(node)) {
        this.initialScrollPending = false;
        this.initialScrollDone = true;
        return;
      }
      /* 布局还没稳定，下一帧继续 */
      this.tryInitialScroll();
    });
  }

  /** 树中可见的第一条勾选节点（按展示顺序） */
  private get firstSelectedId(): string | undefined {
    for (const node of this.visibleNodes) {
      if (this.selectedIds.includes(node.id)) {
        return node.id;
      }
    }
    return undefined;
  }

  private nodeElement(id: string): HTMLElement | null {
    let container = this.container?.nativeElement;
    if (!container) return null;
    let nodes = container.querySelectorAll<HTMLElement>(
      '.hw-tree-multiple-node',
    );
    for (const node of Array.from(nodes)) {
      if (node.getAttribute('data-node-id') === id) {
        return node;
      }
    }
    return null;
  }

  /** 把节点顶到容器最上方，只滚动树自身的容器 */
  private scrollToTop(node: HTMLElement): boolean {
    let container = this.container?.nativeElement;
    if (!container) return false;
    /* 容器还没有高度时先不处理，留给下一帧重试 */
    if (container.clientHeight === 0) return false;
    let box = container.getBoundingClientRect();
    let target = node.getBoundingClientRect();
    container.scrollTop += target.top - box.top;
    /*
      模拟滚动条原本会在下一帧才根据 scroll 事件刷新滑块，
      而它的首帧更新排在这次滚动之前，会先画出“滑块在顶部”，下一帧再跳到正确位置。
      这里同一帧立即刷新，内容和滑块一起画出来。
    */
    this.scrollBar?.refresh();
    return true;
  }

  /** 勾选节点在滚动条上的彩色标记（VS Code 概览尺效果） */
  get marks(): ScrollBarMark[] {
    let nodes = this.visibleNodes;
    if (nodes.length === 0 || this.selectedIds.length === 0) return [];

    let ids = new Set(this.selectedIds);
    let marks: ScrollBarMark[] = [];
    for (let i = 0; i < nodes.length; i++) {
      if (!ids.has(nodes[i].id)) continue;
      marks.push({
        position: i / nodes.length,
        size: 1 / nodes.length,
        color: MARK_COLOR,
      });
    }
    return marks;
  }

  isChecked(node: FlatTreeNode): boolean {
    return this.selectedIds.includes(node.id);
  }

  /** 勾选 / 取消勾选，行点击与 checkbox 都走这里 */
  onCheck(node: FlatTreeNode): void {
    let checked = !this.isChecked(node);
    let ids = [node.id];
    if (this.cascadeCheck) {
      ids = ids.concat(this.descendantIds(node.id));
    }

    let selected = new Set(this.selectedIds);
    for (const id of ids) {
      if (checked) {
        selected.add(id);
      } else {
        selected.delete(id);
      }
    }
    this.selectedIds = Array.from(selected);
    this.selectedIdsChange.emit(this.selectedIds);
  }

  /** 所有子孙节点 ID（不区分是否展开，收起节点的子节点也要跟着变） */
  private descendantIds(id: string): string[] {
    let ids: string[] = [];
    for (const node of this.nodes) {
      if (this.isDescendant(node, id)) {
        ids.push(node.id);
      }
    }
    return ids;
  }

  private isDescendant(node: FlatTreeNode, ancestorId: string): boolean {
    let parentId = node.parentId;
    while (parentId) {
      if (parentId === ancestorId) return true;
      parentId = this.nodes.find((x) => x.id === parentId)?.parentId;
    }
    return false;
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

  private isAncestorCollapsed(
    parentId: string,
    collapsed: Set<string>,
  ): boolean {
    if (collapsed.has(parentId)) return true;
    const parent = this.nodes.find((n) => n.id === parentId);
    if (parent?.parentId) {
      return this.isAncestorCollapsed(parent.parentId, collapsed);
    }
    return false;
  }

  onTreeClick(e: MouseEvent): void {
    const target = e.target as HTMLElement;
    /* 展开箭头与 checkbox 自己处理并阻止冒泡，这里只兜底 */
    if (target.closest('.hw-tree-multiple-check')) return;

    /* 向上查找带 action class 的元素（处理 <div><i/></div> 嵌套） */
    let actionClass = '';
    let actionEl: HTMLElement | null = target;
    while (actionEl && actionEl !== e.currentTarget) {
      // 用 getAttribute 取类名，innerHTML 里若出现 SVG，className 不是字符串
      const value = actionEl.getAttribute('class') ?? '';
      if (value.includes('hw-tree-action-')) {
        actionClass = value;
        break;
      }
      actionEl = actionEl.parentElement;
    }
    if (actionClass) {
      e.stopPropagation();
      let actionName: string | null = null;
      if (actionClass.includes('hw-tree-action-bind')) actionName = 'bind';
      else if (actionClass.includes('hw-tree-action-unbind'))
        actionName = 'unbind';
      else if (actionClass.includes('hw-tree-action-position'))
        actionName = 'position';
      else if (actionClass.includes('hw-tree-action-download'))
        actionName = 'download';
      else if (actionClass.includes('hw-tree-action-play')) actionName = 'play';

      const node = this.nodeOf(target);
      if (node && actionName) {
        this.action.emit({ action: actionName, node });
      }
      return;
    }

    const node = this.nodeOf(target);
    if (!node) return;
    this.onCheck(node);
    this.nodeClick.emit(node);
  }

  onTreeDblclick(e: MouseEvent): void {
    const target = e.target as HTMLElement;
    // 双击展开箭头、checkbox 或操作按钮时不视为双击节点
    if (
      target.closest('.hw-tree-multiple-toggle') ||
      target.closest('.hw-tree-multiple-check') ||
      target.closest('[class*="hw-tree-action-"]')
    ) {
      return;
    }
    const node = this.nodeOf(target);
    if (node) this.nodeDblclick.emit(node);
  }

  onToggle(node: FlatTreeNode): void {
    if (node.expandable) {
      node.expanded = !node.expanded;
      this.toggle.emit(node);
    }
  }

  private nodeOf(target: HTMLElement): FlatTreeNode | undefined {
    const nodeId = target
      .closest('[data-node-id]')
      ?.getAttribute('data-node-id');
    if (!nodeId) return undefined;
    return this.nodes.find((n) => n.id === nodeId);
  }
}
