import { CommonModule } from '@angular/common';
import {
  AfterViewChecked,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import { ShopRegistration } from '../../../../../../../common/data-core/models/arm/geographic/shop-registration.model';

@Component({
  selector: 'ias-system-module-shop-registration-map-panel-changed-table',
  imports: [CommonModule],
  templateUrl:
    './system-module-shop-registration-map-panel-changed-table.component.html',
  styleUrl:
    './system-module-shop-registration-map-panel-changed-table.component.less',
})
export class SystemModuleShopRegistrationMapPanelChangedTableComponent
  implements AfterViewChecked
{
  @Input() datas: ShopRegistration[] = [];

  @Input() selected?: ShopRegistration;
  @Output() selectedChange = new EventEmitter<ShopRegistration>();

  @Output() revoke = new EventEmitter<ShopRegistration>();
  @Output() position = new EventEmitter<ShopRegistration>();
  @Output() itemhover = new EventEmitter<ShopRegistration>();
  @Output() itemblur = new EventEmitter<ShopRegistration>();

  constructor(private detector: ChangeDetectorRef) {}

  @ViewChild('body') body?: ElementRef<HTMLElement>;
  widths = ['40px', 'auto', '60px'];
  table = {
    item: {
      height: 0,
    },
  };

  ngAfterViewChecked(): void {
    if (this.body && this.table.item.height === 0) {
      let height = this.body.nativeElement.clientHeight;
      if (height) {
        height -= 80;
        this.table.item.height = height * 0.1;
        this.detector.detectChanges();
      }
    }
  }

  on = {
    select: (item: ShopRegistration) => {
      this.selected = item;
      this.selectedChange.emit(this.selected);
    },
    revoke: (item: ShopRegistration) => {
      this.revoke.emit(item);
    },

    position: (e: Event, item?: ShopRegistration) => {
      this.position.emit(item);
      if (this.selected == item) {
        e.stopImmediatePropagation();
      }
    },
    mouse: {
      over: (item?: ShopRegistration) => {
        this.itemhover.emit(item);
      },
      out: (item?: ShopRegistration) => {
        this.itemblur.emit(item);
      },
    },
  };
}
