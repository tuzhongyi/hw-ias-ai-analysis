import { DateTimeTool } from '../../../../../common/tools/date-time-tool/datetime.tool';

export class SystemStatisticRoadObjectDurationArgs {
  duration = DateTimeTool.last.week(new Date());
  eventtype?: number;
  objecttype?: number;
  deviceId?: string;
}
