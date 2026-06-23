import { Injectable } from '@angular/core';
import { PlayMode, VideoModel } from '../video-player/video-player.model';

import { VideoUrl } from '../../data-core/models/arm/mobile-device/video-url.model';
import { ConfigRequestService } from '../../data-core/requests/services/config/config.service';
import {
  GetPreviewUrlParams,
  GetVodUrlParams,
} from '../../data-core/requests/services/system/mobile/system-mobile-device.params';
import { ArmSystemRequestService } from '../../data-core/requests/services/system/system.service';
import { Duration } from '../../tools/date-time-tool/duration.model';

@Injectable()
export class VideoPlayerContainerBusiness {
  constructor(
    private service: ArmSystemRequestService,
    private config: ConfigRequestService,
  ) {}

  get webUrl() {
    return this.config.video.then((x) => {
      return x.videoUrl;
    });
  }

  async load(
    deviceId: string,
    channelId: number,
    mode: PlayMode,
    duration?: Duration,
  ): Promise<VideoModel> {
    let data = await this.data.load(deviceId, channelId, mode, duration);
    let model = this.convert(data);
    return model;
  }

  private convert(data: VideoUrl) {
    let model = new VideoModel(data.Url);
    if (data.Username) {
      model.username = data.Username;
    }
    if (data.Password) {
      model.password = data.Password;
    }
    return model;
  }

  private data = {
    load: (
      deviceId: string,
      channelId: number,
      mode: PlayMode,
      duration?: Duration,
    ) => {
      if (mode == PlayMode.vod && !!duration) {
        return this.data.playback(deviceId, channelId, duration);
      } else {
        return this.data.preview(deviceId, channelId);
      }
    },
    preview: async (deviceId: string, channelId: number) => {
      let params = new GetPreviewUrlParams();
      params.DeviceId = deviceId;
      params.ChannelId = channelId;
      params.StreamType = (await this.config.video).preview.stream;
      return this.service.mobile.device.video.preview.url(params);
    },
    playback: async (
      deviceId: string,
      channelId: number,
      duration: Duration,
    ) => {
      let params = new GetVodUrlParams();
      params.DeviceId = deviceId;
      params.ChannelId = channelId;
      params.StreamType = (await this.config.video).playback.stream;
      params.BeginTime = duration.begin;
      params.EndTime = duration.end;
      return this.service.mobile.device.video.vod.url(params);
    },
  };
}
