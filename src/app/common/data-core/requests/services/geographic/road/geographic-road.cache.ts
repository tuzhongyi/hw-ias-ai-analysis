import { plainToInstance } from 'class-transformer';
import { IService } from '../../../../cache/cache.interface';
import { ServiceCache } from '../../../../cache/service.cache';

import { PagedList } from '../../../../models/page-list.model';

import { Road } from '../../../../models/arm/analysis/road.model';
import { GetRoadsParams } from './geographic-road.params';

export class RoadCache extends ServiceCache<Road> {
  constructor(key: string, service: IService<Road>) {
    super(key, service, Road);
  }

  override async get(id: string): Promise<Road> {
    return new Promise((reject) => {
      this.wait((data) => {
        let result = data.find((x) => x.Id === id);
        if (result) {
          reject(plainToInstance(Road, result));
          return;
        }
        this.service.get(id).then((x) => {
          let datas = this.load();
          if (!datas) datas = [];
          let index = datas.findIndex((x) => x.Id == id);
          if (index < 0) {
            datas.push(x);
            this.save(datas);
          }
          reject(x);
        });
      });
    });
  }

  override async list(args?: GetRoadsParams): Promise<PagedList<Road>> {
    return new Promise((reject) => {
      this.wait((x: Road[]) => {
        let datas = plainToInstance(Road, x);
        let paged: PagedList<Road>;
        if (args) {
          datas = this.filter(datas, args);
          paged = this.getPaged(datas, args);
        } else {
          paged = this.getPaged(datas);
        }
        reject(paged);
      });
    });
  }

  async array(args?: GetRoadsParams) {
    return new Promise<Road[]>((reject) => {
      this.wait((x: Road[]) => {
        let datas = plainToInstance(Road, x);
        if (args) {
          datas = this.filter(datas, args);
        } else {
        }
        reject(datas);
      });
    });
  }

  override filter(datas: Road[], params: GetRoadsParams): Road[] {
    if (params.Name) {
      datas = datas.filter((x) => {
        return (x.Name ?? '')
          .toLocaleLowerCase()
          .includes((params.Name ?? '').toLocaleLowerCase());
      });
    }
    if (params.Ids && params.Ids.length > 0) {
      datas = datas.filter((x) => {
        return params.Ids!.includes(x.Id);
      });
    }
    return datas;
  }
}
