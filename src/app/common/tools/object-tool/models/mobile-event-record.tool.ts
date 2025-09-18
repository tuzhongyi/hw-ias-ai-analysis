import { formatDate } from '@angular/common';
import { ArmEventType } from '../../../data-core/enums/event/arm-event-type.enum';
import { MobileEventRecord } from '../../../data-core/models/arm/event/mobile-event-record.model';

export class MobileEventRecordTool {
  get = {
    name: (data: MobileEventRecord) => {
      if (data.EmergencyDescription) {
        return data.EmergencyDescription;
      }
      if (data.Resources && data.Resources.length > 0) {
        return data.Resources[0].ResourceName;
      }
      return formatDate(data.EventTime, 'yyyy-MM-dd HH:mm:ss', 'en');
    },
    type: {
      shop: [
        ArmEventType.ShopRenovation,
        ArmEventType.ShopSignDisappeared,
        ArmEventType.ShopSignCreated,
      ],
      analysis: [
        ArmEventType.RoadDeviceBroken,
        ArmEventType.ShopSignBroken,
        ArmEventType.RoadWork,
      ],
    },
  };
}
