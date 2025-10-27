import { AbstractUrl } from '../../../abstract.url';
import { AnalysisLLMGpsUrl } from './analysis-llm-gps.url';

export class AnalysisLLMUrl extends AbstractUrl {
  constructor(base: string) {
    super(`${base}/LLMs`);
  }

  capability() {
    return `${this.basic()}/Capability`;
  }

  gps() {
    return new AnalysisLLMGpsUrl(this.basic());
  }
}
