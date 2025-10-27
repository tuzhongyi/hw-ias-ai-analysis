import { AbstractUrl } from '../../../abstract.url';
import { AnalysisLLMGpsTaskUrl } from './analysis-llm-gps-task.url';

export class AnalysisLLMGpsUrl extends AbstractUrl {
  constructor(base: string) {
    super(`${base}/Gps`);
  }

  task() {
    return new AnalysisLLMGpsTaskUrl(this.basic());
  }
}
