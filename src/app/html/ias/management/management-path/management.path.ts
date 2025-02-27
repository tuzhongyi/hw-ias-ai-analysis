export class ManagementPathRoot {
  [key: string]: ManagementPathNode;
  system!: ManagementPathNode;
  network!: ManagementPathNode;
  record!: ManagementPathNode;
  user!: ManagementPathNode;
}

export interface ManagementPathNode<T = ManagementPathNode<any>> {
  name: string;
  path: string;
  children?: T[];
}
