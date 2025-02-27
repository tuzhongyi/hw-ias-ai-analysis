import { ManagementPathNode } from '../management-path/management.path';

export interface ManagementBreadcrumbItem extends ManagementPathNode {
  selected?: boolean;
}
