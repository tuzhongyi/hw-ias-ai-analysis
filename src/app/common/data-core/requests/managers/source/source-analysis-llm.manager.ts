import { PromiseValue } from '../../../../view-models/value.promise';
import { EnumNameValue } from '../../../models/capabilities/enum-name-value.model';
import { CapabilityManager } from '../capability.manager';

export class SourceAnalysisLLMManager {
  CameraSides = new PromiseValue<EnumNameValue[]>();
  SceneLabelTypes = new PromiseValue<EnumNameValue[]>();
  SceneTypes = new PromiseValue<EnumNameValue<number>[]>();

  constructor(private capability: CapabilityManager) {
    this.init();
  }

  private init() {
    this.capability.analysis.llm.get().then((x) => {
      if (x.CameraSides) {
        this.CameraSides.set(x.CameraSides);
      }
      if (x.SceneLabelTypes) {
        this.SceneLabelTypes.set(x.SceneLabelTypes);
      }
      if (x.SceneTypes) {
        this.SceneTypes.set(x.SceneTypes);
      }
    });
  }
}
