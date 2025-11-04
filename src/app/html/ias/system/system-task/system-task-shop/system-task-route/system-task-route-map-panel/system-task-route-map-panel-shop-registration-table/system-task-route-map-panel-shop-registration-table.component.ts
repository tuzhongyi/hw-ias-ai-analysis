import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChange,
  SimpleChanges,
} from '@angular/core';
import { PaginatorComponent } from '../../../../../../../../common/components/paginator/paginator.component';
import { ShopObjectState } from '../../../../../../../../common/data-core/enums/analysis/shop-object-state.enum';
import { ShopRegistrationTaskDetectedResult } from '../../../../../../../../common/data-core/models/arm/geographic/shop-registration-task-detected-result.model';
import { Page } from '../../../../../../../../common/data-core/models/page-list.model';
import { ColorTool } from '../../../../../../../../common/tools/color/color.tool';
import { SystemTaskRouteMapPanelTableShopRegistrationBusiness } from './system-task-route-map-panel-shop-registration-table.business';

@Component({
  selector: 'ias-system-task-route-map-panel-shop-registration-table',
  imports: [CommonModule, PaginatorComponent],
  templateUrl:
    './system-task-route-map-panel-shop-registration-table.component.html',
  styleUrl:
    './system-task-route-map-panel-shop-registration-table.component.less',
  providers: [SystemTaskRouteMapPanelTableShopRegistrationBusiness],
})
export class SystemTaskRouteMapPanelShopRegistrationTableComponent
  implements OnChanges
{
  @Input('datas') shops: ShopRegistrationTaskDetectedResult[] = [];
  @Output() details = new EventEmitter<ShopRegistrationTaskDetectedResult>();
  @Input() selected?: ShopRegistrationTaskDetectedResult;
  @Output() selectedChange =
    new EventEmitter<ShopRegistrationTaskDetectedResult>();
  @Output() itemhover = new EventEmitter<ShopRegistrationTaskDetectedResult>();
  @Output() itemblur = new EventEmitter<ShopRegistrationTaskDetectedResult>();
  @Output() position = new EventEmitter<ShopRegistrationTaskDetectedResult>();
  @Output() video = new EventEmitter<ShopRegistrationTaskDetectedResult>();

  constructor(
    private business: SystemTaskRouteMapPanelTableShopRegistrationBusiness
  ) {}

  widths = ['60px', 'auto', '85px', '80px'];
  datas: Array<ShopRegistrationTaskDetectedResult | undefined> = [];
  page = new Page();
  Color = ColorTool;

  ngOnChanges(changes: SimpleChanges): void {
    this.change.datas(changes['shops']);
  }

  change = {
    datas: (change: SimpleChange) => {
      if (change) {
        if (this.shops) {
          this.load(1, 10, this.shops);
        }
      }
    },
  };

  private async load(
    index: number,
    size: number,
    shops: ShopRegistrationTaskDetectedResult[]
  ) {
    return this.business.load(index, size, [...shops]).then((x) => {
      this.datas = x.Data;
      this.page = x.Page;

      this.datas.forEach((x) => {
        if (x) {
          x.ObjectState = x.Detected
            ? ShopObjectState.Existed
            : ShopObjectState.Disappeared;
        }
      });

      return this.datas;
    });
  }

  on = {
    select: (item?: ShopRegistrationTaskDetectedResult) => {
      this.selected = item;
      this.selectedChange.emit(item);
    },
    position: (e: Event, item?: ShopRegistrationTaskDetectedResult) => {
      this.position.emit(item);
      if (this.selected == item) {
        e.stopImmediatePropagation();
      }
    },
    details: (e: Event, item?: ShopRegistrationTaskDetectedResult) => {
      this.details.emit(item);
      if (this.selected == item) {
        e.stopImmediatePropagation();
      }
    },
    video: (e: Event, item: ShopRegistrationTaskDetectedResult) => {
      this.video.emit(item);
      if (this.selected == item) {
        e.stopImmediatePropagation();
      }
    },
    page: (index: number) => {
      this.load(index, this.page.PageSize, this.shops);
    },
    mouse: {
      over: (item?: ShopRegistrationTaskDetectedResult) => {
        this.itemhover.emit(item);
      },
      out: (item?: ShopRegistrationTaskDetectedResult) => {
        this.itemblur.emit(item);
      },
    },
  };
}
