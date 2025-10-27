import { AbstractUrl } from '../../../abstract.url';
import { AnalysisLLMGpsTaskSampleUrl } from './analysis-llm-gps-task-sample.url';

export class AnalysisLLMGpsTaskUrl extends AbstractUrl {
  constructor(base: string) {
    super(`${base}/Tasks`);
  }

  sample() {
    return new AnalysisLLMGpsTaskSampleUrl(this.basic());
  }
}
