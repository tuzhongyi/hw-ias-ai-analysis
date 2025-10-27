import { Injectable } from '@angular/core';
import { HowellHttpClient } from '../../howell-http.client';
import { ArmAnalysisLLMRequestService } from './llm/analysis-llm.service';
import { ArmAnalysisServerRequestService } from './server/analysis-server.service';
import { ArmAnalysisShopRequestService } from './shop/analysis-shop.service';

@Injectable({
  providedIn: 'root',
})
export class ArmAnalysisRequestService {
  constructor(private http: HowellHttpClient) {}

  private _server?: ArmAnalysisServerRequestService;
  public get server(): ArmAnalysisServerRequestService {
    if (!this._server) {
      this._server = new ArmAnalysisServerRequestService(this.http);
    }
    return this._server;
  }

  private _shop?: ArmAnalysisShopRequestService;
  public get shop(): ArmAnalysisShopRequestService {
    if (!this._shop) {
      this._shop = new ArmAnalysisShopRequestService(this.http);
    }
    return this._shop;
  }

  private _llm?: ArmAnalysisLLMRequestService;
  public get llm(): ArmAnalysisLLMRequestService {
    if (!this._llm) {
      this._llm = new ArmAnalysisLLMRequestService(this.http);
    }
    return this._llm;
  }
}
