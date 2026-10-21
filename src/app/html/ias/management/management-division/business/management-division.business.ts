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
