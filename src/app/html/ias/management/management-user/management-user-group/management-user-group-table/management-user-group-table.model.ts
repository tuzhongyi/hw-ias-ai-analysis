import { UserGroup } from '../../../../../../common/data-core/models/user/user-group.model';

export class ManagementUserGroupTableArgs {
  name?: string;
  /** true：重新从服务端拉取；false / 不传：在已拉取的数据里筛选 */
  reload?: boolean;
}

export class ManagementUserGroupTableItem extends UserGroup {
  DivisionNames?: string[];
}
