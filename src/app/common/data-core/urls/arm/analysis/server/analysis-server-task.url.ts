import { AbstractUrl } from '../../../abstract.url';
import { AnalysisServerRecordFileShopUrl } from './analysis-server-task-record-file.url';
import { AnalysisServerTaskResultUrl } from './analysis-server-task-result.url';
import { AnalysisServerTaskShopUrl } from './analysis-server-task-shop.url';

export class AnalysisServerTaskUrl extends AbstractUrl {
  constructor(base: string) {
    super(`${base}/Tasks`);
  }

  get result() {
    return new AnalysisServerTaskResultUrl(this.basic());
  }
  get shop() {
    return new AnalysisServerTaskShopUrl(this.basic());
  }

  source(id: string) {
    return `${this.item(id)}/Sources`;
  }

  road = {
    route: (id: string) => {
      return `${this.item(id)}/RoadRoutes`;
    },
  };
  gps = {
    items: (id: string, rectified?: boolean) => {
      let querys = [];
      if (rectified) {
        querys.push(`Rectified=${rectified}`);
      }
      return `${this.item(id)}/GpsItems${
        querys.length > 0 ? '?' : ''
      }${querys.join('&')}`;
    },
  };
  record = {
    file: (id: string) => {
      return new AnalysisServerRecordFileShopUrl(this.item(id));
    },
  };
}
