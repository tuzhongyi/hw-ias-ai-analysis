import { Injectable } from '@angular/core';
import { CapabilityManager } from '../capability.manager';
import { LocalCapability } from '../enums/enum-capability';
import { SourceAnalysisLLMManager } from './source-analysis-llm.manager';
import { SourceAnalysisServerManager } from './source-analysis-server.manager';
import { SourceAnalysisShopManager } from './source-analysis-shop.manager';
import { SourceDeviceManager } from './source-device.manager';
import { SourceEventManager } from './source-event.manager';
import { SourceSecurityManager } from './source-security.manager';

@Injectable({
  providedIn: 'root',
})
export class SourceManager {
  security: SourceSecurityManager;
  event: SourceEventManager;
  device: SourceDeviceManager;
  analysis: {
    server: SourceAnalysisServerManager;
    shop: SourceAnalysisShopManager;
    llm: SourceAnalysisLLMManager;
  };
  local = new LocalCapability();
  constructor(capability: CapabilityManager) {
    this.analysis = {
      server: new SourceAnalysisServerManager(capability),
      shop: new SourceAnalysisShopManager(capability),
      llm: new SourceAnalysisLLMManager(capability),
    };
    this.security = new SourceSecurityManager(capability);
    this.event = new SourceEventManager(capability);
    this.device = new SourceDeviceManager(capability);
  }
}
