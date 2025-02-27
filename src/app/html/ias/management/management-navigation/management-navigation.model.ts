import { ManagementPathNode } from '../management-path/management.path';

export interface ManagementNavigationItem
  extends ManagementPathNode<ManagementNavigationItem> {
  selected?: boolean;
}
