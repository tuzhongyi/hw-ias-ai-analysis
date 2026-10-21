import { DOCUMENT } from '@angular/common';
import {
  Component,
  EventEmitter,
  Inject,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { Subscription, fromEvent } from 'rxjs';
import { ArmDivisionType } from '../../../../../common/data-core/enums/division/divison-type.enum';
import { Division } from '../../../../../common/data-core/models/arm/division/division.model';
import { TreeDivisionComponent } from '../../tree/tree-division/tree-division.component';

@Component({
  selector: 'ias-select-division-tree',
  imports: [TreeDivisionComponent],
  templateUrl: './select-division-tree.component.html',
  styleUrl: './select-division-tree.component.less',
})
export class SelectDivisionTreeComponent implements OnInit, OnDestroy {
  /** 当前选中的区划，支持 [(selected)] */
  @Input() selected?: Division;
  @Output() selectedChange = new EventEmitter<Division | undefined>();
  /** 是否允许清空（有选中值时显示 ×） */
  @Input() nullable = false;
  /** 未选择时的占位文案 */
  @Input() nulltext = '请选择';
  /** 树默认展开深度 */
  @Input() displaydeep = 1;
  /** 树顶部是否显示搜索框 */
  @Input() searchable = true;
  /** 不参与显示的区划 ID（连同其所有下级），例如选择上级时排除自身 */
  @Input() excludeIds?: string[];
  /** 不参与显示的区划根 ID（连同其所有下级），用于排除自身及其子树 */
  @Input() excludeRootId?: string;
  /** 展开时把选中节点滚动到可视区域 */
  @Input() scrollToSelected = true;
  @Input() enabletypes: ArmDivisionType[] = [];

  show = false;

  private subscription = new Subscription();

  constructor(@Inject(DOCUMENT) private document: Document) {}

  ngOnInit(): void {
    this.subscription.add(
      fromEvent(this.document.body, 'click').subscribe(() => {
        this.show = false;
      }),
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  toggle(e: Event) {
    e.stopPropagation();
    this.show = !this.show;
  }

  onnode(data: Division) {
    this.selected = data;
    this.selectedChange.emit(data);
    this.show = false;
  }

  onclear(e: Event) {
    e.stopPropagation();
    this.selected = undefined;
    this.selectedChange.emit(undefined);
    this.show = false;
  }
}
