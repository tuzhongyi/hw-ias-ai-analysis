import { AbstractUrl } from '../../abstract.url';

export class SystemEventHandleUrl extends AbstractUrl {
  constructor(base: string) {
    super(`${base}/Handle`);
  }

  shop = {
    delete: () => {
      return `${this.basic()}/DeleteShop`;
    },
    create: () => {
      return `${this.basic()}/CreateShop`;
    },
    marking: () => {
      return `${this.basic()}/MarkingShop`;
    },
    merge: () => {
      return `${this.basic()}/MergeShop`;
    },
  };

  business = {
    state: {
      change: () => {
        return `${this.basic()}/ChangeBusinessState`;
      },
    },
  };
}
