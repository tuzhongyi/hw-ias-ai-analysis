import { TaskCompareType } from '../../../system-map-task/system-map-task-manager/system-map-task-manager.model';

export class SystemMapTaskArgs {
  name?: string;
  ids: string[] = [];
  type?: TaskCompareType;
}
export class SystemMapTaskFilter {
  name?: string;
  ids: string[] = [];

  static from(args: SystemMapTaskArgs) {
    let filter = new SystemMapTaskFilter();
    filter.name = args.name;
    filter.ids = args.ids;
    return filter;
  }
}
