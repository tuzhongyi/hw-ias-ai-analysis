import { PromiseValue } from '../../../../../../../common/view-models/value.promise';

export class IASMapAMapGeocoderController {
  constructor() {
    this.init();
  }
  private coder = new PromiseValue<AMap.Geocoder>();

  private init() {
    AMap.plugin('AMap.Geocoder', () => {
      let geocoder = new AMap.Geocoder({
        city: '全国',
        extensions: 'all',
      });
      this.coder.set(geocoder);
    });
  }

  get(position: [number, number]) {
    return new Promise<string>((resolve, reject) => {
      this.coder.get().then((x) => {
        x.getAddress(position, (status, result) => {
          console.log(`坐标地址转换：`, result);
          if (status === 'complete' && result.regeocode?.formattedAddress) {
            resolve(result.regeocode.formattedAddress);
          } else {
            reject(result?.info || '坐标转地址失败');
          }
        });
      });
    });
  }
}
