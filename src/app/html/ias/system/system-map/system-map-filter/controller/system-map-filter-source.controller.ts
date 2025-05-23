import { Injectable } from '@angular/core';
import { ShopObjectState } from '../../../../../../common/data-core/enums/analysis/shop-object-state.enum.js';
import { EnumNameValue } from '../../../../../../common/data-core/models/capabilities/enum-name-value.model.js';
import { SourceManager } from '../../../../../../common/data-core/requests/managers/source/source.manager.js';

@Injectable()
export class SystemMapFilterSourceController {
  constructor(source: SourceManager) {
    this.types = source.shop.ShopTypes.get();
    this.states = source.shop.ShopObjectStates.get();
    this.cameras = source.shop.CameraNos.get();
    this.labels = source.shop.ResultLabelTypes.get();
  }

  types: Promise<EnumNameValue<number>[]>;
  states: Promise<EnumNameValue<ShopObjectState>[]>;
  cameras: Promise<EnumNameValue[]>;
  labels: Promise<EnumNameValue<number>[]>;
}
