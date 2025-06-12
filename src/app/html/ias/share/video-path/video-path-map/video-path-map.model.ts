import { FileGpsItem } from '../../../../../common/data-core/models/arm/file/file-gps-item.model';

export interface IVideoPathMapBusiness {
  load(...args: any[]): Promise<FileGpsItem[]>;
}
