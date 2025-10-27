import { AbstractUrl } from '../../../abstract.url';

export class AnalysisLLMGpsTaskSampleUrl extends AbstractUrl {
  constructor(base: string) {
    super(`${base}/Samples`);
  }

  comfirmed(id: string) {
    return `${this.item(id)}/Confirmed`;
  }
}
