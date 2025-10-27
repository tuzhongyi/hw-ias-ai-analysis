import { AnalysisGpsTask } from '../../../../../../common/data-core/models/arm/analysis/llm/analysis-gps-task.model';

export class SystemModuleGpsTaskTableArgs {
  name?: string;
  group?: number;
  type?: number;
  reset?: boolean;
}
export class SystemModuleGpsTaskTableFilter extends SystemModuleGpsTaskTableArgs {
  asc?: string;
  desc?: string;

  load(args: SystemModuleGpsTaskTableArgs) {
    return Object.assign(this, args);
  }
}

export class SystemModuleGpsTaskTableItem extends AnalysisGpsTask {
  TaskTypeName!: string;
}
