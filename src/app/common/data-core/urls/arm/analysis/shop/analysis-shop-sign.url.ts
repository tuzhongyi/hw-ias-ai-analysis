import { AbstractUrl } from '../../../abstract.url';

export class AnalysisShopSignUrl extends AbstractUrl {
  constructor(base: string) {
    super(`${base}/Signs`);
  }

  result = {
    labeling: (id: string) => {
      return `${this.item(id)}/ResultLabeling`;
    },
    labels: () => {
      return `${this.basic()}/Statistics/ResultLabels`;
    },
  };
}
