import { Injectable } from '@angular/core';
import { HowellHttpClient } from '../../howell-http.client';
import { ArmGeographicRoadRequestService } from './road/geographic-road.service';

@Injectable({
  providedIn: 'root',
})
export class ArmGeographicRequestService {
  constructor(private http: HowellHttpClient) {}

  private _road?: ArmGeographicRoadRequestService;
  public get road(): ArmGeographicRoadRequestService {
    if (!this._road) {
      this._road = new ArmGeographicRoadRequestService(this.http);
    }
    return this._road;
  }
}
