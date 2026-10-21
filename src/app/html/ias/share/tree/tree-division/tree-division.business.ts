import { Injectable } from '@angular/core';
import { FlatTreeNode } from '../../../../../common/components/tree/component/tree.model';
import { ArmDivisionType } from '../../../../../common/data-core/enums/division/divison-type.enum';
import { Division } from '../../../../../common/data-core/models/arm/division/division.model';
import { ArmDivisionRequestService } from '../../../../../common/data-core/requests/services/division/division.service';
import { LocaleCompare } from '../../../../../common/tools/compare-tool/compare.tool';

@Injectable()
export class TreeDivisionBusiness {
  constructor(private division: ArmDivisionRequestService) {}

  all() {
    return this.division.cache.all();
  }

  /** 区划增删改后清缓存，保证下次 all() 拿到最新数据 */
  clear() {
    this.division.cache.clear();
  }

  /**
   * 把平铺的区划列表按 ParentId 组装成树形组件需要的可见顺序。
   * name 非空时只保留名称匹配的区划及其祖先节点。
   * excludeIds 中的区划及其所有下级会被移除。
   */
  convert(
    divisions: Division[],
    name = '',
    excludeIds: string[] = [],
    enabletypes: ArmDivisionType[] = []
  ): FlatTreeNode<Division>[] {
    const keyword = name.trim().toLowerCase();
    if (keyword) {
      divisions = this.filter(divisions, keyword);
    }
    /* 为空表示不限制；否则只保留允许的类型，被移除节点的下级会作为根节点显示 */
    if (enabletypes?.length) {
      divisions = divisions.filter((x) =>
        enabletypes.includes(x.DivisionType)
      );
    }
    if (excludeIds.length > 0) {
      divisions = this.exclude(divisions, excludeIds);
    }

    let map = new Map<string, Division>();
    for (const division of divisions) {
      map.set(division.Id, division);
    }

    let children = new Map<string, Division[]>();
    let roots: Division[] = [];
    for (const division of divisions) {
      if (division.ParentId && map.has(division.ParentId)) {
        let items = children.get(division.ParentId);
        if (!items) {
          items = [];
          children.set(division.ParentId, items);
        }
        items.push(division);
      } else {
        roots.push(division);
      }
    }

    let nodes: FlatTreeNode<Division>[] = [];
    /* 防御异常数据里出现环，已输出的节点不再重复输出 */
    let visited = new Set<string>();
    let push = (items: Division[], level: number) => {
      /* 同级内：DivisionType 小的在前，叶节点排后面，最后按名称 */
      items.sort(
        (a, b) =>
          LocaleCompare.compare(a.DivisionType, b.DivisionType) ||
          LocaleCompare.compare(a.IsLeaf, b.IsLeaf, true) ||
          LocaleCompare.compare(a.Name, b.Name)
      );
      for (const item of items) {
        if (visited.has(item.Id)) continue;
        visited.add(item.Id);

        let subs = children.get(item.Id) ?? [];
        nodes.push({
          id: item.Id,
          label: item.Name,
          level,
          parentId:
            item.ParentId && map.has(item.ParentId)
              ? item.ParentId
              : undefined,
          expandable: subs.length > 0,
          icon: this.icon(item.DivisionType),
          data: item,
        });
        push(subs, level + 1);
      }
    };
    push(roots, 0);

    /* 父节点缺失或成环导致没有挂到根上的区划，也作为根节点显示 */
    for (const division of divisions) {
      if (!visited.has(division.Id)) {
        push([division], 0);
      }
    }

    return nodes;
  }

  /** 保留名称匹配项以及它们的祖先 */
  private filter(divisions: Division[], keyword: string): Division[] {
    let map = new Map<string, Division>();
    for (const division of divisions) {
      map.set(division.Id, division);
    }

    let matched = new Set<string>();
    for (const division of divisions) {
      if (division.Name.toLowerCase().includes(keyword)) {
        matched.add(division.Id);
      }
    }
    for (const id of Array.from(matched)) {
      let current = map.get(id);
      while (current?.ParentId) {
        let parent = map.get(current.ParentId);
        if (!parent) break;
        matched.add(parent.Id);
        current = parent;
      }
    }

    return divisions.filter((division) => matched.has(division.Id));
  }

  /** 移除指定区划及其所有下级 */
  private exclude(divisions: Division[], ids: string[]): Division[] {
    let excluded = new Set<string>(ids);
    let children = new Map<string, Division[]>();
    for (const division of divisions) {
      if (!division.ParentId) continue;
      let items = children.get(division.ParentId);
      if (!items) {
        items = [];
        children.set(division.ParentId, items);
      }
      items.push(division);
    }

    let queue = Array.from(excluded);
    while (queue.length > 0) {
      let id = queue.shift() as string;
      for (const child of children.get(id) ?? []) {
        if (excluded.has(child.Id)) continue;
        excluded.add(child.Id);
        queue.push(child.Id);
      }
    }

    return divisions.filter((division) => !excluded.has(division.Id));
  }

  private icon(type: ArmDivisionType): string {
    switch (type) {
      case ArmDivisionType.Province:
        return 'howell-icon-map';
      case ArmDivisionType.City:
        return 'howell-icon-Building';
      case ArmDivisionType.County:
        return 'howell-icon-MapVillage';
      case ArmDivisionType.GridCell:
        return 'howell-icon-grid';
      default:
        return 'howell-icon-map';
    }
  }
}
