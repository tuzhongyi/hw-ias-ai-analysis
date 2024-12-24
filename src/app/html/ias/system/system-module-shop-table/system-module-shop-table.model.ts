import { Exclude } from 'class-transformer';
import { ShopObjectState } from '../../../../common/data-core/enums/analysis/shop-object-state.enum';
import { Shop } from '../../../../common/data-core/models/arm/analysis/shop.model';
import { DateTimeTool } from '../../../../common/tools/date-time-tool/datetime.tool';
import { Duration } from '../../../../common/tools/date-time-tool/duration.model';

export class SystemModuleShopTableArgs {
  constructor(duration = DateTimeTool.all.year(new Date())) {
    this.duration = duration;
  }
  marking?: boolean;
  telphone?: string;
  name?: string;
  confidence?: number;
  duration: Duration;
  states: ShopObjectState[] = [];
}
export class SystemModuleShopTableFilter extends SystemModuleShopTableArgs {
  asc?: string;
  desc?: string;
}

export class ShopModel extends Shop {
  @Exclude()
  Image?: string;
  @Exclude()
  ConfidenceRatio?: string;
  @Exclude()
  State!: string;
  @Exclude()
  index?: number;
  @Exclude()
  hasdata = false;

  static create() {
    let model = new ShopModel();
    model.Name = '';
    model.Telphone = '';
    model.Address = '';
    return model;
  }
}
