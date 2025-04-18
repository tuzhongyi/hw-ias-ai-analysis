import AMapLoader from '@amap/amap-jsapi-loader';
import '@amap/amap-jsapi-types';
import '@amap/amap-loca-types';

export class AMapHelper {
  style = 'amap://styles/e8fb567a2f05a53b39e088f6fe186991';
  code = 'e1f1eeaee1b77531fa46d5230e2dfe20';
  key = '12be1c6c0ea1645659e2b7dcb2e263c5';
  plugins = ['AMap.GeoLocation', 'AMap.GeometryUtil'];

  async load(plugins = this.plugins, loca = false) {
    return AMapLoader.load({
      key: this.key, //申请好的 Web 端开发者 Key，首次调用 load 时必填
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
    plugins = this.plugins,
    loca = false
  ): Promise<AMap.Map> {
    return this.init(plugins, loca).then((AMap) => {
      return new AMap.Map(id, {
        mapStyle: this.style,
        resizeEnable: true,
        showIndoorMap: false,
        zooms: [3, 26],
        zoom: 17,
      });
    });
  }
}
