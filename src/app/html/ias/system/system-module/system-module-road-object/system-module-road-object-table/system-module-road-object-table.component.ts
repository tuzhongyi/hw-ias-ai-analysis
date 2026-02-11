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
import { RoadObjectState } from '../../../../../../common/data-core/enums/road/road-object/road-object-state.enum';
import { RoadObject } from '../../../../../../common/data-core/models/arm/geographic/road-object.model';
import {
  Page,
  Paged,
  PagedList,
} from '../../../../../../common/data-core/models/page-list.model';
import { SystemModuleRoadObjectTableBusiness } from './system-module-road-object-table.business';
import {
  SystemModuleRoadObjectTableArgs,
  SystemModuleRoadObjectTableItem,
} from './system-module-road-object-table.model';

@Component({
  selector: 'ias-system-module-road-object-table',
  imports: [CommonModule, PaginatorComponent],
  templateUrl: './system-module-road-object-table.component.html',
  styleUrl: './system-module-road-object-table.component.less',
  providers: [SystemModuleRoadObjectTableBusiness],
})
export class SystemModuleRoadObjectTableComponent
  implements OnInit, OnChanges, OnDestroy
{
  @Input() operable = true;
  @Input() args = new SystemModuleRoadObjectTableArgs();
  @Input('load') _load?: EventEmitter<SystemModuleRoadObjectTableArgs>;
  @Output() modify = new EventEmitter<RoadObject>();
  @Output() delete = new EventEmitter<RoadObject>();
  @Output() error = new EventEmitter<Error>();
  @Output() loaded = new EventEmitter<RoadObject[]>();
  @Input() selected?: RoadObject;
  @Output() selectedChange = new EventEmitter<RoadObject>();

  @Output() position = new EventEmitter<RoadObject>();
  @Output() itemover = new EventEmitter<RoadObject>();
  @Output() itemout = new EventEmitter<RoadObject>();

  @Input('page') _page = new EventEmitter<number>();
  @Output() picture = new EventEmitter<Paged<RoadObject>>();

  constructor(private business: SystemModuleRoadObjectTableBusiness) {}

  State = RoadObjectState;
  page = Page.create(1, 10);
  datas: (SystemModuleRoadObjectTableItem | undefined)[] = [];
  source: SystemModuleRoadObjectTableItem[] = [];

  widths = [
    '65px',
    '150px',
    '100px',
    '100px',
    '100px',
    'auto',
    'auto',
    '100px',
    '100px',
    '100px',
  ];
  private subscription = new Subscription();

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
        this.load(1, this.args);
      });
      this.subscription.add(sub);
    }
    if (this._page) {
      let sub = this._page.subscribe((index) => {
        let data = this.source[index - 1];
        let paged = new Paged<RoadObject>();

        paged.Page = Page.create(index, 1, this.source.length);
        paged.Data = data;
        this.picture.emit(paged);
      });
      this.subscription.add(sub);
    }
    this.load(1, this.args);
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  private load(index: number, args: SystemModuleRoadObjectTableArgs) {
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
      this.page = paged.Page;
      this.datas = paged.Data;

      while (this.datas.length < this.page.PageSize) {
        this.datas.push(undefined);
      }

      this.selected = undefined;
      this.selectedChange.emit();
    },
    picture: (e: Event, item?: RoadObject) => {
      if (!item) return;
      let paged = new Paged<RoadObject>();
      paged.Data = item;
      paged.Page = new Page();
      paged.Page.PageCount = this.page.TotalRecordCount;
      paged.Page.PageIndex = this.source.findIndex((x) => x.Id == item.Id) + 1;
      paged.Page.PageSize = 1;
      paged.Page.RecordCount = 1;
      paged.Page.TotalRecordCount = this.page.TotalRecordCount;
      this.picture.emit(paged);
    },
    delete: (e: Event, item?: RoadObject) => {
      if (!item) return;
      this.delete.emit(item);
      if (this.selected === item) {
        e.stopPropagation();
      }
    },
    modify: (e: Event, item?: SystemModuleRoadObjectTableItem) => {
      if (!item) return;
      this.modify.emit(item);
      if (this.selected === item) {
        e.stopPropagation();
      }
    },
    select: (item?: SystemModuleRoadObjectTableItem) => {
      if (!item) return;
      if (this.selected === item) {
        this.selected = undefined;
      } else {
        this.selected = item;
      }
      this.selectedChange.emit(this.selected);
    },
    position: (e: Event, item?: SystemModuleRoadObjectTableItem) => {
      if (!item) return;
      this.position.emit(item);
      if (this.selected === item) {
        e.stopImmediatePropagation();
      }
    },
    mouse: {
      over: (item?: SystemModuleRoadObjectTableItem) => {
        if (item) {
          this.itemover.emit(item);
        }
      },
      out: (item?: SystemModuleRoadObjectTableItem) => {
        if (item) {
          this.itemout.emit(item);
        }
      },
    },
  };
}
