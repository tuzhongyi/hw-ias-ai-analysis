// 常量定义
const kKRASOVSKY_A: number = 6378245.0; // 赤道半径 [单位: 米]
const kKRASOVSKY_B: number = 6356863.0187730473; // 极半径
const kKRASOVSKY_ECCSQ: number = 6.6934216229659332e-3; // 第一偏心率平方
const kKRASOVSKY_ECC2SQ: number = 6.7385254146834811e-3; // 第二偏心率平方
const PI: number = 3.14159265358979323846;

const kDEG2RAD: number = PI / 180.0;
const kRAD2DEG: number = 180.0 / PI;

// 坐标点接口
interface Point {
  lon: number;
  lat: number;
}

// 偏导数接口
interface PartialDerivative {
  dlongcj_dlonwgs: number;
  dlatgcj_dlonwgs: number;
}

interface LatPartialDerivative {
  dlongcj_dlatwgs: number;
  dlatgcj_dlatwgs: number;
}

export class CoordinateTransform {
  /**
   * 角度单位转换，度到弧度
   */
  Deg2Rad(deg: number): number {
    return deg * kDEG2RAD;
  }

  /**
   * 角度单位转换，弧度到度
   */
  Rad2Deg(rad: number): number {
    return rad * kRAD2DEG;
  }

  /**
   * 粗略检查点是否在中国范围内
   */
  OutOfChina(lon: number, lat: number): boolean {
    return !(
      72.004 <= lon &&
      lon <= 137.8347 &&
      0.8293 <= lat &&
      lat <= 55.8271
    );
  }

  /**
   * 获取GCJ-02使用的大地偏移量
   */
  GetGeodeticOffset(wgs84lon: number, wgs84lat: number): Point {
    // 获取相对于"中国中心"的大地偏移
    let lon0: number = wgs84lon - 105.0;
    let lat0: number = wgs84lat - 35.0;

    // 生成粗略的米制偏移量
    let lon1: number =
      300.0 +
      lon0 +
      2.0 * lat0 +
      0.1 * lon0 * lon0 +
      0.1 * lon0 * lat0 +
      0.1 * Math.sqrt(Math.abs(lon0));
    lon1 =
      lon1 +
      ((20.0 * Math.sin(6.0 * lon0 * PI) + 20.0 * Math.sin(2.0 * lon0 * PI)) *
        2.0) /
        3.0;
    lon1 =
      lon1 +
      ((20.0 * Math.sin(lon0 * PI) + 40.0 * Math.sin((lon0 / 3.0) * PI)) *
        2.0) /
        3.0;
    lon1 =
      lon1 +
      ((150.0 * Math.sin((lon0 / 12.0) * PI) +
        300.0 * Math.sin((lon0 * PI) / 30.0)) *
        2.0) /
        3.0;

    let lat1: number =
      -100.0 +
      2.0 * lon0 +
      3.0 * lat0 +
      0.2 * lat0 * lat0 +
      0.1 * lon0 * lat0 +
      0.2 * Math.sqrt(Math.abs(lon0));
    lat1 =
      lat1 +
      ((20.0 * Math.sin(6.0 * lon0 * PI) + 20.0 * Math.sin(2.0 * lon0 * PI)) *
        2.0) /
        3.0;
    lat1 =
      lat1 +
      ((20.0 * Math.sin(lat0 * PI) + 40.0 * Math.sin((lat0 / 3.0) * PI)) *
        2.0) /
        3.0;
    lat1 =
      lat1 +
      ((160.0 * Math.sin((lat0 / 12.0) * PI) +
        320.0 * Math.sin((lat0 * PI) / 30.0)) *
        2.0) /
        3.0;

    // 纬度转弧度
    const B: number = this.Deg2Rad(wgs84lat);
    const sinB: number = Math.sin(B);
    const cosB: number = Math.cos(B);
    const W: number = Math.sqrt(1 - kKRASOVSKY_ECCSQ * sinB * sinB);
    const N: number = kKRASOVSKY_A / W;

    // GCJ-02使用的大地偏移
    const lon2: number = this.Rad2Deg(lon1 / (N * cosB));
    const lat2: number = this.Rad2Deg(
      (lat1 * W * W) / (N * (1 - kKRASOVSKY_ECCSQ))
    );

    return { lon: lon2, lat: lat2 };
  }

