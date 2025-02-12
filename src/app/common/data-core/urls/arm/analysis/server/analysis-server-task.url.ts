import { AbstractUrl } from '../../../abstract.url';
import { AnalysisServerTaskResultUrl } from './analysis-server-task-result.url';

export class AnalysisServerTaskUrl extends AbstractUrl {
  constructor(base: string) {
    super(`${base}/Tasks`);
  }

  get result() {
    return new AnalysisServerTaskResultUrl(this.basic());
  }

  source(id: string) {
    return `${this.item(id)}/Sources`;
  }
}
