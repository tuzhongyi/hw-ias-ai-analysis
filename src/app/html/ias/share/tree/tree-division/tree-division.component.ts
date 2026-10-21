import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChange,
  SimpleChanges,
} from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { InputIconComponent } from '../../../../../common/components/input-icon/input-icon.component';
import { TreeComponent } from '../../../../../common/components/tree/component/tree.component';
import { FlatTreeNode } from '../../../../../common/components/tree/component/tree.model';
import { ArmDivisionType } from '../../../../../common/data-core/enums/division/divison-type.enum';
import { Division } from '../../../../../common/data-core/models/arm/division/division.model';
import { TreeDivisionBusiness } from './tree-division.business';

@Component({
  selector: 'ias-tree-division',
  imports: [TreeComponent, InputIconComponent],
  templateUrl: './tree-division.component.html',
  styleUrl: './tree-division.component.less',
  providers: [TreeDivisionBusiness],
})
export class TreeDivisionComponent implements OnInit, OnChanges {
  /** 当前选中的区划 ID，支持 [(selectedId)] */
  @Input() selectedId?: string;
  @Output() selectedIdChange = new EventEmitter<string>();
  /** 默认展开深度，0 = 全部收起 */
  @Input() displaydeep = 1;
  /** 名称过滤，非空时只显示匹配项及其祖先，并自动展开 */
  @Input() name = '';
  /** 是否显示顶部搜索框 */
  @Input() searchable = true;
  /** 不参与显示的区划 ID（连同其所有下级），例如选择上级时排除自身 */
  @Input() excludeIds?: string[];
  /** 不参与显示的区划根 ID（连同其所有下级），用于排除自身及其子树 */
  @Input() excludeRootId?: string;
  /** 渲染后把选中节点滚动到可视区域 */
  @Input() scrollToSelected = false;
  /** 允许显示的区划类型，为空表示不限制 */
  @Input() enabletypes: ArmDivisionType[] = [];
  @Output() nodeClick = new EventEmitter<Division>();
  @Output() nodeDblclick = new EventEmitter<Division>();

  nodes: FlatTreeNode<Division>[] = [];

  private divisions: Division[] = [];
  /** 用户手动展开/收起的节点，重新加载后保持不变 */
  private expanded = new Map<string, boolean>();

  constructor(
    private business: TreeDivisionBusiness,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.load();
  }

  ngOnChanges(changes: SimpleChanges): void {
    /* 模板里 enabletypes 可能写成字面量数组，内容没变就不重建 */
    let update =
      !!changes['name'] ||
      !!changes['excludeIds'] ||
      !!changes['excludeRootId'] ||
      (!!changes['enabletypes'] && !this.same(changes['enabletypes']));

    if (update) {
      this.update();
    } else if (changes['displaydeep']) {
      this.applyExpand();
    } else if (changes['selectedId']) {
      this.revealSelected();
    }
  }

  private same(change: SimpleChange) {
    let previous: ArmDivisionType[] = change.previousValue ?? [];
    let current: ArmDivisionType[] = change.currentValue ?? [];
    return (
      previous.length === current.length &&
      previous.every((x) => current.includes(x))
    );
  }

  /** 区划增删改后由外部调用，清缓存并重新拉取 */
  reload() {
    this.business.clear();
    this.load();
  }

  private load() {
    this.business
      .all()
      .then((x) => {
        this.divisions = x;
        this.update();
      })
      .catch((error) => {
        console.error(error);
        this.toastr.error('加载区划失败');
      });
  }

  private update() {
    let excludeIds = this.excludeIds ?? [];
    if (this.excludeRootId && !excludeIds.includes(this.excludeRootId)) {
      excludeIds = [...excludeIds, this.excludeRootId];
    }
    this.nodes = this.business.convert(
      this.divisions,
      this.name,
      excludeIds,
      this.enabletypes
    );
    this.revealSelected();
    this.applyExpand();
  }

  /**
   * 展开选中节点的所有上级，保证它在树里可见。
   * 重置展开状态，使已有选中值时只展开其上级路径。
   */
  private revealSelected() {
    if (!this.selectedId) return;
    this.expanded.clear();
    let map = new Map<string, FlatTreeNode<Division>>();
    for (const node of this.nodes) {
      map.set(node.id, node);
    }
    let current = map.get(this.selectedId);
    while (current?.parentId) {
      let parent = map.get(current.parentId);
      if (!parent) break;
      this.expanded.set(parent.id, true);
      parent.expanded = true;
      current = parent;
    }
  }

  /* 展开状态由本组件维护，转交给 hw-tree 时关闭它的自动展开 */
  private applyExpand() {
    for (const node of this.nodes) {
      if (!node.expandable) continue;
      if (this.name) {
        node.expanded = true;
      } else if (this.selectedId) {
        node.expanded = this.expanded.get(node.id) ?? false;
      } else if (this.expanded.has(node.id)) {
        node.expanded = this.expanded.get(node.id);
      } else {
        node.expanded = node.level < this.displaydeep;
      }
    }
  }

  onsearch(value: string) {
    this.name = value;
    this.update();
  }

  onselected(id: string) {
    this.selectedId = id;
    this.selectedIdChange.emit(id);
  }

  onnode(node: FlatTreeNode<Division>) {
    if (node.data) {
      this.nodeClick.emit(node.data);
    }
  }

  ondblclick(node: FlatTreeNode<Division>) {
    if (node.data) {
      this.nodeDblclick.emit(node.data);
    }
  }

  ontoggle(node: FlatTreeNode<Division>) {
    if (node.expandable) {
      this.expanded.set(node.id, !!node.expanded);
    }
  }
}
