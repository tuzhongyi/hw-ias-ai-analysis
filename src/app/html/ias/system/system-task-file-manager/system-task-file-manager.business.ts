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

  async get() {
    let task = this.local.system.task.info.get();
    if (!task) {
      this.router.navigateByUrl(SystemPath.task);
      return;
    }
    return this.service.server.task.get(task.Id);
  }
}
