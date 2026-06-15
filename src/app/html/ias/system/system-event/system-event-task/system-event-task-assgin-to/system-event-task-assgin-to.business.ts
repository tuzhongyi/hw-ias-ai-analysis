import { Injectable } from '@angular/core';
import { DepartmentMember } from '../../../../../../common/data-core/models/arm/security/department-member.model';
import { EventAssginParams } from '../../../../../../common/data-core/requests/services/system/event/system-event.params';
import { ArmSystemRequestService } from '../../../../../../common/data-core/requests/services/system/system.service';

@Injectable()
export class SystemEventTaskAssginToBusiness {
  constructor(private service: ArmSystemRequestService) {}

  department() {
    return this.service.security.department.cache.all();
  }

  assgin(eventId: string, data: DepartmentMember) {
    let params = new EventAssginParams();
    params.MemberIds = [data.Id];
    return this.service.event.assgin(eventId, params);
  }
}
