import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { ShopRegistration } from '../../../../../../../common/data-core/models/arm/geographic/shop-registration.model';

@Component({
  selector: 'ias-system-task-shop-registration-info',
  imports: [CommonModule],
  templateUrl: './system-task-shop-registration-info.component.html',
  styleUrl: './system-task-shop-registration-info.component.less',
})
export class SystemTaskShopRegistrationInfoComponent {
  @Input() data?: ShopRegistration;
}
