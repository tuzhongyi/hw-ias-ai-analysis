import { Injectable } from '@angular/core';
import { plainToInstance } from 'class-transformer';
import json from '../management-path/management-path.json';
import {
  ManagementPathNode,
  ManagementPathRoot,
} from '../management-path/management.path';
import { ManagementBreadcrumbItem } from './management-breadcrumb.model';

@Injectable()
export class ManagementBreadcrumbBusiness {
  private root = plainToInstance(ManagementPathRoot, json);

  load(): ManagementBreadcrumbItem[] {
    let paths: ManagementBreadcrumbItem[] = [];
    let root = this.find.root();
    if (root) {
      let nodes = this.find.node(root);
      paths = nodes.map((x) => {
        return this.convert(x);
      });
    }

    if (paths.length > 0) {
      paths[paths.length - 1].selected = true;
    }

    return paths;
  }

  private find = {
    root: () => {
      for (const key in this.root) {
        if (location.pathname.indexOf(key) > -1) {
          return this.root[key];
        }
      }
      return undefined;
    },
    node: (node: ManagementPathNode, nodes: ManagementPathNode[] = []) => {
      nodes.push(node);
      if (node.children) {
        for (let i = 0; i < node.children.length; i++) {
          const child = node.children[i];
          if (location.pathname.indexOf(child.path) > -1) {
            this.find.node(child, nodes);
          }
        }
      }
      return nodes;
    },
  };

  private convert(node: ManagementPathNode) {
    let item: ManagementBreadcrumbItem = {
      name: node.name,
      path: node.path,
    };
    return item;
  }
}
