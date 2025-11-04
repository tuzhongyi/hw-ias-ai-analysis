import { AnalysisTask } from '../../../../../../common/data-core/models/arm/analysis/task/analysis-task.model';
import { DateTimeTool } from '../../../../../../common/tools/date-time-tool/datetime.tool';
import { Duration } from '../../../../../../common/tools/date-time-tool/duration.model';

export class SystemTaskTableArgs {
  constructor(duration = DateTimeTool.last.year(new Date())) {
    this.duration = duration;
  }
  finished?: boolean;
  name?: string;
  duration: Duration;
}

export class SystemTaskTableFilter extends SystemTaskTableArgs {
  asc?: string;
  desc?: string;

  load(args: SystemTaskTableArgs) {
    this.finished = args.finished;
    this.name = args.name;
    this.duration = args.duration;
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
  files: string[];
  completed: number;
}
