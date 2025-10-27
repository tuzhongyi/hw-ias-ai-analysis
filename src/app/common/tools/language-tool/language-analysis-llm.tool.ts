import { SourceAnalysisLLMManager } from '../../data-core/requests/managers/source/source-analysis-llm.manager';
import { LanguageAbstract } from './language.abstract';

export class LanguageAnalysisLLMTool extends LanguageAbstract {
  constructor(private manager: SourceAnalysisLLMManager) {
    super();
  }

  async CameraSides(value?: string, def = ''): Promise<string> {
    let values = await this.manager.CameraSides.get();
    return this.get(values, value, def);
  }
  async SceneLabelTypes(value?: string, def: string = ''): Promise<string> {
    let values = await this.manager.SceneLabelTypes.get();
    return this.get(values, value, def);
  }
  async SceneTypes(value?: string, def: string = ''): Promise<string> {
    let values = await this.manager.SceneTypes.get();
    return this.get(values, value, def);
  }
}
