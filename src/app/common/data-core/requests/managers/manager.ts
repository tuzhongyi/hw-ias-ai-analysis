import { Injectable } from '@angular/core';
import { CapabilityManager } from './capability.manager';

@Injectable({
  providedIn: 'root',
})
export class Manager {
  constructor(public capability: CapabilityManager) {}
}
