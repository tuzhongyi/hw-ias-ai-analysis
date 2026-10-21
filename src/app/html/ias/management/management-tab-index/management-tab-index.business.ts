import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Route } from '@angular/router';

export interface ManagementTabItem {
  name: string;
  url: string;
}

/**
 * 页签完全由 management-routing.module.ts 推导，不再依赖 management-path.json。
 *
 * - 页签名取页面路由自己的 `data.title`；
 * - 当前分区 = 当前 TabIndex 路由的 `firstChild`（如 system 下的 device），
 *   页签 = 该分区下声明了 path 的子路由；
 * - 分区本身就是页面时（如 /management/division/manager），只显示它自己一个页签。
 *
 * 加页面时只需在路由里加一行并写上 `data: { title: '…' }`，这里会自动出现页签。
 */
@Injectable()
export class ManagementTabHeaderBusiness {
  load(route: ActivatedRouteSnapshot) {
    const section = route.firstChild;
    if (!section || !section.routeConfig) {
      return { items: [] as ManagementTabItem[], index: 0 };
    }

    const config = section.routeConfig;
    const pages = (config.children ?? []).filter((x) => this.isPage(x));

    if (pages.length > 0) {
      const items: ManagementTabItem[] = pages.map((page) => {
        return {
          name: this.title(page),
          url: this.url(section, page.path),
        };
      });
      const active = section.firstChild?.routeConfig;
      const index = active ? pages.indexOf(active) : -1;
      return { items, index: Math.max(0, index) };
    }

    /* 没有中间分组层，分区本身就是页面，如 /management/division/manager */
    if (this.isPage(config)) {
      return {
        items: [{ name: this.title(config), url: this.url(section) }],
        index: 0,
      };
    }

    return { items: [] as ManagementTabItem[], index: 0 };
  }

  /** 只把真正渲染页面的路由当作页签，排除 path: '' 和 redirectTo */
  private isPage(route: Route): boolean {
    return !!route.path && !route.redirectTo;
  }

  private title(route: Route): string {
    const title = route.data?.['title'];
    return typeof title === 'string' ? title : '';
  }

  /** 沿 pathFromRoot 累加实际 URL，再拼上页签自己的 path */
  private url(section: ActivatedRouteSnapshot, path?: string): string {
    const segments: string[] = [];
    for (const node of section.pathFromRoot) {
      for (const segment of node.url) {
        segments.push(segment.path);
      }
    }
    if (path) {
      segments.push(...path.split('/').filter((x) => x.length > 0));
    }
    return '/' + segments.join('/');
  }
}
