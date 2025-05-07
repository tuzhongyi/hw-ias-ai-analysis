import { SourceShopManager } from '../../data-core/requests/managers/source/source-shop.manager';
import { LanguageAbstract } from './language.abstract';

export class LanguageAnalysisShopTool extends LanguageAbstract {
  constructor(private manager: SourceShopManager) {
    super();
  }

  async ShopObjectState(value?: number, def: string = ''): Promise<string> {
    let values = await this.manager.ShopObjectStates.get();
    return this.get(values, value, def);
  }

  async ShopType(value?: number, def: string = ''): Promise<string> {
    if (value && isFinite(value)) {
      let values = await this.manager.ShopTypes.get();
      return this.get(values, value, def);
    }
    return def;
  }

  async ResultLabelType(value?: number, def: string = ''): Promise<string> {
    let values = await this.manager.ResultLabelTypes.get();
    return this.get(values, value, def);
  }
}
