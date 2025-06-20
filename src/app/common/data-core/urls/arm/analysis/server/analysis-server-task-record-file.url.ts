import { AbstractUrl } from '../../../abstract.url';

export class AnalysisServerRecordFileShopUrl extends AbstractUrl {
  constructor(base: string) {
    super(`${base}/RecordFile`);
  }

  mkv(
    longitude: number,
    latitude: number,
    channel?: number,
    duration?: number
  ) {
    let querys = [`Longitude=${longitude}`, `Latitude=${latitude}`];
    if (channel) {
      querys.push(`Channel=${channel}`);
    }
    if (duration) {
      querys.push(`Duration=${duration}`);
    }
    return `${this.basic()}.mkv?${querys.join('&')}`;
  }
  gps = {
    items: (
      longitude: number,
      latitude: number,
      channel?: number,
      duration?: number,
      rectified?: boolean
    ) => {
      let querys = [`Longitude=${longitude}`, `Latitude=${latitude}`];
      if (channel) {
        querys.push(`Channel=${channel}`);
      }
      if (duration) {
        querys.push(`Duration=${duration}`);
      }
      if (rectified) {
        querys.push(`Rectified=${rectified}`);
      }
      return `${this.basic()}/GpsItems?${querys.join('&')}`;
    },
  };
}
