import { CommonModule, DatePipe } from '@angular/common';
import {
  Component,
  Input,
  OnChanges,
  SimpleChange,
  SimpleChanges,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { EventResourceContent } from '../../../../../../common/data-core/models/arm/event/event-resource-content.model';
import { MobileEventRecord } from '../../../../../../common/data-core/models/arm/event/mobile-event-record.model';
import { TextSpaceBetweenDirective } from '../../../../../../common/directives/text-space-between/text-space-between.directive';
import { ColorTool } from '../../../../../../common/tools/color/color.tool';
import { Language } from '../../../../../../common/tools/language-tool/language';
import { LanguageTool } from '../../../../../../common/tools/language-tool/language.tool';
import { SystemEventRecordDetailsOperation } from './system-event-record-details.model';
import { SystemEventRecordDetailsSource } from './system-event-record-details.source';

@Component({
  selector: 'ias-system-event-record-details',
  imports: [CommonModule, FormsModule, DatePipe, TextSpaceBetweenDirective],
  templateUrl: './system-event-record-details.component.html',
  styleUrl: './system-event-record-details.component.less',
  providers: [SystemEventRecordDetailsSource],
})
export class SystemEventRecordDetailsComponent implements OnChanges {
  @Input() data?: MobileEventRecord;
  @Input() resourceindex = 1;

  constructor(
    private _language: LanguageTool,
    private source: SystemEventRecordDetailsSource
  ) {}

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
}
