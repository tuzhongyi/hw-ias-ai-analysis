import { Injectable } from '@angular/core';
import { EnumNameValue } from '../../../../../common/data-core/models/capabilities/enum-name-value.model';
import { Manager } from '../../../../../common/data-core/requests/managers/manager';

@Injectable()
export class SystemTaskCreationSourceController {
  constructor(private manager: Manager) {
    this.types = this.inittypes();
  }

  types: Promise<EnumNameValue<number>[]>;

  private async inittypes() {
    return (await this.manager.capability.analysis).TaskTypes ?? [];
  }
}
