import { ClassConstructor } from 'class-transformer';
import { AnalysisTask } from '../models/arm/analysis/task/analysis-task.model';
import { Road } from '../models/arm/geographic/road.model';
import { ShopRegistration } from '../models/arm/geographic/shop-registration.model';
import { AnalysisTaskCache } from '../requests/services/analysis/server/analysis-server.cache';
import { RoadCache } from '../requests/services/geographic/road/geographic-road.cache';
import { ShopRegistrationCache } from '../requests/services/geographic/shop/geographic-shop.cache';
import { ServiceCache } from './service.cache';

export function Cache<T>(key: string, type?: ClassConstructor<T>) {
  return function (this: any, target: Function) {
    if (!target.prototype.cache) {
      Object.defineProperty(target.prototype, 'cache', {
        get() {
          if (!this._cache) {
            if (type) {
              switch (type.name) {
                case AnalysisTask.name:
                  this._cache = new AnalysisTaskCache(key, this);
                  break;
                case Road.name:
                  this._cache = new RoadCache(key, this);
                  break;
                case ShopRegistration.name:
                  this._cache = new ShopRegistrationCache(key, this);
                  break;
                default:
                  this._cache = new ServiceCache(key, this);
                  break;
              }
            } else {
              this._cache = new ServiceCache(key, this);
            }
          }
          return this._cache;
        },
        set() {},
      });
    }
  };
}
