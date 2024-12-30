import { AnalysisTask } from '../../../../common/data-core/models/arm/analysis/analysis-task.model';

export class SystemTaskTableArgs {
  finished = false;
}

export class SystemTaskTableFilter extends SystemTaskTableArgs {
  asc?: string;
  desc?: string;

  load(args: SystemTaskTableArgs) {
    this.finished = args.finished;
  }
}

export class AnalysisTaskModel extends AnalysisTask {
  index?: number;
  hasdata = false;
  StateName!: Promise<string>;
  TaskTypeName!: Promise<string>;

  static create() {
    let model = new AnalysisTaskModel();
    model.Name = '';
    return model;
  }
}

export interface TaskProgress {
  taskid: string;
  progress: number;
  completed: number;
}
