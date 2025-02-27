import { Injectable } from '@angular/core';
import { plainToInstance } from 'class-transformer';
import json from '../management-path/management-path.json';
import {
  ManagementPathNode,
  ManagementPathRoot,
} from '../management-path/management.path';

@Injectable()
export class ManagementTabHeaderBusiness {
  private root = plainToInstance(ManagementPathRoot, json);

  load() {
    for (const rootkey in this.root) {
      let node = this.find(rootkey);
      if (node) {
        return node;
      }
    }
    return undefined;
  }

  find(root: string) {
    let children = this.root[root].children;
    if (children) {
      let node = children.find((child) =>
        location.pathname.includes(child.path)
      );
      return node;
    }
    return undefined;
  }

  index(nodes: ManagementPathNode[]) {
    return nodes.findIndex((x) => {
      return location.pathname.includes(x.path);
    });
  }
}
