import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ArmAnalysisRequestService } from '../../../../common/data-core/requests/services/analysis/analysis.service';
import { LocalStorage } from '../../../../common/storage/local.storage';
import { SystemPath } from '../system.model';

@Injectable()
export class SystemTaskFileManagerBusiness {
  constructor(
    private service: ArmAnalysisRequestService,
    private local: LocalStorage,
    private router: Router
  ) {}

  get() {
    let id = this.local.system.task.id.get();
    if (!id) {
      this.router.navigateByUrl(SystemPath.task);
    }
    return this.service.server.task.get(id);
  }
}
