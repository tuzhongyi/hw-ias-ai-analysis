import { Injectable } from '@angular/core';
import { FileGpsItem } from '../../../../../../common/data-core/models/arm/file/file-gps-item.model';
import {
  GetMobileEventFileGpsItemsParams,
  GetMobileEventFileParams,
} from '../../../../../../common/data-core/requests/services/system/event/system-event.params';
import { ArmSystemRequestService } from '../../../../../../common/data-core/requests/services/system/system.service';
import { ObjectTool } from '../../../../../../common/tools/object-tool/object.tool';
import { SystemEventVideoArgs } from '../system-event-video.model';

@Injectable()
export class SystemEventVideoBusiness {
  constructor(private service: ArmSystemRequestService) {}

  async load(eventId: string, args: SystemEventVideoArgs) {
    let datas = await this.data.load(eventId, args);
    let paths = this.convert(datas);

    if (args.precision == true) {
      paths = paths.filter((group) => {
        return !!group.every((item) => item.HighPrecision);
      });
    } else if (args.precision == false) {
      paths = paths.filter((group) => {
        return !group.every((item) => item.HighPrecision);
      });
    } else {
    }
    return paths;
  }

  private convert(datas: FileGpsItem[]) {
    if (!Array.isArray(datas) || datas.length === 0) {
      return [];
    }

    let result = ObjectTool.model.FileGpsItem.split(datas);
    return result;
  }

  file(eventId: string, args: SystemEventVideoArgs) {
    let params = new GetMobileEventFileParams();
    params.Channel = args.channel;
    params.Duration = args.duration;
    return this.service.event.record.file(eventId, params);
  }

  private data = {
    load: (eventId: string, args: SystemEventVideoArgs) => {
      let params = new GetMobileEventFileGpsItemsParams();
      params.Channel = args.channel;
      params.Duration = args.duration;
      params.Rectified = args.rectified;
      return this.service.event.gps.items(eventId, params);
    },
  };
}
