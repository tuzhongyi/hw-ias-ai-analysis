import { CommonModule } from '@angular/common';
import {
  AfterContentInit,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ISelection } from '../../../../../common/components/common-label-select/common-label-select.model';
import { ShopObjectState } from '../../../../../common/data-core/enums/analysis/shop-object-state.enum';
import { EnumNameValue } from '../../../../../common/data-core/models/capabilities/enum-name-value.model';

import { SourceManager } from '../../../../../common/data-core/requests/managers/source/source.manager';
import { ClassTool } from '../../../../../common/tools/class-tool/class.tool';

@Component({
  selector: 'ias-select-shop-object-state',
  imports: [CommonModule, FormsModule],
  templateUrl: './select-shop-object-state.component.html',
  styleUrl: './select-shop-object-state.component.less',
})
export class SelectShopObjectStateComponent
  implements ISelection<ShopObjectState>, OnInit, AfterContentInit
{
  @Input() selected: EnumNameValue<ShopObjectState>[] = [];
  @Output() selectedChange = new EventEmitter<
    EnumNameValue<ShopObjectState>[]
  >();
  @Output() loaded = new EventEmitter<EnumNameValue<ShopObjectState>[]>();

  constructor(source: SourceManager) {
    this.datas = source.analysis.shop.ShopObjectStates.get();
  }

  datas: Promise<EnumNameValue<ShopObjectState>[]>;

  ngAfterContentInit(): void {}
  ngOnInit(): void {
    this.datas.then((x) => {
      this.loaded.emit(x);
    });
  }

  toggleNodes(
    item: EnumNameValue<ShopObjectState>,
    clear?: boolean | undefined
  ): void {
    let index = this.selected.findIndex((x) =>
      ClassTool.equals.EnumNameValue(x, item)
    );

    if (index < 0) {
      this.selected.push(item);
    } else {
      this.selected.splice(index, 1);
    }
  }

  onchange(item: EnumNameValue<ShopObjectState>) {
    let index = this.selected.findIndex((x) =>
      ClassTool.equals.EnumNameValue(x, item)
    );

    if (index < 0) {
      this.selected.push(item);
    } else {
      this.selected.splice(index, 1);
    }
    this.selectedChange.emit(this.selected);
  }
}
