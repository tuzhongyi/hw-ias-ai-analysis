import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { WheelHorizontalScrollDirective } from '../../../../../../common/directives/wheel-horizontal-scroll/wheel-horizontal-scroll.directive';

@Component({
  selector: 'ias-system-module-shop-registration-information-subnames',
  imports: [CommonModule, FormsModule, WheelHorizontalScrollDirective],
  templateUrl:
    './system-module-shop-registration-information-subnames.component.html',
  styleUrl:
    './system-module-shop-registration-information-subnames.component.less',
})
export class SystemModuleShopRegistrationInformationSubnamesComponent
  implements OnInit
{
  @Input('datas') datas?: string[] = [];
  @Output() datasChange = new EventEmitter<string[]>();
  @Output() add = new EventEmitter<void>();

  constructor() {}

  ngOnInit(): void {}

  onremove(index: number) {
    if (this.datas) {
      this.datas.splice(index, 1);
    }
  }

  onadd() {
    this.add.emit();
  }
}
