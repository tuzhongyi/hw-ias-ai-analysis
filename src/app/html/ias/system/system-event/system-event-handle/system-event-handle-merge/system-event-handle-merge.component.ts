import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ShopRegistration } from '../../../../../../common/data-core/models/arm/analysis/shop-registration.model';
import { MobileEventRecord } from '../../../../../../common/data-core/models/arm/event/mobile-event-record.model';
import { TextSpaceBetweenDirective } from '../../../../../../common/directives/text-space-between/text-space-between.directive';

@Component({
  selector: 'ias-system-event-handle-merge',
  imports: [CommonModule, FormsModule, TextSpaceBetweenDirective],
  templateUrl: './system-event-handle-merge.component.html',
  styleUrl: './system-event-handle-merge.component.less',
})
export class SystemEventHandleMergeComponent {
  @Input() data?: MobileEventRecord;
  @Input() name = '';
  @Output() nameChange = new EventEmitter<string>();
  @Input() is: boolean = false;
  @Output() isChange = new EventEmitter<boolean>();
  @Input() registration?: ShopRegistration;

  @Output() choose = new EventEmitter<MobileEventRecord>();

  onname() {
    this.nameChange.emit(this.name);
  }

  onmain() {
    this.is = false;
    this.isChange.emit(this.is);
  }
  onsub() {
    this.is = true;
    this.isChange.emit(this.is);
  }

  onchoose() {
    if (this.data) {
      this.choose.emit(this.data);
    }
  }
}
