import { Injectable } from '@angular/core';
import { Division } from '../../../../../common/data-core/models/arm/division/division.model';
import { GetDivisionsParams } from '../../../../../common/data-core/requests/services/division/division.params';
import { ArmDivisionRequestService } from '../../../../../common/data-core/requests/services/division/division.service';
import { LocaleCompare } from '../../../../../common/tools/compare-tool/compare.tool';
import { ObjectTool } from '../../../../../common/tools/object-tool/object.tool';
import {
  ManagementDivisionTableArgs,
  ManagementDivisionTableItem,
} from './management-division.model';

@Injectable()
export class ManagementDivisionBusiness {
  constructor(private service: ArmDivisionRequestService) {}

  get(id: string) {
    return this.service.get(id);
  }

  create(data: Division) {
    data.CreateTime = new Date();
    data.UpdateTime = new Date();
    return this.service.create(data).then((x) => {
      this.service.cache.clear();
      return x;
    });
  }

  update(data: Division) {
    data.UpdateTime = new Date();
    return this.service.update(data).then((x) => {
      this.service.cache.clear();
      return x;
    });
  }

  /**
   * 同步父区划的 IsLeaf：父区划下有子区划时为 false，没有子区划时为 true。
   * 区划的新增、删除会改变父区划的叶子状态，但服务端不会自动回写。
   * 以孩子数量重新判断，失败只记日志，不影响已经完成的新增/删除。
   */
  async leaf(parentId?: string) {
    if (!parentId) return;
    try {
      /* 父区划走列表接口（按 DivisionIds 查），和表格是同一个数据源，
         避免依赖工程里其它地方都没用过的 GET，拿到的也正好是列表要展示的那份数据 */
      let query = new GetDivisionsParams();
      query.DivisionIds = [parentId];
      let parents = await this.service.all(query);
      let parent = parents.find((x) => x.Id === parentId);
      if (!parent) return;

      let params = new GetDivisionsParams();
      params.ParentIds = [parentId];
      let children = await this.service.all(params);

      let isleaf = children.length === 0;
      if (parent.IsLeaf === isleaf) return;

      parent.IsLeaf = isleaf;
      await this.update(parent);
    } catch (error) {
      console.error('同步父区划 IsLeaf 失败', error);
    }
  }

  /** 同步多个父区划，同一个父区划只查一次 */
  async leaves(parentIds: (string | undefined)[]) {
    let ids = new Set(parentIds.filter((x): x is string => !!x));
    for (const id of ids) {
      await this.leaf(id);
    }
  }

  /** 逐个删除，返回成功数量（协议只提供单条删除接口） */
  async delete(datas: Division[]) {
    let count = 0;
    for (const data of datas) {
      try {
        await this.service.delete(data.Id);
        count++;
      } catch (error) {
        console.error(error);
      }
    }
    if (count > 0) {
      this.service.cache.clear();
    }
    return count;
  }

  clear() {
    this.service.cache.clear();
  }

  /** 导入区划 Excel，返回导入数量 */
  upload(data: ArrayBuffer, progress?: (value: number) => void) {
    return this.service.excel.upload(data, progress).then((count) => {
      this.service.cache.clear();
      return count;
    });
  }

  async load(args: ManagementDivisionTableArgs) {
    // 当前文件夹由 args.parent 指定，服务端已完成过滤，无需再拉全量数据
    let datas = await this.data.load(args);
    datas.sort((a, b) => this.sort(a, b));

    let ids = new Set<string>();
    for (const item of datas) {
      if (item.ParentId) ids.add(item.ParentId);
    }
    let parents =
      ids.size > 0 ? this.data.byIds(Array.from(ids)) : Promise.resolve([]);

    return datas.map((x) => this.convert(x, parents));
  }

  /** 父节点统一查询一次，模板通过 async 管道取值 */
  private convert(
    source: Division,
    parents: Promise<Division[]>,
  ): ManagementDivisionTableItem {
    let item = ObjectTool.assign(source, ManagementDivisionTableItem);
    item.Parent = source.ParentId
      ? parents.then((x) => x.find((p) => p.Id === source.ParentId))
      : Promise.resolve(undefined);
    return item;
  }

  /** DivisionType 升序；同级时 IsLeaf=false（文件夹）排在前面 */
  private sort(a: Division, b: Division) {
    return (
      LocaleCompare.compare(a.DivisionType, b.DivisionType) ||
      LocaleCompare.compare(a.IsLeaf, b.IsLeaf, true)
    );
  }

  data = {
    load: (args: ManagementDivisionTableArgs) => {
      let params = new GetDivisionsParams();
      // 空字符串表示根节点；当前文件夹已知，直接交给服务端过滤
      params.ParentIds = [args.parent ? args.parent.Id : ''];
      if (args.name) {
        params.Name = args.name;
      }

      if (args.type) {
        params.DivisionTypes = [args.type];
      }
      return this.service.all(params);
    },
    /** 按 ID 批量查询区划（用于补父节点信息） */
    byIds: (ids: string[]) => {
      let params = new GetDivisionsParams();
      params.DivisionIds = ids;
      return this.service.all(params);
    },
    get: (id: string) => {
      return this.service.get(id);
    },
  };
}
