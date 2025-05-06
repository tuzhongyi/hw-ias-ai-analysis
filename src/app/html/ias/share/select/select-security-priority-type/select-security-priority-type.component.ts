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

import { EnumNameValue } from '../../../../../common/data-core/models/capabilities/enum-name-value.model';
import { SourceManager } from '../../../../../common/data-core/requests/managers/source/source.manager';
import { ClassTool } from '../../../../../common/tools/class-tool/class.tool';

@Component({
  selector: 'ias-select-security-priority-type',
  imports: [CommonModule, FormsModule],
  templateUrl: './select-security-priority-type.component.html',
  styleUrl: './select-security-priority-type.component.less',
})
export class SelectSecurityPriorityTypeComponent
  implements ISelection<string>, OnInit, AfterContentInit
{
  @Input() selected: EnumNameValue<string>[] = [];
  @Output() selectedChange = new EventEmitter<EnumNameValue<string>[]>();
  @Output() loaded = new EventEmitter<EnumNameValue<string>[]>();

  constructor(source: SourceManager) {
    this.datas = source.security.PriorityTypes.get();
  }

  datas: Promise<EnumNameValue<string>[]>;

  ngAfterContentInit(): void {}
  ngOnInit(): void {
    this.datas.then((x) => {
      this.loaded.emit(x);
    });
  }

  toggleNodes(item: EnumNameValue<string>, clear?: boolean | undefined): void {
    let index = this.selected.findIndex((x) =>
      ClassTool.equals.EnumNameValue(x, item)
    );

    if (index < 0) {
      this.selected.push(item);
    } else {
      this.selected.splice(index, 1);
    }
  }

  onchange(item: EnumNameValue<string>) {
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
