import { Injectable } from '@angular/core';
import { GetMobileEventsParams } from '../../../../../../common/data-core/requests/services/system/event/system-event.params';
import { ArmSystemRequestService } from '../../../../../../common/data-core/requests/services/system/system.service';
import { DateTimeTool } from '../../../../../../common/tools/date-time-tool/datetime.tool';
import { SystemEventMapArgs } from './system-event-map-manager.model';

@Injectable()
export class SystemEventMapManagerBusiness {
  constructor(private service: ArmSystemRequestService) {}

  async load(args: SystemEventMapArgs) {
    let duration = DateTimeTool.all.day(args.date);
    let params = new GetMobileEventsParams();
    params.BeginTime = duration.begin;
    params.EndTime = duration.end;
    params.EventTypes = args.types;
    params.EventType = args.type;
    params.Desc = 'EventTime';
    let datas = await this.service.event.all(params);
    // 筛掉未处理的事件
    if (!args.state.includes(1)) {
      datas = datas.filter((x) => {
        return x.Assignment?.Handled;
      });
    }
    if (!args.state.includes(3)) {
      datas = datas.filter((x) => {
        return !x.Assignment?.IsMisInfo;
      });
    }

    if (!args.state.includes(2)) {
      datas = datas.filter((x) => {
        if (!x.Assignment?.Handled) {
          return true;
        }
        return x.Assignment?.IsMisInfo;
      });
    }

    return datas;
  }
}
