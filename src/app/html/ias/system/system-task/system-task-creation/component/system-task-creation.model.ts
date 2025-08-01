import { UploadControlFile } from '../../../../../../common/components/upload-control/upload-control.model';
import { AnalysisTask } from '../../../../../../common/data-core/models/arm/analysis/task/analysis-task.model';

export interface SystemTaskModel {
  task: AnalysisTask;
  files: UploadControlFile[];
  start: boolean;
}
export interface TaskCompletedArgs {
  task: AnalysisTask;
  files: string[];
  start: boolean;
}
