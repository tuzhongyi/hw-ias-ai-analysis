import { instanceToPlain, plainToInstance } from 'class-transformer';
import { InputProxyChannel } from '../../../../models/arm/input-proxy-channel.model';
import { VideoSourceDescriptor } from '../../../../models/arm/video-source-descriptor.model';
import { InputProxyCapability } from '../../../../models/capabilities/arm/input-proxy-capability.model';
import { HowellResponse } from '../../../../models/response';
import { ArmSystemUrl } from '../../../../urls/arm/system/system.url';
import { HowellHttpClient } from '../../../howell-http.client';
import { HowellResponseProcess } from '../../../service-process';

export class SystemInputProxyRequestService {
  constructor(private http: HowellHttpClient) {}
  capability() {
    let url = ArmSystemUrl.input.proxy.capability();
    return this.http
      .get<HowellResponse<InputProxyCapability>>(url)
      .then((x) => {
        return HowellResponseProcess.item(x, InputProxyCapability);
      });
  }
  async search() {
    let url = ArmSystemUrl.input.proxy.search();
    let response = await this.http.get<HowellResponse<VideoSourceDescriptor[]>>(
      url
    );
    return plainToInstance(VideoSourceDescriptor, response.Data);
  }
  private _channel?: SystemInputProxyChannelRequestService;
  public get channel(): SystemInputProxyChannelRequestService {
    if (!this._channel) {
      this._channel = new SystemInputProxyChannelRequestService(this.http);
    }
    return this._channel;
  }
}
class SystemInputProxyChannelRequestService {
  constructor(private http: HowellHttpClient) {}

  async array() {
    let url = ArmSystemUrl.input.proxy.channel.basic();
    let response = await this.http.get<HowellResponse<InputProxyChannel[]>>(
      url
    );
    return plainToInstance(InputProxyChannel, response.Data);
  }
  async create(data: InputProxyChannel) {
    let plain = instanceToPlain(data);
    let url = ArmSystemUrl.input.proxy.channel.basic();
    let response = await this.http.post<any, HowellResponse<InputProxyChannel>>(
      url,
      plain
    );
    if (response.FaultCode === 0) {
      return plainToInstance(InputProxyChannel, response.Data);
    }
    throw new Error(response.FaultReason);
  }
  async get(id: string) {
    let url = ArmSystemUrl.input.proxy.channel.item(id);
    let response = await this.http.get<HowellResponse<InputProxyChannel>>(url);
    return plainToInstance(InputProxyChannel, response.Data);
  }
  async update(data: InputProxyChannel) {
    let plain = instanceToPlain(data);
    let url = ArmSystemUrl.input.proxy.channel.item(data.Id);
    let response = await this.http.put<any, HowellResponse<InputProxyChannel>>(
      url,
      plain
    );
    if (response.FaultCode === 0) {
      return plainToInstance(InputProxyChannel, response.Data);
    }
    throw new Error(response.FaultReason);
  }
  async delete(id: string) {
    let url = ArmSystemUrl.input.proxy.channel.item(id);
    let response = await this.http.delete<HowellResponse<InputProxyChannel>>(
      url
    );
    if (response.FaultCode === 0) {
      return plainToInstance(InputProxyChannel, response.Data);
    }
    throw new Error(response.FaultReason);
  }

  picture<T = string>(id: T, stream: number = 1, type: string = 'JPEG') {
    return ArmSystemUrl.input.proxy.channel.picture(id, stream, type);
    // return this.http.get<string>(url)
  }

  private _record?: SystemInputProxyChannelRecordRequestService;
  public get record(): SystemInputProxyChannelRecordRequestService {
    if (!this._record) {
      this._record = new SystemInputProxyChannelRecordRequestService(this.http);
    }
    return this._record;
  }
}
class SystemInputProxyChannelRecordRequestService {
  constructor(private http: HowellHttpClient) {}

  start<T = string>(id: T) {
    let url = ArmSystemUrl.input.proxy.channel.record.start(id);
    return this.http.post<HowellResponse<InputProxyChannel>>(url);
  }
  stop<T = string>(id: T) {
    let url = ArmSystemUrl.input.proxy.channel.record.stop(id);
    return this.http.post<HowellResponse<InputProxyChannel>>(url);
  }
}
