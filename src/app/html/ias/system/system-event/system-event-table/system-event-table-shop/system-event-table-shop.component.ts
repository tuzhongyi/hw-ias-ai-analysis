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
import { MobileEventRecord } from '../../../../../../common/data-core/models/arm/event/mobile-event-record.model';
import {
  Page,
  Paged,
} from '../../../../../../common/data-core/models/page-list.model';
import { ColorTool } from '../../../../../../common/tools/color/color.tool';
import { Language } from '../../../../../../common/tools/language-tool/language';
import { SystemEventTableBusiness } from '../business/system-event-table.business';
import {
  SystemEventTableArgs,
  SystemEventTableFilter,
  SystemEventTableItem,
} from '../business/system-event-table.model';
import { SystemEventTableService } from '../business/system-event-table.service';

@Component({
  selector: 'ias-system-event-table-shop',
  imports: [CommonModule, PaginatorComponent],
  templateUrl: './system-event-table-shop.component.html',
  styleUrl: './system-event-table-shop.component.less',
  providers: [SystemEventTableService, SystemEventTableBusiness],
})
export class SystemEventTableShopComponent implements OnInit, OnDestroy {
  @Input() args = new SystemEventTableArgs();
  @Input('load') input_load?: EventEmitter<SystemEventTableArgs>;
  @Output() position = new EventEmitter<MobileEventRecord>();

  @Output('picture') output_picture = new EventEmitter<MobileEventRecord>();
  @Output() process = new EventEmitter<Paged<MobileEventRecord>>();
  @Input() processget?: EventEmitter<number>;
  @Output() video = new EventEmitter<MobileEventRecord>();
  @Output() details = new EventEmitter<MobileEventRecord>();
  @Output() task = new EventEmitter<MobileEventRecord>();

  constructor(private business: SystemEventTableBusiness) {}

  widths = ['5%', '10%', '15%', '8%', '12%', '8%', '10%', '12%', '10%', '10%'];
  datas: (SystemEventTableItem | undefined)[] = [];
  page = Page.create(1, 10);
  selected?: SystemEventTableItem;

  Language = Language;
  Color = ColorTool;

  private filter = new SystemEventTableFilter();
  private subscription = new Subscription();

  ngOnInit(): void {
    if (this.input_load) {
      let sub = this.input_load.subscribe((x) => {
        this.args = x;
        this.load(
          this.args.first ? 1 : this.page.PageIndex,
          this.page.PageSize,
          this.args
        );
      });
      this.subscription.add(sub);
    }
    if (this.processget) {
      let sub = this.processget.subscribe((index) => {
        this.business.load(index, 1, this.filter).then((x) => {
          if (x.Page.RecordCount > 0) {
            let paged = new Paged<MobileEventRecord>();
            paged.Page = x.Page;
            paged.Data = x.Data[0];
            this.process.emit(paged);
          }
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
    on: (e: Event, item: MobileEventRecord) => {
      if (this.selected === item) {
        e.stopImmediatePropagation();
      }

      this.output_picture.emit(item);
    },
  };
  audio = {
    stop: new EventEmitter<void>(),
    click: (e: Event) => {
      this.audio.stop.emit();
      e.stopImmediatePropagation();
    },
  };
  disabled = {
    relate: (item: MobileEventRecord) => {
      return !(item.EventType == 9) || item.Assignment?.Handled;
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
  onshopregistration(e: Event, item: MobileEventRecord) {
    if (this.selected === item) {
      e.stopImmediatePropagation();
    }
  }

  onprocess(e: Event, item: MobileEventRecord, index: number) {
    let page = Page.create(
      this.page.PageSize * (this.page.PageIndex - 1) + index + 1,
      1,
      this.page.TotalRecordCount
    );
    let paged = new Paged<MobileEventRecord>();
    paged.Page = page;
    paged.Data = item;

    this.process.emit(paged);
    if (this.selected === item) {
      e.stopImmediatePropagation();
    }
  }
  ontask(e: Event, item: MobileEventRecord) {
    this.task.emit(item);
    if (this.selected === item) {
      e.stopImmediatePropagation();
    }
  }
}
