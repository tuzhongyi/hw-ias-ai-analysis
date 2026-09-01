import { CommonModule, DatePipe } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChange,
  SimpleChanges,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ImageControlComponent } from '../../../../../../common/components/image-control/image-control.component';
import { EventResourceContent } from '../../../../../../common/data-core/models/arm/event/event-resource-content.model';
import { MobileEventRecord } from '../../../../../../common/data-core/models/arm/event/mobile-event-record.model';
import { NameValue } from '../../../../../../common/data-core/models/capabilities/enum-name-value.model';
import { PagedList } from '../../../../../../common/data-core/models/interface/page-list.model';
import { TextSpaceBetweenDirective } from '../../../../../../common/directives/text-space-between/text-space-between.directive';
import { ColorTool } from '../../../../../../common/tools/color/color.tool';
import { Language } from '../../../../../../common/tools/language-tool/language';
import { LanguageTool } from '../../../../../../common/tools/language-tool/language.tool';
import { AudioButtonComponent } from '../../../../share/audio/audio-button/audio-button.component';
import { SystemEventRecordDetailsBusiness } from './system-event-record-details.business';
import { SystemEventRecordDetailsOperation } from './system-event-record-details.model';
import { SystemEventRecordDetailsSource } from './system-event-record-details.source';

@Component({
  selector: 'ias-system-event-record-details',
  imports: [
    CommonModule,
    FormsModule,
    DatePipe,
    TextSpaceBetweenDirective,
    ImageControlComponent,
    AudioButtonComponent,
  ],
  templateUrl: './system-event-record-details.component.html',
  styleUrl: './system-event-record-details.component.less',
  providers: [SystemEventRecordDetailsSource, SystemEventRecordDetailsBusiness],
})
export class SystemEventRecordDetailsComponent implements OnChanges {
  @Input() audioable = false;
  @Input() data?: MobileEventRecord;
  @Input() resourceindex = 1;
  @Output('picture') _picture = new EventEmitter<
    PagedList<NameValue<string>>
  >();

  constructor(
    private _language: LanguageTool,
    private source: SystemEventRecordDetailsSource,
    private business: SystemEventRecordDetailsBusiness,
  ) {}

  Math = Math;
  resource?: EventResourceContent;
  language = {
    event: '',
    live: '',
  };
  name = {
    division: '',
    gridcell: '',
  };
  operation = new SystemEventRecordDetailsOperation();

  Language = Language;
  Color = ColorTool;

  ngOnChanges(changes: SimpleChanges): void {
    this.change.data(changes['data']);
    this.change.resource.index(changes['resourceindex']);
  }

  private change = {
    data: (change: SimpleChange) => {
      if (change) {
        if (this.data) {
          if (this.data.Resources && this.data.Resources.length > 0) {
            this.resource = this.data.Resources[this.resourceindex - 1];
          }
          this.init(this.data);
          if (this.data.Assignment) {
            this.picture.load(this.data.Assignment.HandledImageUrls);
          }
        }
      }
    },
    resource: {
      index: (simple: SimpleChange) => {
        if (simple && !simple.firstChange) {
          if (
            this.data &&
            this.data.Resources &&
            this.data.Resources.length > 0
          ) {
            this.resource = this.data.Resources[simple.currentValue - 1];
          }
        }
      },
    },
  };

  private init(data: MobileEventRecord) {
    this.language.live = data.IsLiveEvent ? '实时' : '非实时';
    this._language.event.EventType(data.EventType).then((x) => {
      this.language.event = x;
    });
    if (data.DivisionId) {
      this.source.division(data.DivisionId).then((x) => {
        this.name.division = x.Name;
      });
    }
    if (data.GridCellId) {
      this.source.division(data.GridCellId).then((x) => {
        this.name.gridcell = x.Name;
      });
    }
  }

  picture = {
    datas: [] as string[],
    load: (ids: string[] = []) => {
      this.picture.datas = ids.map((x) => {
        return this.business.picture(x);
      });
    },
    on: {
      preview: (paged: PagedList<NameValue<string>>) => {
        paged.Data.forEach((x) => {
          x.Name = this.data?.Address ?? x.Name;
        });
        this._picture.emit(paged);
      },
    },
  };
}
