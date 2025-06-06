import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Road } from '../../../../../../../common/data-core/models/arm/analysis/road.model';
import { WheelInputNumberDirective } from '../../../../../../../common/directives/wheel-input-number/wheel-input-number.directive';
import { SystemEventProcessShopTableArgs } from '../system-event-process-shop-table/system-event-process-shop-table.model';
import { SystemEventProcessShopFilterBusiness } from './system-event-process-shop-filter.business';

@Component({
  selector: 'ias-system-event-process-shop-filter',
  imports: [CommonModule, FormsModule, WheelInputNumberDirective],
  templateUrl: './system-event-process-shop-filter.component.html',
  styleUrl: './system-event-process-shop-filter.component.less',
  providers: [SystemEventProcessShopFilterBusiness],
})
export class SystemEventProcessShopFilterComponent implements OnInit {
  @Input('args') _args?: SystemEventProcessShopTableArgs;
  @Output() ok = new EventEmitter<SystemEventProcessShopTableArgs>();
  @Output() close = new EventEmitter<void>();

  constructor(private business: SystemEventProcessShopFilterBusiness) {}

  roads: Road[] = [];
  args = new SystemEventProcessShopTableArgs();

  ngOnInit(): void {
    if (this._args) {
      this.args = Object.assign(this.args, this._args);
      this.load(this.args);
    }
  }

  private load(args: SystemEventProcessShopTableArgs) {
    this.business.load(args.location, args.distance).then((x) => {
      this.roads = x;
    });
  }

  on = {
    ok: () => {
      this.ok.emit(this.args);
    },
    close: () => {
      this.close.emit();
    },
  };
}
