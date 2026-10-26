import AMapLoader from '@amap/amap-jsapi-loader';
import '@amap/amap-jsapi-types';
import '@amap/amap-loca-types';
import { ArmDivisionType } from '../../data-core/enums/division/divison-type.enum';
import { GisType } from '../../data-core/enums/gis-type.enum';
import { Division } from '../../data-core/models/arm/division/division.model';
import { GeoTool } from '../../tools/geo-tool/geo.tool';
import { wait } from '../../tools/wait';
import { AMapConverter } from './amap.converter';
import {
  AMapDistrict,
  AMapDistricts,
  AMapInputTip,
  AMapInputTipItem,
  AMapInputTips,
} from './amap.model';

/**
 * 上海市外包框（上海市政府 / 维基百科口径）：
 * 东经 120°51′～122°12′，北纬 30°40′～31°53′。
 * 只是外接矩形，边界附近包含少量江苏、浙江的地块，作为「大概在不在上海」够用
 */
const SHANGHAI_BOUNDS = {
  longitude: [120 + 51 / 60, 122 + 12 / 60],
  latitude: [30 + 40 / 60, 31 + 53 / 60],
};

/** 地图兜底时按需取的定位依据：都是惰性函数，真要用到才发请求 */
export interface AMapCityLocator {
  /** 取设备位置（GCJ02）：县对不上、网格也没法按上一级定位时的兜底 */
  position?: () => Promise<[number, number] | undefined>;
  /** 网格：上一级区划（县 / 街道），网格按它的名称和 Id 走县那套定位 */
  parent?: () => Promise<Division | undefined>;
}

export class AMapHelper {
  style = {
    url: (key: string) => {
      return `amap://styles/${key}`;
    },
    key: {
      normal: '5438026e1706c96ab7df330747314e6a', //'e8fb567a2f05a53b39e088f6fe186991',
      road: 'be4678d793744ca76bf7c5b90049fee3',
    },
  };

  code = '467bb37338ea74fe4ccee5c222c382d4';
  key = {
    web: '934aadcc25bdb5e08929e5087a020448',
    js: '46ff88097795e101c9a4df1ecdad2cee',
  };
  plugins = ['AMap.GeoLocation', 'AMap.GeometryUtil'];

  async load(plugins = this.plugins, loca = false) {
    return AMapLoader.load({
      key: this.key.js, //申请好的 Web 端开发者 Key，首次调用 load 时必填
      version: '2.0', //指定要加载的 JS API 的版本，缺省时默认为 1.4.15
      plugins: plugins, //需要使用的的插件列表，如比例尺'AMap.Scale'，支持添加多个如：['AMap.Scale','...','...']
      Loca: loca ? { version: '2.0' } : undefined,
    });
  }

  async init(plugins: string[] = [], loca = false) {
    let plugs = [...this.plugins, ...plugins];
    (window as any)._AMapSecurityConfig = {
      securityJsCode: this.code,
    };
    return this.load(plugs, loca);
  }

  async get(
    container: string | HTMLElement,
    plugins: string[] = [],
    loca = false,
    opts: any = {},
    road = true,
  ): Promise<AMap.Map> {
    return new Promise<AMap.Map>((resolve, reject) => {
      wait(() => {
        if (typeof container == 'string') {
          return !!document.getElementById(container);
        }
        return !!container;
      })
        .then(() => {
          // 这一层的失误原来是无声的：AMapLoader 一旦 reject，外层 promise
          // 既不 resolve 也不 reject，就这么一直挂着，而调用方都没有接 catch ——
          // 页面上只剩一块空容器，控制台一个字都没有，分不清是「地图加载失败」
          // 还是「本来就没有数据」。这里补上日志，并且让它真的 reject 出去
          return this.init(plugins, loca).catch((e) => {
            console.error('[map] AMap 加载失败', container, e);
            throw e;
          });
        })
        .then((AMap) => {
          let map = new AMap.Map(container, {
            mapStyle: this.style.url(this.style.key.normal),
            resizeEnable: true,
            showIndoorMap: false,
            zooms: [3, 26],
            zoom: 17,
            ...opts,
          });
          if (road) {
            map.setFeatures([
              'bg',
              'road',
              'building',
              'point:none',
              'text:none',
            ]);
          } else {
            map.setFeatures(['bg', 'road', 'building']);
          }

          resolve(map);
        })
        .catch((e) => {
          reject(e);
        });
    });
  }

  private convert = new AMapConverter();

