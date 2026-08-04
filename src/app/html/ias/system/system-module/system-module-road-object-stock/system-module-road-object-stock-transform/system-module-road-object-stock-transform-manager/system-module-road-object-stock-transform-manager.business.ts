import { Injectable } from '@angular/core';
import { GisType } from '../../../../../../../common/data-core/enums/gis-type.enum';
import { RoadObjectStock } from '../../../../../../../common/data-core/models/arm/geographic/road-object-stock.model';
import { RoadObject } from '../../../../../../../common/data-core/models/arm/geographic/road-object.model';
import { GisPoint } from '../../../../../../../common/data-core/models/arm/gis-point.model';
import { ArmGeographicRequestService } from '../../../../../../../common/data-core/requests/services/geographic/geographic.service';

@Injectable()
export class SystemModuleRoadObjectStockTransformManagerBusiness {
  constructor(private service: ArmGeographicRequestService) {}

  /** 将单个 RoadObjectStock 转换为 RoadObject 并创建 */
  async transform(
    stock: RoadObjectStock,
    common: RoadObject,
  ): Promise<RoadObject> {
    let obj = new RoadObject();
    obj.Id = '';
    // 从 stock 继承的数据
    obj.Name = stock.Name;
    obj.Description = stock.Description;
    obj.Location = stock.Location;
    obj.Address = stock.Address;
    obj.ImageUrl = stock.ImageUrl;
    obj.Category = stock.Category;
    obj.IsGeoLine = stock.IsGeoLine;
    obj.GeoLine = stock.GeoLine;
    obj.GroupGuid = stock.GroupGuid;
    obj.GroupName = stock.GroupName;
    obj.GroupGuids = stock.GroupGuids;

    // 从通用配置覆盖
    obj.ObjectType = common.ObjectType;
    obj.DivisionId = common.DivisionId;
    obj.GridCellId = common.GridCellId;
    obj.DisappearTimes = common.DisappearTimes;
    obj.ImageSampling = common.ImageSampling;
    obj.ObjectState = common.ObjectState;
    obj.BlockScheduleEnabled = common.BlockScheduleEnabled;
    obj.BlockSchedule = common.BlockSchedule;

    if (obj.IsGeoLine && obj.GeoLine && obj.GeoLine.length > 0) {
      let point = obj.GeoLine[0];
      obj.Address = await this.address([point.Longitude, point.Latitude]);
    } else {
      obj.Address = await this.address([
        obj.Location.GCJ02.Longitude,
        obj.Location.GCJ02.Latitude,
      ]);
    }

    obj.UpdateTime = new Date();
    obj.CreationTime = new Date();

    return this.service.road.object.create(obj);
  }

  private address(position: [number, number]) {
    let point = new GisPoint();
    point.Longitude = position[0];
    point.Latitude = position[1];
    point.Altitude = 0;
    point.GisType = GisType.GCJ02;
    return this.service.road.address(point).then((x) => {
      return x.FormattedAddress;
    });
  }

  delete(id: string) {
    this.service.road.object.stock.delete(id);
  }
}
