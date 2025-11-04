import { Injectable } from '@angular/core';
import { SystemTaskFileDetailsMapGPSBusiness } from './system-task-file-details-map-gps.business';
import { SystemTaskFileDetailsMapShopBusiness } from './system-task-file-details-map-shop.business';

@Injectable()
export class SystemTaskFileDetailsMapBusiness {
  constructor(
    public gps: SystemTaskFileDetailsMapGPSBusiness,
    public shop: SystemTaskFileDetailsMapShopBusiness
  ) {}
}
