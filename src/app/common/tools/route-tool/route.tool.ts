import { ActivatedRouteSnapshot } from '@angular/router';

export class RouteTool {
  /**
   * 当前路由链上最深处那条 `data.title`（没写就是空串）。
   *
   * 和面包屑（SystemBreadcrumbBusiness）同一套规则：沿 firstChild 链走，
   * 读 `node.routeConfig.data` —— 不要读 `node.data`，父路由的 data 会被
   * 继承进子快照，那样永远只能读到最外层那个 title。
   *
   * 页面标题用它就不用再维护 `location.pathname.indexOf(...)` 那串 if/else，
   * 加页面时只在 system-routing.module.ts 那一行写 data.title 即可。
   */
  static title(root: ActivatedRouteSnapshot): string {
    let title = '';

    for (
      let node: ActivatedRouteSnapshot | null = root;
      node;
      node = node.firstChild
    ) {
      const value = node.routeConfig?.data?.['title'];
      if (typeof value === 'string' && value.length > 0) {
        title = value;
      }
    }

    return title;
  }
}
