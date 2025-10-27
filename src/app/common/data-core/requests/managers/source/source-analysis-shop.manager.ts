import { PromiseValue } from '../../../../view-models/value.promise';
import { EnumNameValue } from '../../../models/capabilities/enum-name-value.model';
import { CapabilityManager } from '../capability.manager';

export class SourceAnalysisShopManager {
  ShopTypes = new PromiseValue<EnumNameValue<number>[]>();
  SignTypes = new PromiseValue<EnumNameValue<number>[]>();
  ResultLabelTypes = new PromiseValue<EnumNameValue<number>[]>();
  BusinessScopes = new PromiseValue<EnumNameValue[]>();
  Industries = new PromiseValue<EnumNameValue[]>();
  ShopObjectStates = new PromiseValue<EnumNameValue<number>[]>();
  CameraNos = new PromiseValue<EnumNameValue[]>();
  UnitTypes = new PromiseValue<EnumNameValue[]>();
  ShopSides = new PromiseValue<EnumNameValue<number>[]>();
  CameraSides = new PromiseValue<EnumNameValue<number>[]>();
  BusinessStates = new PromiseValue<EnumNameValue<number>[]>();
  constructor(private capability: CapabilityManager) {
    this.init();
  }

  private init() {
    this.capability.analysis.shop.get().then((x) => {
      if (x.ShopTypes) {
        this.ShopTypes.set(x.ShopTypes);
      }
      if (x.SignTypes) {
        this.SignTypes.set(x.SignTypes);
      }
      if (x.ResultLabelTypes) {
        this.ResultLabelTypes.set(x.ResultLabelTypes);
      }
      if (x.BusinessScopes) {
        this.BusinessScopes.set(x.BusinessScopes);
      }
      if (x.Industries) {
        this.Industries.set(x.Industries);
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
      if (x.ShopSides) {
        this.ShopSides.set(x.ShopSides);
      }
      if (x.CameraSides) {
        this.CameraSides.set(x.CameraSides);
      }
      if (x.BusinessStates) {
        this.BusinessStates.set(x.BusinessStates);
      }
    });
  }
}
