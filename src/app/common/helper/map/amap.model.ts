export interface AMapInputTip {
  id: string | string[];
  name: string;
  district: string | string[];
  adcode: string | string[];
  location: string | string[];
  address: string | string[];
  typecode: string | string[];
  city: string | string[];
}
export interface AMapInputTips {
  tips: AMapInputTip[];
  status: string | number;
  info: string;
  infocode: string | number;
  count: string | number;
}
export interface AMapInputTipItem {
  id: string;
  name: string;
  district?: string;
  adcode?: string;
  location?: [number, number];
  address?: string;
  typecode?: string;
  city?: string;
}

/** 高德行政区划查询（REST /v3/config/district）返回的单条区划 */
export interface AMapDistrict {
  citycode: string;
  adcode: string;
  name: string;
  center: string | string[];
  level: string;
  districts: AMapDistrict[];
}
export interface AMapDistricts {
  status: string | number;
  info: string;
  infocode: string | number;
  count: string | number;
  districts: AMapDistrict[];
}
