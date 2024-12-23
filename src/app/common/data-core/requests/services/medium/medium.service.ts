import { Injectable } from '@angular/core';
import { ArmMediumUrl } from '../../../urls/arm/medium/medium.url';

@Injectable({
  providedIn: 'root',
})
export class MediumRequestService {
  constructor() {}

  picture(id: string) {
    return ArmMediumUrl.picture(id);
  }
}
