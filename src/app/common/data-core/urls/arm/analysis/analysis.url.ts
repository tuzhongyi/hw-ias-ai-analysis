import { BaseUrl } from '../../base.url';
import { AnalysisLLMUrl } from './llm/analysis-llm.url';
import { AnalysisServerUrl } from './server/analysis-server.url';
import { AnalysisShopUrl } from './shop/analysis-shop.url';

export class ArmAnalysisUrl {
  private static get basic() {
    return `${BaseUrl.arm}/Analysis`;
  }

  static get server() {
    return new AnalysisServerUrl(this.basic);
  }
  static get shop() {
    return new AnalysisShopUrl(this.basic);
  }
  static get llm() {
    return new AnalysisLLMUrl(this.basic);
  }
}
