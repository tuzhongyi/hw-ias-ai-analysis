import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { EventBlockedParams } from '../../../../../../common/data-core/requests/services/system/event/system-event.params';
import { TextSpaceBetweenDirective } from '../../../../../../common/directives/text-space-between/text-space-between.directive';
import { WheelInputNumberDirective } from '../../../../../../common/directives/wheel-input-number/wheel-input-number.directive';

@Component({
  selector: 'ias-system-event-process-blocked',
  imports: [
    CommonModule,
    FormsModule,
    TextSpaceBetweenDirective,
    WheelInputNumberDirective,
  ],
  templateUrl: './system-event-process-blocked.component.html',
  styleUrl: './system-event-process-blocked.component.less',
})
export class SystemEventProcessBlockedComponent {
  @Input() enabled = false;
  @Input() params = new EventBlockedParams();
  days = [7, 15, 30, 90, 180, 365];
}
