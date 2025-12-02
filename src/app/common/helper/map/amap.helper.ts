import AMapLoader from '@amap/amap-jsapi-loader';
import '@amap/amap-jsapi-types';
import '@amap/amap-loca-types';
import { wait } from '../../tools/wait';
import { AMapInputTip, AMapInputTipItem, AMapInputTips } from './amap.model';

export class AMapHelper {
  styleid = 'e8fb567a2f05a53b39e088f6fe186991';
  style = `amap://styles/${this.styleid}`;
  code = 'e1f1eeaee1b77531fa46d5230e2dfe20';
  key = {
    web: '6c2282c244333c7994d8465fd251ab63',
    js: '12be1c6c0ea1645659e2b7dcb2e263c5',
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

  async init(plugins = this.plugins, loca = false) {
    (window as any)._AMapSecurityConfig = {
      securityJsCode: this.code,
    };
    return this.load(plugins, loca);
  }

  async get(
    id: string,
    plugins: string[] = [],
    loca = false,
    opts: any = {}
  ): Promise<AMap.Map> {
    let plugs = [...this.plugins, ...plugins];
    return new Promise<AMap.Map>((resolve) => {
      wait(() => {
        return !!document.getElementById(id);
      }).then(() => {
        this.init(plugs, loca).then((AMap) => {
          let map = new AMap.Map(id, {
            mapStyle: this.style,
            resizeEnable: true,
            showIndoorMap: false,
            zooms: [3, 26],
            zoom: 17,
            ...opts,
          });
          resolve(map);
        });
      });
    });
  }

  private convert = {
    content: (content: string | string[]) => {
      if (content instanceof Array) {
        if (content.length == 0) {
          return undefined;
        }
        return content.join(',');
      }
      return content;
    },
    location: (value?: string) => {
      if (value) {
        return value.split(',').map((x) => parseFloat(x)) as [number, number];
      }
      return undefined;
    },
    data: (data: AMapInputTip): AMapInputTipItem => {
      return {
        id: this.convert.content(data.id) || '',
        name: data.name,
        district: this.convert.content(data.district),
        adcode: this.convert.content(data.adcode),
        location: this.convert.location(this.convert.content(data.location)),
        address: this.convert.content(data.address),
        typecode: this.convert.content(data.typecode),
        city: this.convert.content(data.city),
      };
    },
  };

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
    position: [number, number]
  ): Promise<AMapInputTipItem[]> {
    // return this.test();
    return new Promise<AMapInputTipItem[]>((resolve, reject) => {
      fetch(
        `https://restapi.amap.com/v3/assistant/inputtips?key=${this.key.web}&location=${position[0]},${position[1]}&keywords=${name}`
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
}
