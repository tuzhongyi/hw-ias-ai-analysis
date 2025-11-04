export class SystemTaskResultSignTableArgs {
  taskId: string = '';
  channel?: string;
  type?: number = 1;
  label?: number;
  shopId?: string;
  confidence = 0;
}

export class SystemTaskResultSignTableFilter extends SystemTaskResultSignTableArgs {
  load(args: SystemTaskResultSignTableArgs) {
    Object.assign(this, args);
  }
}
