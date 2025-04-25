import { ClassConstructor } from 'class-transformer';

import { IIdModel } from '../models/model.interface';
import { PagedList } from '../models/page-list.model';
import { IParams, PagedParams } from '../models/params.interface';
import { AppCache, IService } from './cache.interface';

export class ServicePool {
  static [key: string]: AppCache;
}

export interface IServiceCache {
  cache: AppCache;
}

export class ServiceCache<T extends IIdModel> implements IServiceCache {
  cache: AppCache;
  loading = false;

  constructor(
    protected key: string,
    protected service: IService<T>,
    protected type?: ClassConstructor<T>,
    protected timeout = 1000 * 60 * 30
  ) {
    try {
      // console.log(key);
      let cache = ServicePool[key];
      if (!cache) {
        cache = new AppCache(timeout);
        ServicePool[key] = cache;
      }
      this.cache = cache;
    } catch (error) {
      console.error(error);
    }
    this.cache = new AppCache(timeout);
  }

  filter(datas: T[], args: IParams): T[] {
    return datas;
  }

  private async load(params = new PagedParams()) {
    this.loading = true;
    try {
      let data: T[] = [];
      let index = 1;
      let paged: PagedList<T>;
      do {
        params.PageIndex = index;
        paged = await this.service.list(params);
        data = data.concat(paged.Data);
        index++;
      } while (index <= paged.Page.PageCount);

      return data;
    } finally {
      this.loading = false;
    }
  }

  protected _cache = {
    load: () => {
      return this.cache.get(this.key) as T[] | undefined;
    },
    save: (data: T[]) => {
      this.cache.set(this.key, data, this.timeout);
    },
    clear: () => {
      this.loading = false;
      this.cache.del(this.key);
    },
  };

  wait() {
    return new Promise<T[]>((resolve) => {
      let datas = this._cache.load();
      if (datas) {
        resolve(datas);
        return;
      }
      this.load(new PagedParams()).then((datas) => {
        this._cache.save(datas);
        resolve(datas);
      });
    });
  }

  async list(params: PagedParams = new PagedParams()): Promise<PagedList<T>> {
    return this.wait().then((datas) => {
      datas = this.filter(datas, params);
      return PagedList.create(datas, params.PageIndex, params.PageSize);
    });
  }

  async array(params: IParams): Promise<T[]> {
    return this.wait().then((datas) => {
      let result = this.filter(datas, params);
      return result;
    });
  }

  async get(id: string): Promise<T> {
    return this.wait().then((x) => {
      let data = x.find((x) => x.Id == id);
      if (data) {
        return data;
      }
      throw new Error('not found');
    });
  }
}
