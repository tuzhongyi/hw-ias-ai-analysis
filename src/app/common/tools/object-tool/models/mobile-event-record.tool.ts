import { formatDate } from '@angular/common';
import { MobileEventRecord } from '../../../data-core/models/arm/event/mobile-event-record.model';

export class MobileEventRecordTool {
  get = {
    name: (data: MobileEventRecord) => {
      if (data.AudioContent) {
        return data.AudioContent;
      }
      if (data.EmergencyDescription) {
        return data.EmergencyDescription;
      }
      if (data.Resources && data.Resources.length > 0) {
        return data.Resources[0].ResourceName;
      }
      return formatDate(data.EventTime, 'yyyy-MM-dd HH:mm:ss', 'en');
    },
    type: {
      shop: [7, 8, 9],
      realtime: [1, 2, 3, 10],
      analysis: [4, 5, 6],
    },
  };
}
