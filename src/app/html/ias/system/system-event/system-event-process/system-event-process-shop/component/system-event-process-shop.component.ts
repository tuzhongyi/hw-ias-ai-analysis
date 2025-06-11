import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  SimpleChange,
  SimpleChanges,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ShopRegistration } from '../../../../../../../common/data-core/models/arm/analysis/shop-registration.model';
import { MobileEventRecord } from '../../../../../../../common/data-core/models/arm/event/mobile-event-record.model';
import { SystemEventProcessShopTableComponent } from '../system-event-process-shop-table/system-event-process-shop-table.component';
import { SystemEventProcessShopTableArgs } from '../system-event-process-shop-table/system-event-process-shop-table.model';

@Component({
  selector: 'ias-system-event-process-shop',
  imports: [CommonModule, FormsModule, SystemEventProcessShopTableComponent],
  templateUrl: './system-event-process-shop.component.html',
  styleUrl: './system-event-process-shop.component.less',
})
export class SystemEventProcessShopComponent
  implements OnChanges, OnInit, OnDestroy
{
  @Input() data?: MobileEventRecord;
  @Input() selected?: ShopRegistration;
  @Output() selectedChange = new EventEmitter<ShopRegistration>();
  @Input() subname = false;
  @Output() subnameChange = new EventEmitter<boolean>();

  @Input() args = new SystemEventProcessShopTableArgs();
  @Output() argsChange = new EventEmitter<SystemEventProcessShopTableArgs>();
  @Input('load') _load?: EventEmitter<void>;

  @Output() filter = new EventEmitter<void>();
  @Output() create = new EventEmitter<MobileEventRecord>();
  @Output() edit = new EventEmitter<ShopRegistration>();

  constructor() {}

  load = new EventEmitter<SystemEventProcessShopTableArgs>();
  private subscription = new Subscription();

  ngOnInit(): void {
    if (this._load) {
      let sub = this._load.subscribe((x) => {
        this.load.emit(this.args);
      });
      this.subscription.add(sub);
    }
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.change.data(changes['data']);
  }
  private change = {
    data: (change: SimpleChange) => {
      if (change && this.data) {
        if (this.data.Location) {
          this.args.location = this.data.Location;
          this.argsChange.emit(this.args);
        }
      }
    },
  };

  table = {
    select: (item: ShopRegistration) => {
      this.selected = item;
      this.selectedChange.emit(this.selected);
    },
    loaded: (items: ShopRegistration[]) => {
      if (
        items.length > 0 &&
        this.data &&
        this.data.Resources &&
        this.data.Resources.length > 0
      ) {
        let resource = this.data.Resources[0];

        let index = -1;
        if (resource.RelationId) {
          index = items.findIndex((x) => resource.RelationId == x.Id);
        } else {
          index = items.findIndex((x) => resource.ResourceName == x.Name);
        }

        if (index >= 0) {
          this.selected = items[index];
          this.table.subname(resource.ResourceName, this.selected);
        } else {
          this.selected = undefined;
        }
        this.selectedChange.emit(this.selected);
      }
    },
    subname: (name: string, item: ShopRegistration) => {
      if (item.Name == name) {
        this.subname = false;
      } else if (item.Subnames && item.Subnames.length > 0) {
        this.subname = item.Subnames.includes(name);
      }
      this.subnameChange.emit(this.subname);
    },
    on: {
      edit: (item: ShopRegistration) => {
        this.edit.emit(item);
      },
    },
  };

  on = {
    subname: () => {
      this.subnameChange.emit(this.subname);
    },
    filter: () => {
      this.filter.emit();
    },
    create: () => {
      this.create.emit(this.data);
    },
  };
}
