import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { InputIconComponent } from '../../../../../common/components/input-icon/input-icon.component';
import { Division } from '../../../../../common/data-core/models/arm/division/division.model';
import { TreeDivisionComponent } from '../../../share/tree/tree-division/tree-division.component';

@Component({
  selector: 'ias-management-division-tree',
  imports: [InputIconComponent, TreeDivisionComponent],
  templateUrl: './management-division-tree.component.html',
  styleUrl: './management-division-tree.component.less',
})
export class ManagementDivisionTreeComponent {
  /** 当前选中的区划 */
  @Input('data') selected?: Division;
  @Output() selectedChange = new EventEmitter<Division>();
  /** 添加，事件参数为选中的上级区划（可为空） */
  @Output() add = new EventEmitter<Division | undefined>();
  /** 编辑，事件参数为选中的区划 */
  @Output() edit = new EventEmitter<Division>();
  /** 删除，事件参数为选中的区划 */
  @Output() remove = new EventEmitter<Division>();

  @ViewChild(TreeDivisionComponent) private tree?: TreeDivisionComponent;

  /** 名称过滤关键字 */
  name = '';

  /** 区划增删改后刷新树 */
  reload() {
    this.tree?.reload();
  }

  onname(value: string) {
    this.name = value;
  }

  onnode(data: Division) {
    this.selectedChange.emit(data);
  }

  /* 双击直接进入编辑 */
  ondblclick(data: Division) {
    this.edit.emit(data);
  }

  onadd() {
    this.add.emit(this.selected);
  }

  onedit() {
    if (this.selected) {
      this.edit.emit(this.selected);
    }
  }

  onremove() {
    if (this.selected) {
      this.remove.emit(this.selected);
    }
  }
}
