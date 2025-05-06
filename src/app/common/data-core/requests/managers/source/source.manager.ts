import { Injectable } from '@angular/core';
import { CapabilityManager } from '../capability.manager';
import { SourceDeviceManager } from './source-device.manager';
import { SourceEventManager } from './source-event.manager';
import { SourceSecurityManager } from './source-security.manager';
import { SourceServerManager } from './source-server.manager';
import { SourceShopManager } from './source-shop.manager';

@Injectable({
  providedIn: 'root',
})
export class SourceManager {
  server: SourceServerManager;
  shop: SourceShopManager;
  security: SourceSecurityManager;
  event: SourceEventManager;
  device: SourceDeviceManager;
  constructor(capability: CapabilityManager) {
    this.shop = new SourceShopManager(capability);
    this.server = new SourceServerManager(capability);
    this.security = new SourceSecurityManager(capability);
    this.event = new SourceEventManager(capability);
    this.device = new SourceDeviceManager(capability);
  }
}
