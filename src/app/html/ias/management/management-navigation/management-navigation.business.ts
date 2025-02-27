import { Injectable } from '@angular/core';
import { plainToInstance } from 'class-transformer';
import json from '../management-path/management-path.json';
import {
  ManagementPathNode,
  ManagementPathRoot,
} from '../management-path/management.path';
import { ManagementNavigationItem } from './management-navigation.model';

@Injectable()
export class ManagementNavigationBusiness {
  private root = plainToInstance(ManagementPathRoot, json);

  load() {
    let keys = Object.keys(this.root);
    let nodes = keys.map((key) => {
      return this.root[key];
    });
    nodes.forEach((node) => {
      this.select.node(node);
    });
    return nodes;
  }

  select = {
    node: (node: ManagementNavigationItem) => {
      if (location.pathname.indexOf(node.path) > -1) {
        node.selected = true;
      } else {
        node.selected = undefined;
      }
      if (node.children) {
        for (let i = 0; i < node.children.length; i++) {
          const child = node.children[i];
          this.select.node(child);
        }
      }
    },
  };

  convert(node: ManagementPathNode) {
    let item: ManagementNavigationItem = {
      name: node.name,
      path: node.path,
    };
    return item;
  }
}