  private test() {
    let datas = [
      {
        id: [],
        name: '工商银行',
        district: [],
        adcode: [],
        location: [],
        address: [],
        typecode: [],
        city: [],
      },
      {
        id: 'B00154AC41',
        name: '中国工商银行(花木支行)',
        district: '上海市浦东新区',
        adcode: '310115',
        location: '121.546780,31.206699',
        address: '玉兰路259号',
        typecode: '160105',
        city: [],
      },
      {
        id: 'B00155IF50',
        name: '中国工商银行24小时自助银行(花木支行)',
        district: '上海市浦东新区',
        adcode: '310115',
        location: '121.546783,31.206799',
        address: '玉兰路259号',
        typecode: '160302',
        city: [],
      },
      {
        id: 'B0FFL0Q5I8',
        name: '中国工商银行(上海市东绣路支行)',
        district: '上海市浦东新区',
        adcode: '310115',
        location: '121.536736,31.206673',
        address: '东绣路555号',
        typecode: '160105',
        city: [],
      },
      {
        id: 'B00155GRL6',
        name: '中国工商银行(白杨路支行)',
        district: '上海市浦东新区',
        adcode: '310115',
        location: '121.555270,31.209694',
        address: '梅花路811-815号(世纪公园地铁站2号口步行400米)',
        typecode: '160105',
        city: [],
      },
      {
        id: 'B00155IF4T',
        name: '中国工商银行24小时自助银行(白杨路支行)',
        district: '上海市浦东新区',
        adcode: '310115',
        location: '121.555319,31.209684',
        address: '梅花路811-815附近',
        typecode: '160302',
        city: [],
      },
      {
        id: 'B00155QIO0',
        name: '中国工商银行(陆家嘴软件园支行)',
        district: '上海市浦东新区',
        adcode: '310115',
        location: '121.531675,31.214692',
        address: '峨山路91弄98号近东方路',
        typecode: '160105',
        city: [],
      },
      {
        id: 'B00155QINZ',
        name: '中国工商银行24小时自助银行(陆家嘴软件园支行)',
        district: '上海市浦东新区',
        adcode: '310115',
        location: '121.531349,31.214674',
        address: '峨山路101号',
        typecode: '160302',
        city: [],
      },
      {
        id: 'B00155CBZJ',
        name: '中国工商银行(南泉路支行)',
        district: '上海市浦东新区',
        adcode: '310115',
        location: '121.522691,31.212871',
        address: '南泉路1230号近兰村路(蓝村路南泉路)',
        typecode: '160105',
        city: [],
      },
      {
        id: 'B00155FZBR',
        name: '中国工商银行24小时自助银行(南泉路支行)',
        district: '上海市浦东新区',
        adcode: '310115',
        location: '121.522693,31.213002',
        address: '南泉路1230号',
        typecode: '160302',
        city: [],
      },
    ] as AMapInputTip[];
    return datas.map((x) => this.convert.data(x));
  }

  async search(
    name: string,
    position: [number, number],
  ): Promise<AMapInputTipItem[]> {
    // return this.test();
    return new Promise<AMapInputTipItem[]>((resolve, reject) => {
      fetch(
        `https://restapi.amap.com/v3/assistant/inputtips?key=${this.key.web}&location=${position[0]},${position[1]}&keywords=${name}`,
      ).then((response) => {
        response
          .json()
          .then((x: AMapInputTips) => {
            if (x.status == 1) {
              let datas = x.tips.map((x) => this.convert.data(x));
              resolve(datas);
            } else {
              reject(new Error(x.info));
            }
          })
          .catch((e) => {
            reject(e);
          });
      });
    });
  }

  /**
   * 高德行政区划查询（REST /v3/config/district），返回所有同名区划。
   * 不传 subdistrict，只要名字命中的那一级
   */
  async district(name: string): Promise<AMapDistrict[]> {
    let url =
      `https://restapi.amap.com/v3/config/district?key=${this.key.web}` +
      `&keywords=${encodeURIComponent(name)}&subdistrict=0&extensions=base`;
    return fetch(url)
      .then((response) => response.json())
      .then((x: AMapDistricts) => {
        if (x.status == '1' || x.status == 1) {
          return x.districts ?? [];
        }
        throw new Error(x.info);
      });
  }

  /**
   * 按区划摆地图视野（替代直接调 map.setCity）。
   *
   * AMap 的 setCity 只认名称，而全国同名区划很多（好几个城市都有「城关区」，
   * 街道重名更是常态），直接拿名称定位会跑到别的城市去。按区划类型分开处理：
   * - 省 / 市：名称足够唯一，直接 setCity
   * - 县 / 街道：按名称查行政区划，再用区划 Id 认领（见 county）
   * - 网格：AMap 里没有这一级，借上一级区划走县那套定位（见 gridcell）
   * @param locator 按需取的兜底依据（设备位置 / 上一级区划），惰性函数
   * @param complete 视野落地后的回调，语义与 setCity 的第二个参数一致
   */
  city(
    map: AMap.Map,
    division: Division,
    locator?: AMapCityLocator,
    complete?: () => void,
  ) {
    switch (division.DivisionType) {
      case ArmDivisionType.County:
        return this.county(map, division, locator, complete);
      case ArmDivisionType.GridCell:
        return this.gridcell(map, locator, complete);
      case ArmDivisionType.Province:
      case ArmDivisionType.City:
      default:
        map.setCity(division.Name, () => complete?.());
        return;
    }
  }

