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
import { PaginatorComponent } from '../../../../../../common/components/paginator/paginator.component';
import { RoadObjectEventRecord } from '../../../../../../common/data-core/models/arm/geographic/road-object-event-record.model';
import {
  Page,
  Paged,
} from '../../../../../../common/data-core/models/page-list.model';
import { TableSorterDirective } from '../../../../../../common/directives/table-sorter/table-soater.directive';
import { Sort } from '../../../../../../common/directives/table-sorter/table-sorter.model';
import { Language } from '../../../../../../common/tools/language-tool/language';
import { SystemEventRoadObjectTableBusiness } from './system-event-road-object-table.business';
import {
  SystemEventRoadObjectTableArgs,
  SystemEventRoadObjectTableFilter,
  SystemEventRoadObjectTableItem,
} from './system-event-road-object-table.model';

@Component({
  selector: 'ias-system-event-road-object-table',
  imports: [CommonModule, PaginatorComponent, TableSorterDirective],
  templateUrl: './system-event-road-object-table.component.html',
  styleUrl: './system-event-road-object-table.component.less',
  providers: [SystemEventRoadObjectTableBusiness],
})
export class SystemEventRoadObjectTableComponent implements OnInit, OnDestroy {
  @Input() args = new SystemEventRoadObjectTableArgs();
  @Input('load') input_load?: EventEmitter<SystemEventRoadObjectTableArgs>;

  @Output('picture') output_picture = new EventEmitter<
    Paged<RoadObjectEventRecord>
  >();
  @Output() process = new EventEmitter<RoadObjectEventRecord>();
  @Output() video = new EventEmitter<RoadObjectEventRecord>();
  @Output() details = new EventEmitter<RoadObjectEventRecord>();

  constructor(private business: SystemEventRoadObjectTableBusiness) {}

  widths = [
    '5%',
    '8%',
    'auto',
    'auto',
    '5%',
    '8%',
    '10%',
    '5%',
    '10%',
    '5%',
    '10%',
    '5%',
    'auto',
    '5%',
  ];
  minwidth = [
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    '180px',
    undefined,
    '180px',
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
  ];
  datas: (SystemEventRoadObjectTableItem | undefined)[] = [];
  page = Page.create(1, 10);
  selected?: SystemEventRoadObjectTableItem;

  Language = Language;
  Math = Math;

  private filter = new SystemEventRoadObjectTableFilter();
  private subscription = new Subscription();

  ngOnInit(): void {
    if (this.input_load) {
      let sub = this.input_load.subscribe((x) => {
        this.args = x;
        this.filter = SystemEventRoadObjectTableFilter.from(this.args);
        this.load(
          this.args.first ? 1 : this.page.PageIndex,
          this.page.PageSize,
          this.filter
        );
      });
      this.subscription.add(sub);
    }
    this.filter = SystemEventRoadObjectTableFilter.from(this.args);
    this.load(1, this.page.PageSize, this.filter);
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  private load(
    index: number,
    size: number,
    filter: SystemEventRoadObjectTableFilter
  ) {
    this.business.load(index, size, filter).then((x) => {
      this.page = x.Page;
      this.datas = x.Data;

      while (this.datas.length < this.page.PageSize) {
        this.datas.push(undefined);
      }
    });
  }

  onselect(item?: SystemEventRoadObjectTableItem) {
    if (item) {
      if (this.selected === item) {
        this.selected = undefined;
      } else {
        this.selected = item;
      }
    }
  }

  picture = {
    get: (id: string) => {
      return this.business.medium.picture(id);
    },
    on: (e: Event, item: RoadObjectEventRecord, index: number) => {
      if (this.selected === item) {
        e.stopImmediatePropagation();
      }

      let count = item.Resources?.length ?? 0;

      let paged = Paged.create(item, index + 1, count, count);

      this.output_picture.emit(paged);
    },
  };

  on = {
    page: (index: number) => {
      this.load(index, this.page.PageSize, this.filter);
    },
    sort: (sort: Sort) => {
      this.filter.asc = undefined;
      this.filter.desc = undefined;
      if (sort.direction === 'asc') {
        this.filter.asc = sort.active;
      } else {
        this.filter.desc = sort.active;
      }
      this.load(this.page.PageIndex, this.page.PageSize, this.filter);
    },
    video: (e: Event, item: RoadObjectEventRecord) => {
      this.video.emit(item);
      if (this.selected === item) {
        e.stopImmediatePropagation();
      }
    },
    details: (e: Event, item: RoadObjectEventRecord) => {
      this.details.emit(item);
      if (this.selected === item) {
        e.stopImmediatePropagation();
      }
    },
    process: (e: Event, item: RoadObjectEventRecord) => {
      this.process.emit(item);
      if (this.selected === item) {
        e.stopImmediatePropagation();
      }
    },
  };
}
