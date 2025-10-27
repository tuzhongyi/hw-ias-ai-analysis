import { Injectable } from '@angular/core';
import { ShopObjectState } from '../../../../../../common/data-core/enums/analysis/shop-object-state.enum.js';
import { EnumNameValue } from '../../../../../../common/data-core/models/capabilities/enum-name-value.model.js';
import { SourceManager } from '../../../../../../common/data-core/requests/managers/source/source.manager.js';

@Injectable()
export class SystemMapFilterSourceController {
  constructor(source: SourceManager) {
    this.types = source.analysis.shop.ShopTypes.get();
    this.states = source.analysis.shop.ShopObjectStates.get();
    this.cameras = source.analysis.shop.CameraNos.get();
    this.labels = source.analysis.shop.ResultLabelTypes.get();
  }

  types: Promise<EnumNameValue<number>[]>;
  states: Promise<EnumNameValue<ShopObjectState>[]>;
  cameras: Promise<EnumNameValue[]>;
  labels: Promise<EnumNameValue<number>[]>;
}
