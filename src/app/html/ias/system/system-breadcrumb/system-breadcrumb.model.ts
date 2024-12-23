import { SystemPath } from '../system.model';

export class SystemBreadcrumbModel {
  items: SystemBreadcrumbItem[] = [];
}

export class SystemBreadcrumbItem {
  selected: boolean = false;
  text = '';
  path = SystemPath.index;
}
