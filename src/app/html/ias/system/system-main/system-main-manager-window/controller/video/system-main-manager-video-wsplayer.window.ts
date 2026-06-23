import { PreviewArgs } from '../../../../../../../common/components/video-player-container/video-player-container.model';
import { WindowViewModel } from '../../../../../../../common/components/window-control/window.model';
import { InputProxyChannel } from '../../../../../../../common/data-core/models/arm/input-proxy-channel.model';
import { IIdNameModel } from '../../../../../../../common/data-core/models/interface/model.interface';
import { SizeTool } from '../../../../../../../common/tools/size-tool/size.tool';

export class SystemMainManagerVideoWSPlayerWindow extends WindowViewModel {
  style = {
    ...SizeTool.window.large,
  };
  title = '';
  src?: string;

  args?: PreviewArgs;

  channel = {
    datas: [] as InputProxyChannel[],
    selected: undefined as number | undefined,
  };

  open(device: IIdNameModel, channels: InputProxyChannel[]) {
    this.title = device.Name;
    this.channel.datas = channels;

    if (channels.length == 0) {
      return;
    }

    this.channel.selected = channels[0].Id;

    let args = new PreviewArgs();
    args.deviceId = device.Id;
    args.channelId = this.channel.selected;
    this.args = args;
    this.show = true;
  }

  change() {
    if (this.args && this.channel.selected) {
      let args = new PreviewArgs();
      args.deviceId = this.args.deviceId;
      args.channelId = this.channel.selected;
      this.args = args;
    }
  }
}
