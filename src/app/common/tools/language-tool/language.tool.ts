import { Injectable } from '@angular/core';
import { Manager } from '../../data-core/requests/managers/manager';
import { LanguageAnalysisLLMTool } from './language-analysis-llm.tool';
import { LanguageAnalysisServerTool } from './language-analysis-server.tool';
import { LanguageAnalysisShopTool } from './language-analysis-shop.tool';
import { LanguageDeviceTool } from './language-device.tool';
import { LanguageEventTool } from './language-event.tool';
import { LanguageRoadTool } from './language-geo-road.tool';
import { LanguageLocalTool } from './language-local.tool';
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
    llm: LanguageAnalysisLLMTool;
  };
  event: LanguageEventTool;
  local = new LanguageLocalTool();
  road: LanguageRoadTool;

  constructor(private manager: Manager) {
    this.device = new LanguageDeviceTool(this.manager.source.device);
    this.security = new LanguageSecurityTool(this.manager.source.security);
    this.analysis = {
      server: new LanguageAnalysisServerTool(
        this.manager.source.analysis.server
      ),
      shop: new LanguageAnalysisShopTool(this.manager.source.analysis.shop),
      llm: new LanguageAnalysisLLMTool(this.manager.source.analysis.llm),
    };
    this.event = new LanguageEventTool(this.manager.source.event);
    this.road = new LanguageRoadTool(
      this.manager.source.road.section,
      this.manager.source.road.object
    );
  }
}
