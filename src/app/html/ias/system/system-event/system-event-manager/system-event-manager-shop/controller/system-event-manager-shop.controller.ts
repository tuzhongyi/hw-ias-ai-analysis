import { Injectable } from '@angular/core';
import { SystemEventManagerShopProcessController } from './process/system-event-manager-shop-process.controller';

@Injectable()
export class SystemEventManagerShopController {
  constructor(public process: SystemEventManagerShopProcessController) {}
}
