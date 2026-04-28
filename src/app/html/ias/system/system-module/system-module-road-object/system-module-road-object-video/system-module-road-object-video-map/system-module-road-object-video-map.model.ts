import { FileGpsItem } from '../../../../../../../common/data-core/models/arm/file/file-gps-item.model';

export interface FileGpsItemPercent {
  start: FileGpsItem;
  end: FileGpsItem;
  percent: number;
}
