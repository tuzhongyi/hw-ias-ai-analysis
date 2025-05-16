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
import { MobileEventRecord } from '../../../../../common/data-core/models/arm/event/mobile-event-record.model';
import {
  Page,
  Paged,
} from '../../../../../common/data-core/models/page-list.model';
import { ColorTool } from '../../../../../common/tools/color/color.tool';
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
  @Output() position = new EventEmitter<MobileEventRecord>();
  @Output() video = new EventEmitter<MobileEventRecord>();
  @Output() details = new EventEmitter<MobileEventRecord>();
  @Output('picture') picture_ = new EventEmitter<
    Paged<Paged<MobileEventRecord>>
  >();
  @Input() get?: EventEmitter<number>;
  @Output() got = new EventEmitter<Paged<Paged<MobileEventRecord>>>();
  @Output() handle = new EventEmitter<Paged<MobileEventRecord>>();
  @Output() merge = new EventEmitter<MobileEventRecord>();

  constructor(private business: SystemEventTableBusiness) {}

  widths = ['5%', '15%', '12%', '10%', '6%', '12%', '8%', '10%', '12%', '10%'];
  datas: (SystemEventTableItem | undefined)[] = [];
  page = Page.create(1, 10);
  selected?: SystemEventTableItem;

  Language = Language;
  Color = ColorTool;

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
          let paged = new Paged<Paged<MobileEventRecord>>();
          paged.Page = x.Page;
          let data = new Paged<MobileEventRecord>();
          data.Page = Page.create(1, 1, x.Data[0].Resources?.length ?? 0);
          data.Data = x.Data[0];
          paged.Data = data;
          this.got.emit(paged);
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
      item: MobileEventRecord
    ) => {
      if (this.selected === item) {
        e.stopImmediatePropagation();
      }

      let paged = new Paged<Paged<MobileEventRecord>>();
      let _index =
        this.page.PageSize * (this.page.PageIndex - 1) + index.page + 1;
      paged.Page = Page.create(_index, 1, this.page.TotalRecordCount);

      let data = new Paged<MobileEventRecord>();
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
  disabled = {
    relate: (item: MobileEventRecord) => {
      return !(item.EventType == 9);
    },
    position: (item: MobileEventRecord) => {
      return !item.Location;
    },
    video: (item: MobileEventRecord) => {
      if (item.Resources && item.Resources.length > 0) {
        return !item.Resources[0].RecordUrl;
      }
      return true;
    },
  };

  onpage(index: number) {
    this.load(index, this.page.PageSize);
  }

  onposition(e: Event, item: MobileEventRecord) {
    this.position.emit(item);
    if (this.selected === item) {
      e.stopImmediatePropagation();
    }
  }
  onvideo(e: Event, item: MobileEventRecord) {
    this.video.emit(item);
    if (this.selected === item) {
      e.stopImmediatePropagation();
    }
  }
  ondetails(e: Event, item: MobileEventRecord) {
    this.details.emit(item);
    if (this.selected === item) {
      e.stopImmediatePropagation();
    }
  }
  onhandle(e: Event, item: MobileEventRecord, index: number) {
    let paged = new Paged<MobileEventRecord>();
    paged.Data = item;
    paged.Page = new Page();
    paged.Page.PageIndex =
      this.page.PageSize * (this.page.PageIndex - 1) + index + 1;
    paged.Page.PageSize = 1;
    paged.Page.RecordCount = 1;
    paged.Page.PageCount = this.page.TotalRecordCount;
    paged.Page.TotalRecordCount = this.page.TotalRecordCount;
    this.handle.emit(paged);
    if (this.selected === item) {
      e.stopImmediatePropagation();
    }
  }
  onmerge(e: Event, item: MobileEventRecord) {
    this.merge.emit(item);
    if (this.selected === item) {
      e.stopImmediatePropagation();
    }
  }
}
