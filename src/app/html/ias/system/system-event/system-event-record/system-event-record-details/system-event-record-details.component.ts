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

  constructor(private _language: LanguageTool) {}

  resource?: EventResourceContent;
  language = {
    event: '',
    trigger: '',
    live: '',
  };
  operation = new SystemEventRecordDetailsOperation();

  Language = Language;

  ngOnChanges(changes: SimpleChanges): void {
    this.change.data(changes['data']);
  }

  private change = {
    data: (change: SimpleChange) => {
      if (change) {
        if (this.data) {
          if (this.data.Resources && this.data.Resources.length > 0) {
            this.resource = this.data.Resources[0];
          }
          this.init(this.data);
        }
      }
    },
  };

  private async init(data: MobileEventRecord) {
    this.language.event = await this._language.event.EventType(data.EventType);
    this.language.trigger = await this._language.event.TriggerType(
      data.TriggerType
    );
    this.language.live = data.IsLiveEvent ? '是' : '否';
  }
}
