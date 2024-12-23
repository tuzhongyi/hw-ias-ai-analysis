import { IIdNameModel } from '../../../../data-core/models/model.interface'

export interface MultiSelectControlEvent {
  select(items: IIdNameModel[]): void
}
