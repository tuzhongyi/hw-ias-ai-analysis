import {
  IVideoArgs,
  PlaybackArgs,
  PreviewArgs,
} from '../../../../../../common/components/video-player-container/video-player-container.model';
import { WindowViewModel } from '../../../../../../common/components/window-control/window.model';
import { IIdNameModel } from '../../../../../../common/data-core/models/interface/model.interface';
import { Duration } from '../../../../../../common/tools/date-time-tool/duration.model';
import { ObjectTool } from '../../../../../../common/tools/object-tool/object.tool';
import { SizeTool } from '../../../../../../common/tools/size-tool/size.tool';

export class SystemModuleMobileDeviceRouteWindow {
  video = new VideoWindow();
}

class VideoWindow extends WindowViewModel {
  style = {
    ...SizeTool.window.large,
  };

  args?: IVideoArgs;

  title = '';

  preview(device: IIdNameModel, channelId: number) {
    this.title = device.Name;

    let args = new PreviewArgs();
    args.deviceId = device.Id;
    args.channelId = channelId;

    this.args = args;
    this.show = true;
  }
  playback(device: IIdNameModel, channelId: number, duration: Duration) {
    this.title = device.Name;

    let args = new PlaybackArgs();
    args.deviceId = device.Id;
    args.channelId = channelId;
    args.duration = duration;

    this.args = args;
    this.show = true;
  }

  change = {
    duration: (duration: Duration) => {
      if (!this.args) return;
      let args = ObjectTool.assign(this.args, PlaybackArgs);
      args.duration = duration;
      this.args = args;
    },
    channel: (channel: number) => {
      if (!this.args) return;
      let args: IVideoArgs;
      if (this.args instanceof PreviewArgs) {
        args = ObjectTool.assign(this.args, PreviewArgs);
      } else if (this.args instanceof PlaybackArgs) {
        args = ObjectTool.assign(this.args, PlaybackArgs);
      } else {
        return;
      }

      args.channelId = channel;

      this.args = args;
    },
  };
}
