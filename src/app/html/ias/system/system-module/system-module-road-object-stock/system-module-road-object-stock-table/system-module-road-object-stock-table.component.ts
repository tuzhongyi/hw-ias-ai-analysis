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
import { Subscription } from 'rxjs';
import { PaginatorComponent } from '../../../../../../common/components/paginator/paginator.component';
import { RoadObjectStock } from '../../../../../../common/data-core/models/arm/geographic/road-object-stock.model';
import {
  Page,
  Paged,
  PagedList,
} from '../../../../../../common/data-core/models/interface/page-list.model';
import { SystemModuleRoadObjectStockTableBusiness } from './system-module-road-object-stock-table.business';
import {
  RoadObjectStockModel,
  SystemModuleRoadObjectStockTableArgs,
} from './system-module-road-object-stock-table.model';

@Component({
  selector: 'ias-system-module-road-object-stock-table',
  imports: [CommonModule, PaginatorComponent],
  templateUrl: './system-module-road-object-stock-table.component.html',
  styleUrl: './system-module-road-object-stock-table.component.less',
  providers: [SystemModuleRoadObjectStockTableBusiness],
})
export class SystemModuleRoadObjectStockTableComponent
  implements OnInit, OnChanges, OnDestroy
{
  @Input() operable = true;
  @Input() args = new SystemModuleRoadObjectStockTableArgs();
  @Input('load') _load?: EventEmitter<SystemModuleRoadObjectStockTableArgs>;
  @Output() modify = new EventEmitter<RoadObjectStock>();
  @Output() delete = new EventEmitter<RoadObjectStock>();
  @Output() error = new EventEmitter<Error>();
  @Output() loaded = new EventEmitter<RoadObjectStock[]>();

  @Output() selected = new EventEmitter<RoadObjectStock[]>();

  @Output() locate = new EventEmitter<RoadObjectStock>();
  @Output() itemover = new EventEmitter<RoadObjectStock>();
  @Output() itemout = new EventEmitter<RoadObjectStock>();

  @Input('page') _page = new EventEmitter<{
    index: number;
    picture: boolean;
  }>();
  @Output() picture = new EventEmitter<Paged<RoadObjectStock>>();

  constructor(private business: SystemModuleRoadObjectStockTableBusiness) {}

  page = Page.create(1, 10);
  datas: (RoadObjectStockModel | undefined)[] = [];
  source: RoadObjectStockModel[] = [];

  widths = [
    '65px',
    '65px',
    '100px',
    'auto',
    '100px',
    '150px',
    '150px',
    'auto',
    '100px',
  ];
  private subscription = new Subscription();
  selecteds: RoadObjectStock[] = [];

  private change = {
    operable: (simple: SimpleChange) => {
      if (simple) {
        if (!this.operable) {
          this.widths[this.widths.length - 1] = '0px';
        }
      }
    },
  };
  ngOnChanges(changes: SimpleChanges): void {
    this.change.operable(changes['operable']);
  }

  ngOnInit(): void {
    if (this._load) {
      let sub = this._load.subscribe((x) => {
        let index = x.first ? 1 : this.page.PageIndex;
        this.selecteds = [];
        this.selected.emit(this.selecteds);
        this.load(index, this.args);
      });
      this.subscription.add(sub);
    }
    if (this._page) {
      let sub = this._page.subscribe((args) => {
        if (0 < args.index && args.index <= this.source.length) {
          let data = this.source[args.index - 1];
          let paged = new Paged<RoadObjectStock>();
          paged.Page = Page.create(args.index, 1, this.source.length);
          paged.Data = data;
          if (args.picture) {
            this.picture.emit(paged);
          }

          let pageindex = Math.floor((args.index - 1) / this.page.PageSize) + 1;
          this.on.page(pageindex);

          this.selecteds = [data];
          this.selected.emit(this.selecteds);
        }
      });
      this.subscription.add(sub);
    }
    this.load(1, this.args);
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  private load(index: number, args: SystemModuleRoadObjectStockTableArgs) {
    this.business
      .load(args)
      .then((x) => {
        this.loaded.emit(x);
        this.source = x;
        this.on.page(index);
      })
      .catch((e) => {
        this.error.emit(e);
      });
  }

  on = {
    page: (num: number) => {
      let paged = PagedList.create(this.source, num, this.page.PageSize);
      if (paged.Data.length == 0 && paged.Page.PageIndex > 1) {
        this.on.page(paged.Page.PageIndex - 1);
        return;
      }

      this.page = paged.Page;
      this.datas = paged.Data;

      while (this.datas.length < this.page.PageSize) {
        this.datas.push(undefined);
      }
    },
    picture: (e: Event, item?: RoadObjectStock) => {
      if (!item) return;
      let paged = new Paged<RoadObjectStock>();
      paged.Data = item;
      paged.Page = new Page();
      paged.Page.PageCount = this.page.TotalRecordCount;
      paged.Page.PageIndex = this.source.findIndex((x) => x.Id == item.Id) + 1;
      paged.Page.PageSize = 1;
      paged.Page.RecordCount = 1;
      paged.Page.TotalRecordCount = this.page.TotalRecordCount;
      this.picture.emit(paged);
    },
    modify: (e: Event, item?: RoadObjectStockModel) => {
      if (!item) return;
      this.modify.emit(item);
      if (this.selecteds.includes(item)) {
        e.stopPropagation();
      }
    },
    delete: (e: Event, item?: RoadObjectStockModel) => {
      if (!item) return;
      this.delete.emit(item);
      if (this.selecteds.includes(item)) {
        e.stopPropagation();
      }
    },
    select: {
      item: (item?: RoadObjectStockModel) => {
        if (!item) return;
        let index = this.selecteds.findIndex((x) => x.Id === item.Id);
        if (index < 0) {
          this.selecteds.push(item);
        } else {
          this.selecteds.splice(index, 1);
        }
        this.selected.emit(this.selecteds);
      },
      page: () => {
        if (this.selecteds.length === this.page.RecordCount) {
          this.selecteds = [];
        } else {
          this.selecteds = [];
          for (let i = 0; i < this.datas.length; i++) {
            const data = this.datas[i];
            if (data) {
              this.selecteds.push(data);
            }
          }
        }
        this.selected.emit(this.selecteds);
      },
      all: () => {
        this.selecteds = [...this.source];
        this.selected.emit(this.selecteds);
      },
      invert: () => {
        this.selecteds = this.source.filter(
          (item) => !this.selecteds.includes(item),
        );
        this.selected.emit(this.selecteds);
      },
      cancel: () => {
        this.selecteds = [];
        this.selected.emit(this.selecteds);
      },
    },
    locate: (e: Event, item?: RoadObjectStockModel) => {
      if (!item) return;
      this.locate.emit(item);
      e.stopImmediatePropagation();
    },
    mouse: {
      over: (item?: RoadObjectStockModel) => {
        if (item) {
          this.itemover.emit(item);
        }
      },
      out: (item?: RoadObjectStockModel) => {
        if (item) {
          this.itemout.emit(item);
        }
      },
    },
  };
}
