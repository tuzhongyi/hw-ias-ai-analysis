import { IModel } from '../../model.interface';

export class RoadAddress implements IModel {
  FormattedAddress!: string;
  Country!: string;
  Province!: string;
  District!: string;
  Town!: string;
  Street!: string;
}
