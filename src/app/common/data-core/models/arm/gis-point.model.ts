import { Transform } from 'class-transformer';
import { GisType } from '../../enums/gis-type.enum';
import { IModel } from '../model.interface';
import { transformLatitude, transformLongitude } from '../transformer';

/**	GisPoint (地理信息坐标点)	*/
export class GisPoint implements IModel {
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

  static create(longitude: number, latitude: number): GisPoint {
    let point = new GisPoint();
    point.Longitude = longitude;
    point.Latitude = latitude;
    point.Altitude = 0;
    return point;
  }
  static equals(a: GisPoint, b: GisPoint): boolean {
    return a.Longitude === b.Longitude && a.Latitude === b.Latitude;
  }
  static position(a: GisPoint): number[] {
    return [a.Longitude, a.Latitude];
  }
}
