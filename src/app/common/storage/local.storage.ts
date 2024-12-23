import { Injectable } from '@angular/core';
import { AuthorizationStore } from './authorization/authorization.store';

@Injectable({
  providedIn: 'root',
})
export class LocalStorage {
  auth = new AuthorizationStore();
}