  /**
   * 将WGS84坐标系中的大地坐标转换为GCJ-02坐标系中的大地坐标
   */
  Wgs2Gcj(wgs84lon: number, wgs84lat: number): Point {
    if (this.OutOfChina(wgs84lon, wgs84lat)) {
      return { lon: wgs84lon, lat: wgs84lat };
    }

    const offset: Point = this.GetGeodeticOffset(wgs84lon, wgs84lat);
    const gcj02lon: number = wgs84lon + offset.lon;
    const gcj02lat: number = wgs84lat + offset.lat;

    return { lon: gcj02lon, lat: gcj02lat };
  }

  /**
   * 将GCJ-02坐标系中的大地坐标转换为WGS84坐标系中的大地坐标
   * 简单线性迭代方法
   */
  Gcj2Wgs_SimpleIteration(gcj02lon: number, gcj02lat: number): Point {
    if (this.OutOfChina(gcj02lon, gcj02lat)) {
      return { lon: gcj02lon, lat: gcj02lat };
    }

    let result: Point = this.Wgs2Gcj(gcj02lon, gcj02lat);
    let lon0: number = gcj02lon - (result.lon - gcj02lon);
    let lat0: number = gcj02lat - (result.lat - gcj02lat);

    let iterCounts: number = 0;
    while (++iterCounts < 1000) {
      result = this.Wgs2Gcj(lon0, lat0);
      const dlon: number = result.lon - gcj02lon;
      const dlat: number = result.lat - gcj02lat;

      const lon1: number = lon0 - dlon;
      const lat1: number = lat0 - dlat;

      // 1.0e-9 度对应 0.1mm
      if (Math.abs(dlon) < 1.0e-9 && Math.abs(dlat) < 1.0e-9) {
        break;
      }

      lon0 = lon1;
      lat0 = lat1;
    }

    return { lon: lon0, lat: lat0 };
  }

  /**
   * 计算相对于估计WGS84经度的偏导数
   */
  GetPartialDerivative_Lon(
    wgs84lon: number,
    wgs84lat: number,
    dlon: number
  ): PartialDerivative {
    const lonBk: number = wgs84lon + dlon;
    const lonFw: number = wgs84lon - dlon;

    const resultBk: Point = this.Wgs2Gcj(lonBk, wgs84lat);
    const resultFw: Point = this.Wgs2Gcj(lonFw, wgs84lat);

    const dlongcj_dlonwgs: number =
      (resultBk.lon - resultFw.lon) / (dlon * 2.0);
    const dlatgcj_dlonwgs: number =
      (resultBk.lat - resultFw.lat) / (dlon * 2.0);

    return { dlongcj_dlonwgs, dlatgcj_dlonwgs };
  }

  /**
   * 计算相对于估计WGS84纬度的偏导数
   */
  GetPartialDerivative_Lat(
    wgs84lon: number,
    wgs84lat: number,
    dlat: number
  ): LatPartialDerivative {
    const latBk: number = wgs84lat + dlat;
    const latFw: number = wgs84lat - dlat;

    const resultBk: Point = this.Wgs2Gcj(wgs84lon, latBk);
    const resultFw: Point = this.Wgs2Gcj(wgs84lon, latFw);

    const dlongcj_dlatwgs: number =
      (resultBk.lon - resultFw.lon) / (dlat * 2.0);
    const dlatgcj_dlatwgs: number =
      (resultBk.lat - resultFw.lat) / (dlat * 2.0);

    return { dlongcj_dlatwgs, dlatgcj_dlatwgs };
  }

