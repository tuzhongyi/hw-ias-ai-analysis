import { DateTimeTool } from '../../tools/date-time-tool/datetime.tool';
import { Duration } from '../../tools/date-time-tool/duration.model';

export interface IVideoArgs {
  deviceId: string;
  channelId: number;
}
export class PreviewArgs implements IVideoArgs {
  deviceId!: string;
  channelId!: number;
}
export class PlaybackArgs implements IVideoArgs {
  deviceId!: string;
  channelId!: number;
  duration: Duration = DateTimeTool.before(new Date());
}
