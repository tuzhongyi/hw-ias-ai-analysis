import { HowellHttpClient } from '../../../howell-http.client';
import { ArmGeographicPatrolPlanRequestService } from './patrol-plan/geographic-patrol-plan.service';
import { ArmGeographicPatrolSectionRequestService } from './patrol-section/geographic-patrol-section.service';

export class ArmGeographicPatrolRequestService {
  constructor(private http: HowellHttpClient) {}

  private _plan?: ArmGeographicPatrolPlanRequestService;
  public get plan(): ArmGeographicPatrolPlanRequestService {
    if (!this._plan) {
      this._plan = new ArmGeographicPatrolPlanRequestService(this.http);
    }
    return this._plan;
  }

  private _section?: ArmGeographicPatrolSectionRequestService;
  public get section(): ArmGeographicPatrolSectionRequestService {
    if (!this._section) {
      this._section = new ArmGeographicPatrolSectionRequestService(this.http);
    }
    return this._section;
  }
}
