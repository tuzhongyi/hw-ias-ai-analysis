import { Injectable } from '@angular/core';
import { ILocation } from '../../../../../common/data-core/models/model.interface';
import { ArmAnalysisRequestService } from '../../../../../common/data-core/requests/services/analysis/analysis.service';
import { GetAnalysisGpsTaskSampleListParams } from '../../../../../common/data-core/requests/services/analysis/llm/analysis-llm.params';
import { GetMobileEventsParams } from '../../../../../common/data-core/requests/services/system/event/system-event.params';
import { ArmSystemRequestService } from '../../../../../common/data-core/requests/services/system/system.service';
import { Duration } from '../../../../../common/tools/date-time-tool/duration.model';
import { SystemEventTableArgs } from '../../system-event/system-event-table/business/system-event-table.model';
import { EventMode } from '../system-main-map-navigation/system-main-map-navigation.model';

@Injectable()
export class SystemMainMapHeatmapBusiness {
  constructor(
    system: ArmSystemRequestService,
    analysis: ArmAnalysisRequestService
  ) {
    this.service = { system, analysis };
  }

  private service: {
    system: ArmSystemRequestService;
    analysis: ArmAnalysisRequestService;
  };

  async load(mode: EventMode, args: SystemEventTableArgs) {
    let datas = await this.data.load(mode, args);

    return datas;
  }

  private data = {
    load: (
      mode: EventMode,
      args: SystemEventTableArgs
    ): Promise<ILocation[]> => {
      switch (mode) {
        case EventMode.realtime:
        case EventMode.shop:
          return this.data.event(args);
        case EventMode.gpstask:
          return this.data.gpstask(args.duration);
        default:
          throw new Error('Mode not supported');
      }
    },
    event: (args: SystemEventTableArgs) => {
      let params = new GetMobileEventsParams();
      params.BeginTime = args.duration.begin;
      params.EndTime = args.duration.end;
      params.EventTypes = args.types;
      if (args.type) {
        params.EventType = args.type;
      }
      return this.service.system.event.all(params);
    },
    gpstask: (duration: Duration) => {
      let params = new GetAnalysisGpsTaskSampleListParams();
      params.BeginTime = duration.begin;
      params.EndTime = duration.end;
      return this.service.analysis.llm.gps.task.sample.all(params);
    },
  };
}
