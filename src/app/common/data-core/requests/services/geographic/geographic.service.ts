import { Injectable } from '@angular/core';
import { HowellHttpClient } from '../../howell-http.client';
import { ArmGeographicPatrolRequestService } from './patrol/geographic-patrol.service';
import { ArmGeographicRoadRequestService } from './road/geographic-road.service';
import { ArmGeographicShopRequestService } from './shop/geographic-shop.service';

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

  private _shop?: ArmGeographicShopRequestService;
  public get shop(): ArmGeographicShopRequestService {
    if (!this._shop) {
      this._shop = new ArmGeographicShopRequestService(this.http);
    }
    return this._shop;
  }

  private _patrol?: ArmGeographicPatrolRequestService;
  public get patrol(): ArmGeographicPatrolRequestService {
    if (!this._patrol) {
      this._patrol = new ArmGeographicPatrolRequestService(this.http);
    }
    return this._patrol;
  }
}
