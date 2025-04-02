import {
  GeoDirection,
  GeoDirectionSort,
  GeoLatitudeDirection,
  GeoLongitudeDirection,
  GeoPoint,
} from './geo.model';

export class GeoPointSortTool {
  // private transform(point: GeoPoint, sort: GeoDirectionSort) {
  //   // 经度转换：east时正向排序，west时取反
  //   const x =
  //     sort.lon === GeoLongitudeDirection.east2west ? -point[0] : point[0];
  //   // 纬度转换：north时取反（因为北边的纬度大，通常希望排序在前），south时正向
  //   // 注意：这里的处理方式可根据你的实际需求调整
  //   const y =
  //     sort.lat === GeoLatitudeDirection.north2south ? point[1] : -point[1];
  //   return { x, y };
  // }

  // private score(
  //   point: GeoPoint,
  //   sort: GeoDirectionSort,
  //   weight: {
  //     ew: number;
  //     ns: number;
  //   }
  // ) {
  //   const { x, y } = this.transform(point, sort);
  //   console.log(x, y);
  //   return Math.sqrt((weight.ew * x) ** 2 + (weight.ns * y) ** 2);
  // }

  // private distance(point: GeoPoint, sort: GeoDirectionSort) {
  //   const { x, y } = this.transform(point, sort);
  //   return Math.sqrt(x * x + y * y);
  // }

  // compare(a: GeoPoint, b: GeoPoint, sort: GeoDirectionSort) {
  //   let _a = this.distance(a, sort);
  //   let _b = this.distance(b, sort);
  //   return _a - _b;
  // }

  longitude(a: GeoPoint, b: GeoPoint, sort: GeoLongitudeDirection) {
    if (sort === GeoLongitudeDirection.east2west) {
      return b[0] - a[0]; // 大的排前面
    } else if (sort === GeoLongitudeDirection.west2east) {
      return a[0] - b[0]; // 小的排前面
    }
    return 0;
  }
  latitude(a: GeoPoint, b: GeoPoint, sort: GeoLatitudeDirection) {
    if (sort === GeoLatitudeDirection.north2south) {
      return b[1] - a[1]; // 大的排前面
    } else if (sort === GeoLatitudeDirection.south2north) {
      return a[1] - b[1]; // 小的排前面
    }
    return 0;
  }

  compare(a: GeoPoint, b: GeoPoint, sort: GeoDirectionSort) {
    let longitudeCompare = 0;
    if (sort.lon === GeoLongitudeDirection.east2west) {
      longitudeCompare = b[0] - a[0]; // 大的排前面
    } else if (sort.lon === GeoLongitudeDirection.west2east) {
      longitudeCompare = a[0] - b[0]; // 小的排前面
    }

    // 如果经度相同，再根据纬度排序
    if (longitudeCompare === 0) {
      let latitudeCompare = 0;
      if (sort.lat === GeoLatitudeDirection.north2south) {
        latitudeCompare = b[1] - a[1]; // 大的排前面
      } else if (sort.lat === GeoLatitudeDirection.south2north) {
        latitudeCompare = a[1] - b[1]; // 小的排前面
      }
      return latitudeCompare;
    }

    return longitudeCompare;
  }

  direction(points: GeoPoint[]) {
    if (!Array.isArray(points) || points.length < 2) {
      throw new Error('输入的坐标数组不合法');
    }

    // 获取第一个和最后一个点的经纬度
    const start = points[0];
    const end = points[points.length - 1];

    const latDiff = end[1] - start[1]; // 纬度差异
    const lngDiff = end[0] - start[0]; // 经度差异

    // 判断是南北向还是东西向
    if (Math.abs(lngDiff) > Math.abs(latDiff)) {
      return GeoDirection.ew;
    } else {
      return GeoDirection.ns;
    }
  }
}
