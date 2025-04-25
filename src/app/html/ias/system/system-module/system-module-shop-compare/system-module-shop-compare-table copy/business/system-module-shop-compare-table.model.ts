export class SystemModuleShopCompareTableArgs {
  private _taskcount: number = 1;
  public get taskcount(): number {
    return this._taskcount;
  }
  public set taskcount(v: number) {
    this._taskcount = v;
  }

  comparecount = 3;
}
export class SystemModuleShopCompareTableResult {
  shop = {
    created: 0,
    disappeared: 0,
    existed: 0,
  };
  task = 0;
}

export enum ShopCompareMode {
  based,
  registration,
}
