import { Injectable } from '@angular/core';
import {
  SystemMapShopArgs,
  SystemMapTaskShopArgs,
} from '../../system-map-shop.model';
import { SystemMapShopTaskBaseBusiness } from './system-map-shop-task-base.business';
import { SystemMapShopTaskCompareBusiness } from './system-map-shop-task-compare.business';

@Injectable()
export class SystemMapShopTaskBusiness {
  constructor(
    public base: SystemMapShopTaskBaseBusiness,
    public compare: SystemMapShopTaskCompareBusiness
  ) {}

  load(task: SystemMapTaskShopArgs, args: SystemMapShopArgs) {
    if (task.base) {
      return this.base.load(task, args);
    }
    return this.compare.load(task, args);
  }
}
