import { TransformationType, TransformFnParams } from 'class-transformer';
import '../../../../assets/js/map/CoordinateTransform.js';
import { Base64 } from '../../tools/base64/base64.tool.js';
import { GeoTool } from '../../tools/geo-tool/geo.tool.js';
import { GisType } from '../enums/gis-type.enum.js';
import { GisPoint, GisPoints } from './arm/gis-point.model.js';
import { Time } from './common/time.model';

export class Transformer {
  static Base64(params: TransformFnParams) {
    if (!params.value) return undefined;
    if (params.type === TransformationType.PLAIN_TO_CLASS) {
      return Base64.encode(params.value);
    } else if (params.type === TransformationType.CLASS_TO_PLAIN) {
      return Base64.decode(params.value);
    } else {
      return params.value;
    }
  }
  static Latitude(params: TransformFnParams) {
    if (!params.value) return params.value;
    if (!params.obj) return params.value;
    if (!params.obj.Longitude) return params.value;

    let value = params.value;
    if (typeof params.value === 'string') {
      value = parseFloat(params.value);
    }
    let longitude = params.obj.Longitude;
    if (typeof params.obj.Longitude === 'string') {
      longitude = parseFloat(params.obj.Longitude);
    }

    if (params.type === TransformationType.PLAIN_TO_CLASS) {
      let position = GeoTool.point.convert.wgs84.to.gcj02(longitude, value);
      return position[1] + GeoTool.point.offset.latitude;
    } else if (params.type === TransformationType.CLASS_TO_PLAIN) {
      let position = GeoTool.point.convert.gcj02.to.wgs84(longitude, value);
      return position[1];
    } else {
      return params.value;
    }
  }
  static Longitude(params: TransformFnParams) {
    if (!params.value) return params.value;
    if (!params.obj) return params.value;
    if (!params.obj.Latitude) return params.value;

    let value = params.value;
    if (typeof params.value === 'string') {
      value = parseFloat(params.value);
    }
    let latitude = params.obj.Latitude;
    if (typeof params.obj.Latitude === 'string') {
      latitude = parseFloat(params.obj.Latitude);
    }

    if (params.type === TransformationType.PLAIN_TO_CLASS) {
      let position = GeoTool.point.convert.wgs84.to.gcj02(value, latitude);
      return position[0] + GeoTool.point.offset.longitude;
    } else if (params.type === TransformationType.CLASS_TO_PLAIN) {
      let position = GeoTool.point.convert.gcj02.to.wgs84(value, latitude);
      return position[0];
    } else {
      return params.value;
    }
  }
  static Size(params: TransformFnParams): string | number {
    if (!params.value) return params.value;
    if (params.type === TransformationType.PLAIN_TO_CLASS) {
      let value = params.value / 1024;
      if (value < 1) {
        return `${params.value}字节`;
      }
      value = value / 1024;
      if (value < 1) {
        return `${Math.round((params.value / 1024) * 100) / 100}KB`;
      }
      value = value / 1024;
      if (value < 1) {
        return `${Math.round((params.value / 1024 / 1024) * 100) / 100}MB`;
      }
      value = value / 1024;
      if (value < 1) {
        return `${
          Math.round((params.value / 1024 / 1024 / 1024) * 100) / 100
        }GB`;
      }
      value = value / 1024;
      if (value < 1) {
        return `${
          Math.round((params.value / 1024 / 1024 / 1024 / 1024) * 100) / 100
        }TB`;
      }
      return `${params.value}字节`;
    } else if (params.type === TransformationType.CLASS_TO_PLAIN) {
      if (params.value.endsWith('字节')) {
        return parseInt(params.value);
      } else if (params.value.endsWith('KB')) {
        return parseFloat(params.value) * 1024;
      } else if (params.value.endsWith('MB')) {
        return parseFloat(params.value) * 1024 * 1024;
      } else if (params.value.endsWith('GB')) {
        return parseFloat(params.value) * 1024 * 1024 * 1024;
      } else if (params.value.endsWith('TB')) {
        return parseFloat(params.value) * 1024 * 1024 * 1024 * 1024;
      }
      return parseFloat(params.value);
    } else {
      if (typeof params.value === 'number') {
        return Transformer.Size({
          ...params,
          type: TransformationType.PLAIN_TO_CLASS,
          value: params.value,
        });
      }
      return params.value;
    }
  }
  static Round(params: TransformFnParams, number: number) {
    if (!params.value) return params.value;
    if (params.type === TransformationType.PLAIN_TO_CLASS) {
      let radix = 1;
      for (let i = 0; i < number; i++) {
        radix *= 10;
      }
      return Math.round(params.value * radix) / radix;
    } else {
      return params.value;
    }
  }
  static ArraySort(params: TransformFnParams) {
    if (params.value === undefined || params.value === null) return undefined;
    if (params.type === TransformationType.PLAIN_TO_CLASS) {
      return params.value.sort((a: any, b: any) => {
        return a.Name.length - b.Name.length || a.Name.localeCompare(b.Name);
      });
    } else {
      return params.value;
    }
  }
  static DateTime(params: TransformFnParams) {
    if (params.value === undefined || params.value === null) return undefined;
    if (params.type === TransformationType.PLAIN_TO_CLASS) {
      return new Date(params.value);
    } else if (params.type === TransformationType.CLASS_TO_PLAIN) {
      if (typeof params.value === 'string') {
        return params.value;
      } else if (params.value instanceof Date) {
        let date = new Date(params.value.getTime());
        return `${date.getFullYear()}-${(date.getMonth() + 1)
          .toString()
          .padStart(2, '0')}-${date
          .getDate()
          .toString()
          .padStart(2, '0')}T${date
          .getHours()
          .toString()
          .padStart(2, '0')}:${date
          .getMinutes()
          .toString()
          .padStart(2, '0')}:${date
          .getSeconds()
          .toString()
          .padStart(2, '0')}.${date.getMilliseconds()}${
          date.getTimezoneOffset() < 0 ? '+' : '-'
        }${Math.abs(date.getTimezoneOffset() / 60)
          .toString()
          .padStart(2, '0')}:${Math.abs(date.getTimezoneOffset() % 60)
          .toString()
          .padStart(2, '0')}`;
      } else {
        return params.value;
      }
    } else if (params.type === TransformationType.CLASS_TO_CLASS) {
      if (typeof params.value === 'string') {
        return new Date(params.value);
      } else if (params.value instanceof Date) {
        return new Date(params.value.getTime());
      } else {
        return new Date(params.value);
      }
    } else {
      return params.value;
    }
  }
  static Date(params: TransformFnParams) {
    if (params.type === TransformationType.PLAIN_TO_CLASS) {
      return new Date(params.value);
    } else if (params.type === TransformationType.CLASS_TO_PLAIN) {
      let date = params.value as Date;
      return `${date.getFullYear()}-${(date.getMonth() + 1)
        .toString()
        .padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`;
    } else if (params.type === TransformationType.CLASS_TO_CLASS) {
      return new Date(params.value);
    } else {
      return params.value;
    }
  }
  static Time(params: TransformFnParams) {
    if (Array.isArray(params.value)) {
      if (params.type === TransformationType.PLAIN_TO_CLASS) {
        return params.value.map((x) => new Time(x));
      } else if (params.type === TransformationType.CLASS_TO_PLAIN) {
        return params.value.map((x: Time) => {
          let value = x as Time;
          let hour = value.hour.toString().padStart(2, '0');
          let minute = value.minute.toString().padStart(2, '0');
          let second = value.second.toString().padStart(2, '0');
          return `${hour}:${minute}:${second}`;
        });
      } else if (params.type === TransformationType.CLASS_TO_CLASS) {
        return params.value.map((x) => new Time(x));
      }
    } else {
      if (params.type === TransformationType.PLAIN_TO_CLASS) {
        return new Time(params.value);
      } else if (params.type === TransformationType.CLASS_TO_PLAIN) {
        let value = params.value as Time;
        let hour = value.hour.toString().padStart(2, '0');
        let minute = value.minute.toString().padStart(2, '0');
        let second = value.second.toString().padStart(2, '0');
        return `${hour}:${minute}:${second}`;
      } else if (params.type === TransformationType.CLASS_TO_CLASS) {
        return new Time(params.value);
      }
    }
    return params.value;
  }

