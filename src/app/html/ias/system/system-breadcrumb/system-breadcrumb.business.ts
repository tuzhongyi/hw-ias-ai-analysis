import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot } from '@angular/router';
import { SystemPath } from '../system.model';
import { SystemBreadcrumbItem } from './system-breadcrumb.model';

/**
 * 面包屑完全由路由状态推导。
 *
 * 一个路由只要自己声明了 `data: { title: '…' }` 就产生一项，
 * 跳转目标 = 沿 firstChild 链累加出来的 URL。这里不含任何逐页知识 ——
 * 加页面时只需在 system-routing.module.ts 的那一行顺手写上 data.title。
 *
 * 两个坑：
 * 1. 读 node.routeConfig.data（路由自己声明的），不要读 node.data ——
 *    后者会被父路由的 data 继承覆盖，会让子路由重复父级的面包屑。
 * 2. 不要给 path: '' 的布局路由加 title，那会让 /system 下每一页都多一项。
 */
@Injectable()
export class SystemBreadcrumbBusiness {
  load(root: ActivatedRouteSnapshot): SystemBreadcrumbItem[] {
    const items: SystemBreadcrumbItem[] = [];
    const segments: string[] = [];

    for (
      let node: ActivatedRouteSnapshot | null = root;
      node;
      node = node.firstChild
    ) {
      for (const segment of node.url) {
        segments.push(segment.path);
      }

      const title = node.routeConfig?.data?.['title'];
      if (typeof title === 'string' && title.length > 0) {
        const item = new SystemBreadcrumbItem();
        item.text = title;
        item.path = '/' + segments.join('/');
        items.push(item);
      }
    }

    // 没有任何带 title 的路由（如 /system/index）时保持空条
    if (items.length === 0) {
      return items;
    }

    const home = new SystemBreadcrumbItem();
    home.text = '主页';
    home.path = SystemPath.index;
    items.unshift(home);

    items[items.length - 1].selected = true;
    return items;
  }
}
