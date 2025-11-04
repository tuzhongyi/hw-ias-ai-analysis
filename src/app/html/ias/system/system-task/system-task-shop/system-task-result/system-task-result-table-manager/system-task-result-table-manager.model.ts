import { Road } from '../../../../../../../common/data-core/models/arm/geographic/road.model';

export enum SystemTaskResultTableType {
  shop,
  sign,
}

export class SystemTaskResultTableArgs {
  name: string = '';
  road: Road[] = [];
}
