import { Injectable } from '@angular/core';
import { SignType } from '../../../../../common/data-core/enums/analysis/sign-type.enum.js';
import { EnumNameValue } from '../../../../../common/data-core/models/capabilities/enum-name-value.model.js';
import { Manager } from '../../../../../common/data-core/requests/managers/manager.js';
import { SystemMapFilterSourceStateController } from './system-map-filter-source-state.controller.ts';

@Injectable()
export class SystemMapFilterSourceController {
  constructor(
    public state: SystemMapFilterSourceStateController,
    private manager: Manager
  ) {
    this.types = new Promise<EnumNameValue<SignType>[]>((resolve) => {
      this.manager.capability.analysis.shop.then((x) => {
        if (x.SignTypes) {
          resolve(x.SignTypes);
        }
      });
    });
  }

  types: Promise<EnumNameValue<SignType>[]>;
}
