import { Exclude } from 'class-transformer';
import { ShopObjectState } from '../../../../common/data-core/enums/analysis/shop-object-state.enum';
import { DateTimeTool } from '../../../../common/tools/date-time-tool/datetime.tool';
import { Duration } from '../../../../common/tools/date-time-tool/duration.model';
import { ShopViewModel } from '../../../../common/view-models/shop/shop.view-model';

export class SystemModuleShopTableLoadArgs {
  constructor(args: SystemModuleShopTableArgs, reset = false) {
    this.args = args;
    this.reset = reset;
  }
  reset: boolean;
  args: SystemModuleShopTableArgs;
}

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
  type?: number;
}
export class SystemModuleShopTableFilter extends SystemModuleShopTableArgs {
  asc?: string;
  desc?: string;

  load(args: SystemModuleShopTableArgs) {
    this.marking = args.marking;
    this.telphone = args.telphone;
    this.name = args.name;
    this.confidence = args.confidence;
    this.duration = args.duration;
    this.states = args.states;
    this.type = args.type;
  }
}

export class SystemModuleShopTableItem extends ShopViewModel {
  @Exclude()
  Image?: string;
  @Exclude()
  index?: number;
  @Exclude()
  hasdata = false;

  static create() {
    let model = new SystemModuleShopTableItem();
    model.Name = '';
    model.Telphone = '';
    model.Address = '';
    return model;
  }
}