  /**
   * 将GCJ-02坐标系中的大地坐标转换为WGS84坐标系中的大地坐标
   * 数值微分方法
   */
  Gcj2Wgs_NumbericDiff(gcj02lon: number, gcj02lat: number): Point {
    if (this.OutOfChina(gcj02lon, gcj02lat)) {
      return { lon: gcj02lon, lat: gcj02lat };
    }

    let wgs84lon: number = gcj02lon;
    let wgs84lat: number = gcj02lat;
    let nIterCount: number = 0;
    const tol: number = 1e-9;

    while (++nIterCount < 1000) {
      const derivLon: PartialDerivative = this.GetPartialDerivative_Lon(
        wgs84lon,
        wgs84lat,
        tol
      );
      const derivLat: LatPartialDerivative = this.GetPartialDerivative_Lat(
        wgs84lon,
        wgs84lat,
        tol
      );

      const dlongcj_dlonwgs: number = derivLon.dlongcj_dlonwgs;
      const dlatgcj_dlonwgs: number = derivLon.dlatgcj_dlonwgs;
      const dlongcj_dlatwgs: number = derivLat.dlongcj_dlatwgs;
      const dlatgcj_dlatwgs: number = derivLat.dlatgcj_dlatwgs;

      const gcj02Est: Point = this.Wgs2Gcj(wgs84lon, wgs84lat);
      const l_lon: number = gcj02lon - gcj02Est.lon;
      const l_lat: number = gcj02lat - gcj02Est.lat;

      const d_latwgs: number =
        (l_lon * dlatgcj_dlonwgs - l_lat * dlongcj_dlonwgs) /
        (dlongcj_dlatwgs * dlatgcj_dlonwgs - dlatgcj_dlatwgs * dlongcj_dlonwgs);
      const d_lonwgs: number =
        (l_lon - dlongcj_dlatwgs * d_latwgs) / dlongcj_dlonwgs;

      if (Math.abs(d_latwgs) < tol && Math.abs(d_lonwgs) < tol) {
        break;
      }

      wgs84lon = wgs84lon + d_lonwgs;
      wgs84lat = wgs84lat + d_latwgs;
    }

    return { lon: wgs84lon, lat: wgs84lat };
  }

