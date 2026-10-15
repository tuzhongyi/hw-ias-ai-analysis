import { SystemPath } from '../system.model';

export class SystemBreadcrumbModel {
  items: SystemBreadcrumbItem[] = [];
}

export class SystemBreadcrumbItem {
  selected: boolean = false;
  text = '';
  // 由路由推导出来的路径是普通字符串，不再限定为 SystemPath 枚举
  path: string = SystemPath.index;
}
