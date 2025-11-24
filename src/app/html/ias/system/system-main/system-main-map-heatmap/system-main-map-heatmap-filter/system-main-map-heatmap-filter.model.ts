import { EnumNameValue } from '../../../../../../common/data-core/models/capabilities/enum-name-value.model';
import { SystemEventTableArgs } from '../../../system-event/system-event-table/business/system-event-table.model';

export interface IHeatmapFilterSource {
  type: Promise<EnumNameValue<number>[]>;
}
export interface IHeatmapFilter {
  source?: IHeatmapFilterSource;
  args: SystemEventTableArgs;
}
