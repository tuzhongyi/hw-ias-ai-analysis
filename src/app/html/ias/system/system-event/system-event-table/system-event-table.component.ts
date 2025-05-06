import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { Subscription } from 'rxjs';
import { PaginatorComponent } from '../../../../../common/components/paginator/paginator.component';
import { EventRecord } from '../../../../../common/data-core/models/arm/event/event-record.model';
import {
  Page,
  Paged,
} from '../../../../../common/data-core/models/page-list.model';
import { Language } from '../../../../../common/tools/language-tool/language';
import { SystemEventTableBusiness } from './business/system-event-table.business';
import {
  SystemEventTableArgs,
  SystemEventTableFilter,
  SystemEventTableItem,
} from './business/system-event-table.model';
import { SystemEventTableService } from './business/system-event-table.service';

@Component({
  selector: 'ias-system-event-table',
  imports: [CommonModule, PaginatorComponent],
  templateUrl: './system-event-table.component.html',
  styleUrl: './system-event-table.component.less',
  providers: [SystemEventTableService, SystemEventTableBusiness],
})
export class SystemEventTableComponent implements OnInit, OnDestroy {
  @Input() args = new SystemEventTableArgs();
  @Input('load') _load?: EventEmitter<SystemEventTableArgs>;
  @Output() position = new EventEmitter<EventRecord>();
  @Output() video = new EventEmitter<EventRecord>();
  @Output() details = new EventEmitter<EventRecord>();
  @Output('picture') picture_ = new EventEmitter<Paged<Paged<EventRecord>>>();
  @Input() get?: EventEmitter<number>;

  constructor(private business: SystemEventTableBusiness) {}

  widths = ['5%', '15%', '10%', '6%', '12%', '12%', '8%', '10%', '12%', '10%'];
  datas: (SystemEventTableItem | undefined)[] = [];
  page = Page.create(1, 10);
  selected?: SystemEventTableItem;

  Language = Language;

  private filter = new SystemEventTableFilter();
  private subscription = new Subscription();

  ngOnInit(): void {
    if (this._load) {
      let sub = this._load.subscribe((x) => {
        this.args = x;
        this.load(this.page.PageIndex, this.page.PageSize, this.args);
      });
      this.subscription.add(sub);
    }
    if (this.get) {
      let sub = this.get.subscribe((index) => {
        this.business.load(index, 1, this.filter).then((x) => {
          let paged = new Paged<Paged<EventRecord>>();
          paged.Page = x.Page;
          let data = new Paged<EventRecord>();
          data.Page = Page.create(1, 1, x.Data[0].Resources?.length ?? 0);
          data.Data = x.Data[0];
          paged.Data = data;
          this.picture_.emit(paged);
        });
      });
      this.subscription.add(sub);
    }
    this.load(1, this.page.PageSize, this.args);
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  private load(index: number, size: number, args?: SystemEventTableArgs) {
    if (args) {
      this.filter = SystemEventTableFilter.from(args);
    }
    this.business.load(index, size, this.filter).then((x) => {
      this.page = x.Page;
      this.datas = x.Data;
      while (this.datas.length < this.page.PageSize) {
        this.datas.push(undefined);
      }
    });
  }

  onselect(item?: SystemEventTableItem) {
    if (item) {
      if (this.selected === item) {
        this.selected = undefined;
      } else {
        this.selected = item;
      }
    }
  }

  picture = {
    get: (url: string) => {
      return this.business.medium.picture(url);
    },
    on: (
      e: Event,
      index: {
        page: number;
        picture: number;
      },
      item: EventRecord
    ) => {
      if (this.selected === item) {
        e.stopImmediatePropagation();
      }

      let paged = new Paged<Paged<EventRecord>>();
      let _index =
        this.page.PageSize * (this.page.PageIndex - 1) + index.page + 1;
      paged.Page = Page.create(_index, 1, this.page.TotalRecordCount);

      let data = new Paged<EventRecord>();
      data.Page = Page.create(
        index.picture + 1,
        1,
        item.Resources?.length ?? 0
      );
      data.Data = item;
      paged.Data = data;

      this.picture_.emit(paged);
    },
  };

  onpage(index: number) {
    this.load(index, this.page.PageSize);
  }

  onposition(e: Event, item: EventRecord) {
    this.position.emit(item);
    if (this.selected === item) {
      e.stopImmediatePropagation();
    }
  }
  onvideo(e: Event, item: EventRecord) {
    this.video.emit(item);
    if (this.selected === item) {
      e.stopImmediatePropagation();
    }
  }
  ondetails(e: Event, item: EventRecord) {
    this.details.emit(item);
    if (this.selected === item) {
      e.stopImmediatePropagation();
    }
  }
}
