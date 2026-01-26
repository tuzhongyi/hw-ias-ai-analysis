import { SourceRoadObjectManager } from '../../data-core/requests/managers/source/source-road-object.manager';
import { SourceRoadSectionManager } from '../../data-core/requests/managers/source/source-road-section.manager';
import { LanguageAbstract } from './language.abstract';

export class LanguageRoadTool extends LanguageAbstract {
  constructor(
    section: SourceRoadSectionManager,
    object: SourceRoadObjectManager
  ) {
    super();
    this.manager = { section, object };
  }

  private manager: {
    section: SourceRoadSectionManager;
    object: SourceRoadObjectManager;
  };

  object = {
    ObjectTypes: async (value?: number, def = '') => {
      let values = await this.manager.object.ObjectTypes.get();
      return this.get(values, value, def);
    },
    ObjectStates: async (value?: number, def = '') => {
      let values = await this.manager.object.ObjectStates.get();
      return this.get(values, value, def);
    },
    EventTypes: async (value?: number, def = '') => {
      let values = await this.manager.object.EventTypes.get();
      return this.get(values, value, def);
    },
  };
  section = {
    RoadSectionTypes: async (value?: number, def = '') => {
      let values = await this.manager.section.RoadSectionTypes.get();
      return this.get(values, value, def);
    },
  };
}
