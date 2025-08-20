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

  constructor(private _language: LanguageTool) {}

  resource?: EventResourceContent;
  language = {
    event: '',
    live: '',
  };
  operation = new SystemEventRecordDetailsOperation();

  Language = Language;

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

  private async init(data: MobileEventRecord) {
    this.language.event = await this._language.event.EventType(data.EventType);
    this.language.live = data.IsLiveEvent ? '实时' : '非实时';
  }
}
