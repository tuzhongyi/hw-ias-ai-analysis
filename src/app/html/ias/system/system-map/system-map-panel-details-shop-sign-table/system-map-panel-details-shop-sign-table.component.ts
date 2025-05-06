import { CommonModule } from '@angular/common';
import {
  AfterViewChecked,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChange,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { ShopSign } from '../../../../../common/data-core/models/arm/analysis/shop-sign.model';
import { Shop } from '../../../../../common/data-core/models/arm/analysis/shop.model';
import { Language } from '../../../../../common/tools/language-tool/language';
import { ShopSignViewModel } from '../../../../../common/view-models/shop-sign/shop-sign.view-model';
import { SystemModuleShopSignTableBusiness } from '../../system-module/system-module-shop/system-module-shop-sign-table/system-module-shop-sign-table.business';

@Component({
  selector: 'ias-system-map-panel-details-shop-sign-table',
  imports: [CommonModule],
  templateUrl: './system-map-panel-details-shop-sign-table.component.html',
  styleUrl: './system-map-panel-details-shop-sign-table.component.less',
  providers: [SystemModuleShopSignTableBusiness],
})
export class SystemMapPanelDetailsShopSignTableComponent
  implements OnInit, OnChanges, AfterViewChecked
{
  @Input('data') shop?: Shop;
  @Input() selected?: ShopSign;
  @Output() selectedChange = new EventEmitter<ShopSign>();
  @Output() error = new EventEmitter<Error>();
  @Output() loaded = new EventEmitter<ShopSign[]>();

  constructor(
    private business: SystemModuleShopSignTableBusiness,
    private detector: ChangeDetectorRef
  ) {}

  @ViewChild('body') body?: ElementRef<HTMLElement>;
  datas: ShopSignViewModel[] = [];
  widths: string[] = ['40px', 'auto', '82px', '180px'];
  itemheight = 0;
  Language = Language;

  ngOnInit(): void {
    if (this.shop) {
      this.load(this.shop.Id);
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.change.shop(changes['shop']);
    this.change.sign(changes['selected']);
  }

  ngAfterViewChecked(): void {
    if (this.body && this.itemheight === 0) {
      let height = this.body.nativeElement.clientHeight;
      if (height) {
        height -= 80;
        this.itemheight = height * 0.1;
        this.detector.detectChanges();
      }
    }
  }

  change = {
    shop: (simple: SimpleChange) => {
      if (simple && !simple.firstChange && this.shop) {
        this.load(this.shop.Id);
      }
    },
    sign: (simple: SimpleChange) => {
      if (simple && !simple.firstChange && this.selected) {
        this.selected = this.datas.find((x) => x.Id === this.selected?.Id);
        if (this.selected) {
          this.selectedChange.emit(this.selected);
        }
      }
    },
  };

  private load(id: string) {
    this.business
      .load(id)
      .then((x) => {
        this.datas = x;
        this.loaded.emit(this.datas);
        if (this.datas.length > 0) {
          this.onselect(this.datas[0]);
        }
      })
      .catch((e) => {
        this.error.emit(e);
      });
  }

  onselect(item: ShopSign) {
    if (this.selected === item) {
      return;
    }
    this.selected = item;
    this.selectedChange.emit(item);
  }
}
