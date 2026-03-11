import { Injectable } from '@angular/core';
import { GisType } from '../../../../../../common/data-core/enums/gis-type.enum';
import { RoadObjectEventRecord } from '../../../../../../common/data-core/models/arm/geographic/road-object-event-record.model';
import { GisPoints } from '../../../../../../common/data-core/models/arm/gis-point.model';
import { ArmGeographicRequestService } from '../../../../../../common/data-core/requests/services/geographic/geographic.service';
import { GetRoadObjectEventsParams } from '../../../../../../common/data-core/requests/services/geographic/road/road-object/event/geographic-road-object-event.params';
import { LocaleCompare } from '../../../../../../common/tools/compare-tool/compare.tool';
import { SystemStatisticRoadObjectArgs } from './system-statistic-road-object-manager.model';

@Injectable()
export class SystemStatisticRoadObjectManagerBusiness {
  constructor(private service: ArmGeographicRequestService) {}

  async load(args: SystemStatisticRoadObjectArgs) {
    return this.test.load();
    // return this.data.load(args);
  }

  private test = {
    location: [121.48694212514494, 31.287347128218578],
    load: () => {
      let datas: RoadObjectEventRecord[] = [];
      for (let i = 0; i < 100; i++) {
        let data = new RoadObjectEventRecord();
        data.EventTime = this.test.random.time();
        data.RoadObjectName = 'test' + i;
        data.Address = 'test address' + i;
        data.RoadObjectType = Math.floor(Math.random() * 5) + 1;
        data.Location = GisPoints.create(
          this.test.random.location(),
          GisType.GCJ02
        );
        datas.push(data);
      }
      datas = datas.sort((a, b) => {
        return LocaleCompare.compare(a.EndTime, b.EventTime);
      });
      return datas;
    },
    random: {
      location: () => {
        return [
          this.test.location[0] + this.test.random.offset(),
          this.test.location[1] + this.test.random.offset(),
        ] as [number, number];
      },
      time: () => {
        const month = Math.floor(Math.random() * 12) + 1;
        const day = Math.floor(Math.random() * 28) + 1;
        const hour = Math.floor(Math.random() * 24);
        const minute = Math.floor(Math.random() * 60);
        let date = new Date();
        date.setMonth(month, day);
        date.setHours(hour, minute);
        return date;
      },
      offset: () => {
        return (Math.random() - 0.5) * 0.15;
      },
    },
  };

  private data = {
    load: (args: SystemStatisticRoadObjectArgs) => {
      let params = new GetRoadObjectEventsParams();
      params.BeginTime = args.duration.begin;
      params.EndTime = args.duration.end;
      params.Confirmed = true;
      params.IsMisInfo = false;
      params.Desc = 'EventTime';
      return this.service.road.object.event.all(params);
    },
  };
}
