export class SystemTaskShopRegistrationTableArgs {
  taskId?: string;
  name?: string;
  road: SystemTaskShopRegistrationTableRoadArgs = {};

  detected?: boolean;
}
interface SystemTaskShopRegistrationTableRoadArgs {
  on?: string;
  ori?: string;
}
