import { Injectable } from '@angular/core';
import { BusinessState } from '../../../../../../../common/data-core/enums/event/arm-business-state.enum';
import {
  ChangeBusinessStateParams,
  CreateShopRegistrationParams,
  MarkingShopParams,
  MergeShopParams,
} from '../../../../../../../common/data-core/requests/services/system/event/handle/system-event-handle.params';
import { ArmSystemRequestService } from '../../../../../../../common/data-core/requests/services/system/system.service';

@Injectable()
export class SystemEventManagerRealtimeHandleBusiness {
  constructor(private service: ArmSystemRequestService) {}

  misinform(id: string) {
    return this.service.event.misinfo(id);
  }

  shop = {
    marking: (id: string) => {
      let params = new MarkingShopParams();
      params.Marking = true;
      return this.service.event.handle.shop.marking(id, params);
    },
    delete: (id: string) => {
      return this.service.event.handle.shop.delete(id);
    },
    create: (eventId: string, registrationId: string, sub: boolean) => {
      let params = new CreateShopRegistrationParams();
      params.IsSubSignboard = sub;
      params.RegistrationId = registrationId;
      return this.service.event.handle.shop.create(eventId, params);
    },
    merge: (
      id: string,
      registrationId: string,
      subname: boolean,
      name?: string
    ) => {
      let params = new MergeShopParams();
      params.IsSubSignboard = subname ? true : undefined;
      params.RegistrationId = registrationId;
      params.Name = name ? name : undefined;
      return this.service.event.handle.shop.merge(id, params);
    },
  };

  state = {
    change: (id: string, state: BusinessState) => {
      let params = new ChangeBusinessStateParams();
      params.BusinessState = state;
      return this.service.event.handle.business.state.change(id, params);
    },
  };
}
