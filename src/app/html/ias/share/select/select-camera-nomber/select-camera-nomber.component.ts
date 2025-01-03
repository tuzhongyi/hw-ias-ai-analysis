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

@Component({
  selector: 'ias-select-camera-nomber',
  imports: [CommonModule, FormsModule],
  templateUrl: './select-camera-nomber.component.html',
  styleUrl: './select-camera-nomber.component.less',
})
export class SelectCameraNumberComponent
  implements ISelection<string>, OnInit, AfterContentInit
{
  @Input() selected: EnumNameValue<string>[] = [];
  @Output() selectedChange = new EventEmitter<EnumNameValue<string>[]>();

  @Output() loaded = new EventEmitter<EnumNameValue<string>[]>();
  constructor() {}
  ngAfterContentInit(): void {}
  ngOnInit(): void {
    for (let i = 0; i < 4; i++) {
      let n = i + 1;
      this.datas.push(new EnumNameValue<string>(n.toString(), n.toString()));
    }

    this.loaded.emit(this.datas);
  }
  toggleNodes(item: EnumNameValue<string>, clear?: boolean | undefined): void {
    let index = this.selected.findIndex((x) => x.equals(item));

    if (index < 0) {
      this.selected.push(item);
    } else {
      this.selected.splice(index, 1);
    }
  }

  datas: EnumNameValue<string>[] = [];

  onchange(item: EnumNameValue<string>) {
    let index = this.selected.findIndex((x) => x.equals(item));

    if (index < 0) {
      this.selected.push(item);
    } else {
      this.selected.splice(index, 1);
    }
    this.selectedChange.emit(this.selected);
  }
}
