import { Injectable } from '@angular/core';
import { GisType } from '../../../../../../common/data-core/enums/gis-type.enum';
import { FileGpsItem } from '../../../../../../common/data-core/models/arm/file/file-gps-item.model';
import { RoadObjectEventRecord } from '../../../../../../common/data-core/models/arm/geographic/road-object-event-record.model';
import { GisPoints } from '../../../../../../common/data-core/models/arm/gis-point.model';
import { ArmGeographicRequestService } from '../../../../../../common/data-core/requests/services/geographic/geographic.service';
import { GetRoadObjectEventsParams } from '../../../../../../common/data-core/requests/services/geographic/road/road-object/event/geographic-road-object-event.params';
import {
  GetMobileDeviceRoutesParams,
  GetMobileDevicesParams,
} from '../../../../../../common/data-core/requests/services/system/mobile/system-mobile-device.params';
import { ArmSystemRequestService } from '../../../../../../common/data-core/requests/services/system/system.service';
import { LocaleCompare } from '../../../../../../common/tools/compare-tool/compare.tool';
import { DateTimeTool } from '../../../../../../common/tools/date-time-tool/datetime.tool';
import { Duration } from '../../../../../../common/tools/date-time-tool/duration.model';
import { SystemStatisticRoadObjectArgs } from './system-statistic-road-object-manager.model';

@Injectable()
export class SystemStatisticRoadObjectManagerBusiness {
  constructor(
    geo: ArmGeographicRequestService,
    system: ArmSystemRequestService
  ) {
    this.service = { geo, system };
  }

  private service: {
    geo: ArmGeographicRequestService;
    system: ArmSystemRequestService;
  };

  async record(args: SystemStatisticRoadObjectArgs) {
    // return this.test.load();
    return this.data.record(args);
  }
  async path(
    deviceId: string,
    records: RoadObjectEventRecord[]
  ): Promise<FileGpsItem[]> {
    if (records.length == 0) {
      return [];
    } else if (records.length == 1) {
      let record = records[0];
      let duration = DateTimeTool.beforeOrAfter(record.EventTime, 30);
      return this.data.path(deviceId, duration);
    } else {
      let begin = records[0].EventTime;
      begin.setMinutes(begin.getMinutes() - 1);
      let end = records[records.length - 1].EventTime;
      end.setMinutes(end.getMinutes() + 1);
      let duration = { begin, end };
      return this.data.path(deviceId, duration);
    }
  }
  devices(deviceIds: string[]) {
    let params = new GetMobileDevicesParams();
    params.Ids = deviceIds;
    return this.service.system.mobile.device.cache.array(params);
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
        data.RoadObjectId = `id_road_object_${i + 1}`;
        data.Id = `id_${i + 1}`;
        data.RoadObjectType = Math.floor(Math.random() * 5) + 1;
        data.EventType = Math.floor(Math.random() * 3) + 1;
        data.Location = GisPoints.create(
          this.test.random.location(),
          GisType.GCJ02
        );
        datas.push(data);
      }
      datas = datas.sort((a, b) => {
        return LocaleCompare.compare(a.EventTime, b.EventTime);
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

        date.setHours(hour, minute);
        return date;
      },
      offset: () => {
        return (Math.random() - 0.5) * 0.15;
      },
    },
  };

  private data = {
    record: (args: SystemStatisticRoadObjectArgs) => {
      let duration = DateTimeTool.all.day(args.date);
      let params = new GetRoadObjectEventsParams();
      params.BeginTime = duration.begin;
      params.EndTime = duration.end;
      if (args.eventtype != undefined) {
        params.EventType = args.eventtype;
      }
      if (args.objecttype != undefined) {
        params.RoadObjectType = args.objecttype;
      }

      params.Confirmed = true;
      params.IsMisInfo = false;
      params.Asc = 'EventTime';
      return this.service.geo.road.object.event.all(params);
    },
    path: (deviceId: string, duration: Duration, rectified = false) => {
      let params = new GetMobileDeviceRoutesParams();
      params.MobileDeviceId = deviceId;
      params.BeginTime = duration.begin;
      params.EndTime = duration.end;
      params.Rectified = rectified;
      return this.service.system.mobile.device.route.all(params).catch((x) => {
        return [];
      });
    },
  };
}
