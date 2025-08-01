import {
  Transform,
  TransformFnParams,
  TransformationType,
} from 'class-transformer';
import { GeoTool } from '../../../tools/geo-tool/geo.tool';
import { GisType } from '../../enums/gis-type.enum';
import { IGisModel } from '../model.interface';
import { transformLatitude, transformLongitude } from '../transformer';

/**	GisPoint (地理信息坐标点)	*/
export class GisPoint implements IGisModel {
  /**	Double	经度	M	*/
  @Transform(transformLongitude)
  Longitude!: number;
  /**	Double	纬度	M	*/
  @Transform(transformLatitude)
  Latitude!: number;
  /**	Double	高度	M	*/
  Altitude!: number;
  /**	Int32	楼层	O	*/
  Floor?: number;
  /**	Int32	坐标系类型	O	*/
  GisType?: GisType;
  /**	Double	速度，单位：km/h	O */
  Speed?: number;
  /**	Double	偏北角方向，0-360	O */
  Course?: number;

  static create(longitude: number, latitude: number, type?: GisType): GisPoint {
    let point = new GisPoint();
    point.Longitude = longitude;
    point.Latitude = latitude;
    point.Altitude = 0;
    point.GisType = type;
    return point;
  }
  static equals(a: GisPoint, b: GisPoint): boolean {
    return a.Longitude === b.Longitude && a.Latitude === b.Latitude;
  }
  static position(a: GisPoint): number[] {
    return [a.Longitude, a.Latitude];
  }
}

export class GisPoints {
  WGS84!: GisPoint;
  GCJ02!: GisPoint;
  BD09!: GisPoint;

  set(value: GisPoint, type: GisType) {
    switch (type) {
      case GisType.WGS84:
        this.change.from.wgs84(value);
        break;
      case GisType.GCJ02:
        this.change.from.gcj02(value);
        break;
      case GisType.BD09:
        this.change.from.bd09(value);
        break;

      default:
        break;
    }
  }

  private change = {
    from: {
      wgs84: (value: GisPoint) => {
        let position = {
          wgs84: [0, 0],
          gcj02: [0, 0],
          bd09: [0, 0],
        };
        this.WGS84 = value;
        position.gcj02 = GeoTool.point.convert.wgs84.to.gcj02(
          value.Longitude,
          value.Latitude
        );
        this.GCJ02 = GisPoint.create(
          position.gcj02[0],
          position.gcj02[1],
          GisType.GCJ02
        );
        position.bd09 = GeoTool.point.convert.gcj02.to.bd09(
          position.gcj02[0],
          position.gcj02[1]
        );
        this.BD09 = GisPoint.create(
          position.bd09[0],
          position.bd09[1],
          GisType.BD09
        );
      },
      gcj02: (value: GisPoint) => {
        let position = {
          wgs84: [0, 0],
          gcj02: [0, 0],
          bd09: [0, 0],
        };
        this.GCJ02 = value;
        position.wgs84 = GeoTool.point.convert.gcj02.to.wgs84(
          value.Longitude,
          value.Latitude
        );
        this.WGS84 = GisPoint.create(
          position.wgs84[0],
          position.wgs84[1],
          GisType.WGS84
        );
        position.bd09 = GeoTool.point.convert.gcj02.to.bd09(
          value.Longitude,
          value.Latitude
        );
        this.BD09 = GisPoint.create(
          position.bd09[0],
          position.bd09[1],
          GisType.BD09
        );
      },
      bd09: (value: GisPoint) => {
        let position = {
          wgs84: [0, 0],
          gcj02: [0, 0],
          bd09: [0, 0],
        };

        this.BD09 = value;
        position.gcj02 = GeoTool.point.convert.bd09.to.gcj02(
          value.Longitude,
          value.Latitude
        );
        this.GCJ02 = GisPoint.create(
          position.gcj02[0],
          position.gcj02[1],
          GisType.GCJ02
        );
        position.wgs84 = GeoTool.point.convert.gcj02.to.wgs84(
          position.gcj02[0],
          position.gcj02[1]
        );
        this.WGS84 = GisPoint.create(
          position.wgs84[0],
          position.wgs84[1],
          GisType.WGS84
        );
      },
    },
  };
}

export function transformGisPoint(params: TransformFnParams) {
  if (params.value === undefined || params.value === null) {
    return params.value;
  }
  if (params.type === TransformationType.PLAIN_TO_CLASS) {
    let wgs84 = params.value;
    let gcj02 = GeoTool.point.convert.wgs84.to.gcj02(
      wgs84.Longitude,
      wgs84.Latitude
    );
    let bd09 = GeoTool.point.convert.gcj02.to.bd09(gcj02[0], gcj02[1]);
    return {
      WGS84: wgs84,
      GCJ02: GisPoint.create(gcj02[0], gcj02[1], GisType.GCJ02),
      BD09: GisPoint.create(bd09[0], bd09[1], GisType.BD09),
    };
  } else if (params.type === TransformationType.CLASS_TO_PLAIN) {
    return params.value.WGS84;
  } else if (params.type === TransformationType.CLASS_TO_CLASS) {
    return params.value;
  } else {
    return params.value;
  }
}
