import { Injectable } from '@angular/core';
import { Manager } from '../../data-core/requests/managers/manager';
import { LanguageAnalysisServerTool } from './language-analysis-server.tool';
import { LanguageAnalysisShopTool } from './language-analysis-shop.tool';
import { LanguageDeviceTool } from './language-device.tool';
import { LanguageEventTool } from './language-event.tool';
import { LanguageSecurityTool } from './language-security.tool';

@Injectable({
  providedIn: 'root',
})
export class LanguageTool {
  device: LanguageDeviceTool;
  security: LanguageSecurityTool;
  analysis: {
    server: LanguageAnalysisServerTool;
    shop: LanguageAnalysisShopTool;
  };
  event: LanguageEventTool;

  constructor(private manager: Manager) {
    this.device = new LanguageDeviceTool(this.manager.source.device);
    this.security = new LanguageSecurityTool(this.manager.source.security);
    this.analysis = {
      server: new LanguageAnalysisServerTool(this.manager.source.server),
      shop: new LanguageAnalysisShopTool(this.manager.source.shop),
    };
    this.event = new LanguageEventTool(this.manager.source.event);
  }
}
