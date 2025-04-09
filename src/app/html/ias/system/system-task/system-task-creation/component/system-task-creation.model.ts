import { UploadControlFile } from '../../../../../../common/components/upload-control/upload-control.model';
import { AnalysisTask } from '../../../../../../common/data-core/models/arm/analysis/analysis-task.model';

export interface SystemTaskModel {
  task: AnalysisTask;
  files: UploadControlFile[];
}
export interface TaskCompletedArgs {
  task: AnalysisTask;
  files: string[];
}