  /**
   * 将GCJ-02坐标系中的大地坐标转换为WGS84坐标系中的大地坐标
   * 解析微分方法
   */
  Gcj2Wgs_AnalyticDiff(gcj02lon: number, gcj02lat: number): Point {
    if (this.OutOfChina(gcj02lon, gcj02lat)) {
      return { lon: gcj02lon, lat: gcj02lat };
    }

    let wgs84lon: number = gcj02lon;
    let wgs84lat: number = gcj02lat;
    let nIterCount: number = 0;

    while (++nIterCount < 1000) {
      // 获取相对于"中国中心"的大地偏移
      const lon0: number = wgs84lon - 105.0;
      const lat0: number = wgs84lat - 35.0;

      // 生成粗略的米制偏移量
      let lon1: number =
        300.0 +
        lon0 +
        2.0 * lat0 +
        0.1 * lon0 * lon0 +
        0.1 * lon0 * lat0 +
        0.1 * Math.sqrt(Math.abs(lon0));
      lon1 =
        lon1 +
        ((20.0 * Math.sin(6.0 * lon0 * PI) + 20.0 * Math.sin(2.0 * lon0 * PI)) *
          2.0) /
          3.0;
      lon1 =
        lon1 +
        ((20.0 * Math.sin(lon0 * PI) + 40.0 * Math.sin((lon0 / 3.0) * PI)) *
          2.0) /
          3.0;
      lon1 =
        lon1 +
        ((150.0 * Math.sin((lon0 / 12.0) * PI) +
          300.0 * Math.sin((lon0 * PI) / 30.0)) *
          2.0) /
          3.0;

      let lat1: number =
        -100.0 +
        2.0 * lon0 +
        3.0 * lat0 +
        0.2 * lat0 * lat0 +
        0.1 * lon0 * lat0 +
        0.2 * Math.sqrt(Math.abs(lon0));
      lat1 =
        lat1 +
        ((20.0 * Math.sin(6.0 * lon0 * PI) + 20.0 * Math.sin(2.0 * lon0 * PI)) *
          2.0) /
          3.0;
      lat1 =
        lat1 +
        ((20.0 * Math.sin(lat0 * PI) + 40.0 * Math.sin((lat0 / 3.0) * PI)) *
          2.0) /
          3.0;
      lat1 =
        lat1 +
        ((160.0 * Math.sin((lat0 / 12.0) * PI) +
          320.0 * Math.sin((lat0 * PI) / 30.0)) *
          2.0) /
          3.0;

      let g_lon0: number = 0;
      if (lon0 > 0) {
        g_lon0 = 0.05 / Math.sqrt(lon0);
      } else if (lon0 < 0) {
        g_lon0 = -0.05 / Math.sqrt(-lon0);
      }

      const PIlon0: number = PI * lon0;
      const PIlat0: number = PI * lat0;

      const dlon1_dlonwgs: number =
        1 +
        0.2 * lon0 +
        0.1 * lat0 +
        g_lon0 +
        ((120 * PI * Math.cos(6 * PIlon0) +
          40 * PI * Math.cos(2 * PIlon0) +
          (20 * PI * Math.cos(PIlon0) +
            ((40 * PI) / 3.0) * Math.cos(PIlon0 / 3.0)) +
          (12.5 * PI * Math.cos(PIlon0 / 12.0) +
            10 * PI * Math.cos(PIlon0 / 30.0))) *
          2.0) /
          3.0;
      const dlon1_dlatwgs: number = 2 + 0.1 * lon0;

      const dlat1_dlonwgs: number =
        2 +
        0.1 * lat0 +
        2 * g_lon0 +
        ((120 * PI * Math.cos(6 * PIlon0) + 40 * PI * Math.cos(2 * PIlon0)) *
          2.0) /
          3.0;
      const dlat1_dlatwgs: number =
        3 +
        0.4 * lat0 +
        0.1 * lon0 +
        ((20 * PI * Math.cos(PIlat0) +
          ((40.0 * PI) / 3.0) * Math.cos(PIlat0 / 3.0) +
          (((40 * PI) / 3.0) * Math.cos(PIlat0 / 12.0) +
            ((32.0 * PI) / 3.0) * Math.cos(PIlat0 / 30.0))) *
          2.0) /
          3.0;

      // 纬度转弧度
      const B: number = this.Deg2Rad(wgs84lat);
      const sinB: number = Math.sin(B);
      const cosB: number = Math.cos(B);
      const WSQ: number = 1 - kKRASOVSKY_ECCSQ * sinB * sinB;
      const W: number = Math.sqrt(WSQ);
      const N: number = kKRASOVSKY_A / W;

      const dW_dlatwgs: number =
        (-PI * kKRASOVSKY_ECCSQ * sinB * cosB) / (180.0 * W);
      const dN_dlatwgs: number = (-kKRASOVSKY_A * dW_dlatwgs) / WSQ;

      const PIxNxCosB: number = PI * N * cosB;
      const dlongcj_dlonwgs: number = 1.0 + (180.0 * dlon1_dlonwgs) / PIxNxCosB;
      const dlongcj_dlatwgs: number =
        (180 * dlon1_dlatwgs) / PIxNxCosB -
        (180 * lon1 * PI * (dN_dlatwgs * cosB - (PI * N * sinB) / 180.0)) /
          (PIxNxCosB * PIxNxCosB);

      const PIxNxSubECCSQ: number = PI * N * (1 - kKRASOVSKY_ECCSQ);
      const dlatgcj_dlonwgs: number =
        (180 * WSQ * dlat1_dlonwgs) / PIxNxSubECCSQ;
      const dlatgcj_dlatwgs: number =
        1.0 +
        (180 *
          (N * (dlat1_dlatwgs * WSQ + 2.0 * lat1 * W * dW_dlatwgs) -
            lat1 * WSQ * dN_dlatwgs)) /
          (N * PIxNxSubECCSQ);

      const gcj02Est: Point = this.Wgs2Gcj(wgs84lon, wgs84lat);
      const l_lon: number = gcj02lon - gcj02Est.lon;
      const l_lat: number = gcj02lat - gcj02Est.lat;

      const d_latwgs: number =
        (l_lon * dlatgcj_dlonwgs - l_lat * dlongcj_dlonwgs) /
        (dlongcj_dlatwgs * dlatgcj_dlonwgs - dlatgcj_dlatwgs * dlongcj_dlonwgs);
      const d_lonwgs: number =
        (l_lon - dlongcj_dlatwgs * d_latwgs) / dlongcj_dlonwgs;

      if (Math.abs(d_latwgs) < 1.0e-9 && Math.abs(d_lonwgs) < 1.0e-9) {
        break;
      }

      wgs84lon = wgs84lon + d_lonwgs;
      wgs84lat = wgs84lat + d_latwgs;
    }

    return { lon: wgs84lon, lat: wgs84lat };
  }
}

export type { LatPartialDerivative, PartialDerivative, Point };
