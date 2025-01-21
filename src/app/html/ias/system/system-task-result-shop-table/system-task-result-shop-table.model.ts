export class SystemTaskResultShopTableArgs {
  taskId?: string;
  name?: string;
  channel?: string;
  type?: number;
  label?: number;
  confidence = 0;
}

export class SystemTaskResultShopTableFilter extends SystemTaskResultShopTableArgs {
  load(args: SystemTaskResultShopTableArgs) {
    Object.assign(this, args);
  }
}
