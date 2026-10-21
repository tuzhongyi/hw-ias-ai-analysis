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
import { FlatTreeNode } from '../../../../../common/components/tree/component/tree.model';
import { TreeMultipleComponent } from '../../../../../common/components/tree/tree-multiple/tree-multiple.component';
import { ArmDivisionType } from '../../../../../common/data-core/enums/division/divison-type.enum';
import { Division } from '../../../../../common/data-core/models/arm/division/division.model';
import { TreeDivisionBusiness } from '../tree-division/tree-division.business';

@Component({
  selector: 'ias-tree-division-multiple',
  imports: [TreeMultipleComponent, InputIconComponent],
  templateUrl: './tree-division-multiple.component.html',
  styleUrl: './tree-division-multiple.component.less',
  providers: [TreeDivisionBusiness],
})
export class TreeDivisionMultipleComponent implements OnInit, OnChanges {
  /** 勾选的区划 ID，支持 [(selectedIds)] */
  @Input() selectedIds: string[] = [];
  @Output() selectedIdsChange = new EventEmitter<string[]>();
  /** 勾选变化时输出对应的区划对象 */
  @Output() selectedChange = new EventEmitter<Division[]>();
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
  /** 允许显示的区划类型，为空表示不限制 */
  @Input() enabletypes: ArmDivisionType[] = [];
  @Output() nodeClick = new EventEmitter<Division>();
  @Output() nodeDblclick = new EventEmitter<Division>();

  nodes: FlatTreeNode<Division>[] = [];

  private divisions: Division[] = [];
  /** 用户手动展开/收起的节点，重新加载后保持不变 */
  private expanded = new Map<string, boolean>();
  /** 有勾选项时保持展开的节点：所有勾选项的上级路径 */
  private revealed = new Set<string>();
  /** 首次加载是否已经按勾选项收缩过；之后不再干预展开状态 */
  private initialExpandApplied = false;

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
    }
    /* selectedIds 变化不调整展开状态，避免勾选时节点自动收缩 */
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
   * 记录所有勾选节点的上级路径。
   * 有勾选项时只有这些节点保持展开，其余节点一律收起。
   */
  private revealSelected() {
    this.revealed.clear();
    if (this.selectedIds.length === 0) return;
    let map = new Map<string, FlatTreeNode<Division>>();
    for (const node of this.nodes) {
      map.set(node.id, node);
    }
    for (const id of this.selectedIds) {
      let current = map.get(id);
      while (current?.parentId) {
        let parent = map.get(current.parentId);
        if (!parent) break;
        this.revealed.add(parent.id);
        current = parent;
      }
    }
  }

  /* 展开状态由本组件维护，转交给树时关闭它的自动展开 */
  private applyExpand() {
    /* 只有首次加载按勾选项收缩，之后的勾选变化不再影响展开状态 */
    let collapseUnselected =
      this.selectedIds.length > 0 && !this.initialExpandApplied;
    for (const node of this.nodes) {
      if (!node.expandable) continue;
      if (this.name) {
        node.expanded = true;
      } else if (collapseUnselected) {
        /* 有勾选项：只展开通往勾选项的路径 */
        node.expanded = this.revealed.has(node.id);
      } else if (this.expanded.has(node.id)) {
        node.expanded = this.expanded.get(node.id);
      } else {
        node.expanded = node.level < this.displaydeep;
      }
    }
    /* 数据还没加载（节点为空）时不算应用过 */
    if (this.nodes.length > 0) {
      this.initialExpandApplied = true;
    }
  }

  onsearch(value: string) {
    this.name = value;
    this.update();
  }

  onselected(ids: string[]) {
    this.selectedIds = ids;
    this.selectedIdsChange.emit(ids);

    let selected: Division[] = [];
    for (const node of this.nodes) {
      if (node.data && ids.includes(node.id)) {
        selected.push(node.data);
      }
    }
    this.selectedChange.emit(selected);
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
