import { PromiseValue } from '../../../../view-models/value.promise';
import { EnumNameValue } from '../../../models/capabilities/enum-name-value.model';
import { CapabilityManager } from '../capability.manager';

export class SourceShopManager {
  ShopTypes = new PromiseValue<EnumNameValue<number>[]>();
  SignTypes = new PromiseValue<EnumNameValue<number>[]>();
  ResultLabelTypes = new PromiseValue<EnumNameValue<number>[]>();
  BusinessScopes = new PromiseValue<EnumNameValue[]>();
  Industries = new PromiseValue<EnumNameValue[]>();
  ShopObjectStates = new PromiseValue<EnumNameValue<number>[]>();
  CameraNos = new PromiseValue<EnumNameValue[]>();
  UnitTypes = new PromiseValue<EnumNameValue[]>();
  constructor(private capability: CapabilityManager) {
    this.init();
  }

  private init() {
    this.capability.analysis.shop.get().then((x) => {
      if (x.SignTypes) {
        this.SignTypes.set(x.SignTypes);
      }
      if (x.ResultLabelTypes) {
        this.ResultLabelTypes.set(x.ResultLabelTypes);
      }
      if (x.ShopObjectStates) {
        this.ShopObjectStates.set(x.ShopObjectStates);
      }
      if (x.CameraNos) {
        this.CameraNos.set(x.CameraNos);
      }
      if (x.UnitTypes) {
        this.UnitTypes.set(x.UnitTypes);
      }
    });
  }
}
