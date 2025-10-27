import { Injectable } from '@angular/core';
import { AnalysisServerCapability } from '../../models/arm/analysis/analysis-server-capability.model';
import { DeviceCapability } from '../../models/capabilities/arm/device-capability.model';
import { NetworkCapability } from '../../models/capabilities/arm/network-capability.model';
import { SecurityCapability } from '../../models/capabilities/arm/security-capability.model';

import { PromiseValue } from '../../../view-models/value.promise';
import { AnalysisShopCapability } from '../../models/arm/analysis/analysis-shop-capability.model';
import { AnalysisLLMCapability } from '../../models/arm/analysis/llm/analysis-llm-capability.model';
import { EventCapability } from '../../models/capabilities/arm/event/event-capability.model';
import { ArmAnalysisRequestService } from '../services/analysis/analysis.service';
import { ArmSystemRequestService } from '../services/system/system.service';

@Injectable({
  providedIn: 'root',
})
export class CapabilityManager {
  analysis = {
    server: new PromiseValue<AnalysisServerCapability>(),
    shop: new PromiseValue<AnalysisShopCapability>(),
    llm: new PromiseValue<AnalysisLLMCapability>(),
  };
  device = new PromiseValue<DeviceCapability>();
  security = new PromiseValue<SecurityCapability>();
  network = new PromiseValue<NetworkCapability>();
  event = new PromiseValue<EventCapability>();

  // inputproxy = new PromiseValue<InputProxyCapability>();

  constructor(
    system: ArmSystemRequestService,
    analysis: ArmAnalysisRequestService
  ) {
    this.service = {
      system,
      analysis,
    };
    this.init();
  }

  private service: {
    system: ArmSystemRequestService;
    analysis: ArmAnalysisRequestService;
  };

  private init() {
    this.service.system.capability().then((x) => {
      this.device.set(x);
    });
    this.service.system.security.capability().then((x) => {
      this.security.set(x);
    });
    this.service.system.network.capability().then((x) => {
      this.network.set(x);
    });
    this.service.system.event.capability().then((x) => {
      this.event.set(x);
    });
    // this.service.system.input.proxy.capability().then((x) => {
    //   this.inputproxy.set(x);
    // });
    this.service.analysis.server.capability().then((x) => {
      this.analysis.server.set(x);
    });
    this.service.analysis.shop.capability().then((x) => {
      this.analysis.shop.set(x);
    });
    this.service.analysis.llm.capability().then((x) => {
      this.analysis.llm.set(x);
    });
  }
}
