import { Injectable } from '@angular/core';
import { MobileEventRecord } from '../../../../../../../../../common/data-core/models/arm/event/mobile-event-record.model';
import { IConverter } from '../../../../../../../../../common/data-core/models/converter.interface';
import { LanguageTool } from '../../../../../../../../../common/tools/language-tool/language.tool';
import { ObjectTool } from '../../../../../../../../../common/tools/object-tool/object.tool';
import { MobileEventRecordModel } from '../system-event-map-panel-record-table.model';

@Injectable()
export class SystemEventMapPanelRecordTableAnalysisConverter
  implements IConverter<MobileEventRecord, MobileEventRecordModel>
{
  constructor(private language: LanguageTool) {}
  convert(data: MobileEventRecord) {
    let model = new MobileEventRecordModel();
    model = Object.assign(model, data);
    model.Name =
      data.AudioContent ?? ObjectTool.model.MobileEventRecord.get.name(data);
    model.EventTypeName = this.language.event.EventType(model.EventType);
    return model;
  }
}
