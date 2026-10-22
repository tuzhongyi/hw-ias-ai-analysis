import { User } from '../../../../../../common/data-core/models/user/user.model';

export class ManagementUserInfoTableArgs {
  name?: string;
  /** true：重新从服务端拉取；false / 不传：在已拉取的数据里筛选 */
  reload?: boolean;
}

export class ManagementUserInfoTableItem extends User {
  PriorityNames?: string[];
}
