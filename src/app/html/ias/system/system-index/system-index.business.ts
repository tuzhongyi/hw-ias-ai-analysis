import { Injectable } from '@angular/core';
import { ArmSystemRequestService } from '../../../../common/data-core/requests/services/system/system.service';
import { LocalStorage } from '../../../../common/storage/local.storage';

@Injectable()
export class SystemIndexBusiness {
  constructor(
    private local: LocalStorage,
    private service: ArmSystemRequestService
  ) {}

  async get() {
    let account = this.local.auth.get();
    if (account) {
      return this.service.security.user.get(account.username);
    }
    return undefined;
  }
}
