import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ShopRegistration } from '../../../../../../../common/data-core/models/arm/geographic/shop-registration.model';
import { TextSpaceBetweenDirective } from '../../../../../../../common/directives/text-space-between/text-space-between.directive';
import { SystemEventProcessShopNameBusiness } from './system-event-process-shop-name.business';

@Component({
  selector: 'ias-system-event-process-shop-name',
  imports: [CommonModule, FormsModule, TextSpaceBetweenDirective],
  templateUrl: './system-event-process-shop-name.component.html',
  styleUrl: './system-event-process-shop-name.component.less',
  providers: [SystemEventProcessShopNameBusiness],
})
export class SystemEventProcessShopNameComponent implements OnInit {
  @Input() data?: ShopRegistration;
  @Output() ok = new EventEmitter<ShopRegistration>();
  @Output() close = new EventEmitter<void>();

  constructor(
    private business: SystemEventProcessShopNameBusiness,
    private toastr: ToastrService
  ) {}

  shop = new ShopRegistration();
  ngOnInit(): void {
    if (this.data) {
      this.shop = Object.assign(this.shop, this.data);
    }
  }

  on = {
    subitem: {
      remove: (index: number) => {
        if (this.shop.Subnames) {
          this.shop.Subnames.splice(index, 1);
        }
      },
      add: (name: string) => {
        if (!name) {
          this.toastr.warning('名称不能为空');
          return;
        }
        if (!this.shop.Subnames) {
          this.shop.Subnames = [];
        }
        this.shop.Subnames.push(name.trim());
      },
    },
    ok: () => {
      this.business
        .update(this.shop)
        .then((data) => {
          this.toastr.success('操作成功');
          this.ok.emit(this.data);
        })
        .catch((error) => {
          this.toastr.error('操作失败');
        });
    },
    cancel: () => {
      this.close.emit();
    },
  };
}
