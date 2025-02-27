import { Injectable } from '@angular/core';
import { CapabilityManager } from './capability.manager';
import { SourceManager } from './source/source.manager';

@Injectable({
  providedIn: 'root',
})
export class Manager {
  constructor(
    public capability: CapabilityManager,
    public source: SourceManager
  ) {}
}
