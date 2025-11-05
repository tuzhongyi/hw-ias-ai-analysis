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
import { GpsTaskSampleRecord } from '../../../../../../common/data-core/models/arm/analysis/llm/gps-task-sample-record.model';
import {
  Page,
  Paged,
} from '../../../../../../common/data-core/models/page-list.model';
import { TableSorterDirective } from '../../../../../../common/directives/table-sorter/table-soater.directive';
import { Sort } from '../../../../../../common/directives/table-sorter/table-sorter.model';
import { Language } from '../../../../../../common/tools/language-tool/language';
import { SystemEventTaskTableBusiness } from './system-event-gps-task-table.business';
import {
  SystemEventGpsTaskTableArgs,
  SystemEventGpsTaskTableFilter,
  SystemEventGpsTaskTableItem,
} from './system-event-gps-task-table.model';

@Component({
  selector: 'ias-system-event-gps-task-table',
  imports: [CommonModule, PaginatorComponent, TableSorterDirective],
  templateUrl: './system-event-gps-task-table.component.html',
  styleUrl: './system-event-gps-task-table.component.less',
  providers: [SystemEventTaskTableBusiness],
})
export class SystemEventGpsTaskTableComponent implements OnInit, OnDestroy {
  @Input() args = new SystemEventGpsTaskTableArgs();
  @Input('load') input_load?: EventEmitter<SystemEventGpsTaskTableArgs>;

  @Output('picture') output_picture = new EventEmitter<
    Paged<GpsTaskSampleRecord>
  >();
  @Output() process = new EventEmitter<GpsTaskSampleRecord>();
  @Output() video = new EventEmitter<GpsTaskSampleRecord>();
  @Output() details = new EventEmitter<GpsTaskSampleRecord>();

  constructor(private business: SystemEventTaskTableBusiness) {}

  widths = ['5%', '13%', '12%', 'auto', '5%', '10%', '5%', '10%', '5%', '10%'];
  minwidth = [
    undefined,
    undefined,
    undefined,
    '76px',
    '150px',
    '200px',
    '70px',
    '200px',
    undefined,
    undefined,
  ];
  datas: (SystemEventGpsTaskTableItem | undefined)[] = [];
  page = Page.create(1, 10);
  selected?: SystemEventGpsTaskTableItem;

  Language = Language;
  Math = Math;

  private filter = new SystemEventGpsTaskTableFilter();
  private subscription = new Subscription();

  ngOnInit(): void {
    if (this.input_load) {
      let sub = this.input_load.subscribe((x) => {
        this.args = x;
        this.filter = SystemEventGpsTaskTableFilter.from(this.args);
        this.load(
          this.args.first ? 1 : this.page.PageIndex,
          this.page.PageSize,
          this.filter
        );
      });
      this.subscription.add(sub);
    }
    this.filter = SystemEventGpsTaskTableFilter.from(this.args);
    this.load(1, this.page.PageSize, this.filter);
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  private load(
    index: number,
    size: number,
    filter: SystemEventGpsTaskTableFilter
  ) {
    this.business.load(index, size, filter).then((x) => {
      this.page = x.Page;
      this.datas = x.Data;

      while (this.datas.length < this.page.PageSize) {
        this.datas.push(undefined);
      }
    });
  }

  onselect(item?: SystemEventGpsTaskTableItem) {
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
    on: (e: Event, item: GpsTaskSampleRecord, index: number) => {
      if (this.selected === item) {
        e.stopImmediatePropagation();
      }

      let imagecount = item.Images?.length ?? 0;
      let scenecount = item.SceneMatchImages?.length ?? 0;
      let count = imagecount + scenecount;

      let paged = Paged.create(item, index + 1, 1, count);

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
    video: (e: Event, item: GpsTaskSampleRecord) => {
      this.video.emit(item);
      if (this.selected === item) {
        e.stopImmediatePropagation();
      }
    },
    details: (e: Event, item: GpsTaskSampleRecord) => {
      this.details.emit(item);
      if (this.selected === item) {
        e.stopImmediatePropagation();
      }
    },
    process: (e: Event, item: GpsTaskSampleRecord) => {
      this.process.emit(item);
      if (this.selected === item) {
        e.stopImmediatePropagation();
      }
    },
  };
}