  /**
   * 县 / 街道：按名称查高德行政区划，再用本系统区划 Id 认领。
   *
   * 「友谊路街道」全国有 4 个（天津 / 河北 / 上海 / 乌鲁木齐），光有名称
   * 定位不了。高德返回的 adcode 和本系统区划 Id 是同一套编码 —— 本系统的
   * Id 以 adcode 开头（友谊路街道 310113003000 ↔ adcode 310113），按前缀
   * 对上哪个就用哪个的 center 定位。一个都对不上才退回设备位置
   */
  private async county(
    map: AMap.Map,
    division: Division,
    locator?: AMapCityLocator,
    complete?: () => void,
  ) {
    let center = await this.locate(division);
    if (center) {
      map.setCenter(center);
      complete?.();
      return;
    }
    this.device(map, locator, complete);
  }

  /**
   * 网格：AMap 里没有网格这一级，名称也查不到，借上一级区划（县 / 街道）
   * 走 county 那套「名称搜索 + Id 前缀认领」。上一级取不到或对不上时，
   * 再退回设备位置
   */
  private async gridcell(
    map: AMap.Map,
    locator?: AMapCityLocator,
    complete?: () => void,
  ) {
    let parent = await locator?.parent?.();
    if (parent) {
      return this.county(map, parent, locator, complete);
    }
    this.device(map, locator, complete);
  }

  /**
   * 名称搜索 + Id 前缀认领，返回命中的坐标（GCJ02）。
   * 查不到、对不上、坐标不合法都返回 undefined
   */
  private async locate(division: Division): Promise<[number, number] | undefined> {
    let districts = await this.district(division.Name).catch((e) => {
      console.warn('[map] 区划名称查询失败', division.Name, e);
      return [];
    });
    let district = districts.find((x) => {
      return !!x.adcode && division.Id.startsWith(x.adcode);
    });
    if (!district || typeof district.center != 'string') return undefined;
    let [longitude, latitude] = district.center.split(',').map(Number);
    if (!isFinite(longitude) || !isFinite(latitude)) return undefined;
    return [longitude, latitude];
  }

  /**
   * 最后的兜底：用账号下设备的位置。
   * 没有设备或设备没定位就保持原视野，不会把地图缩到一个错的地方
   */
  private async device(
    map: AMap.Map,
    locator?: AMapCityLocator,
    complete?: () => void,
  ) {
    let value = await locator?.position?.();
    if (!value || !isFinite(value[0]) || !isFinite(value[1])) {
      console.warn('[map] 区划定位失败：账号下没有带定位的设备');
      return;
    }
    map.setCenter(value);
    complete?.();
  }


  is = {
    in: {
      /**
       * 传入坐标是否在上海市境内（外包框，落在边界上算在内）
       * @param value [经度, 纬度]
       * @param type 传入坐标的坐标系，先换算到 WGS84 再比对
       */
      shanghai: (value: [number, number], type: GisType): boolean => {
        if (!value) return false;
        let [longitude, latitude] = this.to.wgs84(value, type);
        if (!isFinite(longitude) || !isFinite(latitude)) return false;
        return (
          longitude >= SHANGHAI_BOUNDS.longitude[0] &&
          longitude <= SHANGHAI_BOUNDS.longitude[1] &&
          latitude >= SHANGHAI_BOUNDS.latitude[0] &&
          latitude <= SHANGHAI_BOUNDS.latitude[1]
        );
      },
    },
  };

  /**
   * 外包框是按 WGS84 经纬度给的，GCJ02 / BD09 有几百米偏移，
   * 边界附近不换算就会误判
   */
  private to = {
    wgs84(value: [number, number], type: GisType): [number, number] {
      let [longitude, latitude] = value;
      switch (type) {
        case GisType.GCJ02:
          return GeoTool.point.convert.gcj02.to.wgs84(longitude, latitude);
        case GisType.BD09:
          return GeoTool.point.convert.bd09.to.wgs84(longitude, latitude);
        // CGCS2000 与 WGS84 差异在厘米级；XA80 / BJ54 仓库里没有可靠的转换
        // 关系（还要分带和七参数），只能按原值比较
        default:
          return [longitude, latitude];
      }
    },
  };
}
