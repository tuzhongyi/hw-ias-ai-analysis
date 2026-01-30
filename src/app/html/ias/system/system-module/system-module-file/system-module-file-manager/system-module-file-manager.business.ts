import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ArmAnalysisRequestService } from '../../../../../../common/data-core/requests/services/analysis/analysis.service';
import { LocalStorage } from '../../../../../../common/storage/local.storage';

@Injectable()
export class SystemMobuleFileManagerBusiness {
  constructor(
    private service: ArmAnalysisRequestService,
    private local: LocalStorage,
    private router: Router
  ) {}
}