  static GisPoint(params: TransformFnParams) {
    if (params.value === undefined || params.value === null) {
      return params.value;
    }

    if (params.type === TransformationType.PLAIN_TO_CLASS) {
      if (!params.value.Longitude || !params.value.Latitude) {
        return undefined;
      }
      let wgs84 = params.value as GisPoint;
      wgs84.GisType = GisType.WGS84;

      let points = new GisPoints();
      points.set(wgs84, GisType.WGS84);
      return points;

      // let gcj02 = GeoTool.point.convert.wgs84.to.gcj02(
      //   wgs84.Longitude,
      //   wgs84.Latitude
      // );
      // gcj02[0] += GeoTool.point.offset.longitude;
      // gcj02[1] += GeoTool.point.offset.latitude;
      // let bd09 = GeoTool.point.convert.gcj02.to.bd09(gcj02[0], gcj02[1]);
      // return {
      //   WGS84: wgs84,
      //   GCJ02: GisPoint.create(gcj02[0], gcj02[1], GisType.GCJ02, params.value),
      //   BD09: GisPoint.create(bd09[0], bd09[1], GisType.BD09, params.value),
      // };
    } else if (params.type === TransformationType.CLASS_TO_PLAIN) {
      let obj = { ...params.value.WGS84 };
      return obj;
    } else if (params.type === TransformationType.CLASS_TO_CLASS) {
      return params.value;
    } else {
      return params.value;
    }
  }
}
