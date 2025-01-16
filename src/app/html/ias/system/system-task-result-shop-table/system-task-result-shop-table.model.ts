export class SystemTaskResultShopTableArgs {
  taskId?: string;
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
