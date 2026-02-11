import { AMapInputTip, AMapInputTipItem } from './amap.model';

export class AMapConverter {
  content(content: string | string[]) {
    if (content instanceof Array) {
      if (content.length == 0) {
        return undefined;
      }
      return content.join(',');
    }
    return content;
  }
  location(value?: string) {
    if (value) {
      return value.split(',').map((x) => parseFloat(x)) as [number, number];
    }
    return undefined;
  }
  data(data: AMapInputTip): AMapInputTipItem {
    return {
      id: this.content(data.id) || '',
      name: data.name,
      district: this.content(data.district),
      adcode: this.content(data.adcode),
      location: this.location(this.content(data.location)),
      address: this.content(data.address),
      typecode: this.content(data.typecode),
      city: this.content(data.city),
    };
  }
}
