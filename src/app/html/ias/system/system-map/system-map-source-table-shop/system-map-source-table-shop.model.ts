import { ShopObjectState } from '../../../../../common/data-core/enums/analysis/shop-object-state.enum';
import { IShop } from '../../../../../common/data-core/models/arm/analysis/shop.interface';
import { GisPoints } from '../../../../../common/data-core/models/arm/gis-point.model';
import { RoadViewModel } from '../../../../../common/view-models/road/road.view-model';

export class SystemMapSourceTableShopItem implements IShop {
  Id!: string;
  Name!: string;
  BranchName?: string;
  Address?: string;
  ObjectState!: ShopObjectState;
  Telphone?: string;
  ShopType?: number;
  Location?: GisPoints;
  ImageUrl?: string;
  CreationTime!: Date;
  UpdateTime!: Date;
  Nature?: number;
  Classification?: number;
  GroupId?: number;
  Description?: string;
  StreetId?: string;
  StreetName?: string;
  GridCellId?: string;
  GridCellName?: string;
  UscId?: string;
  UnitName?: string;
  CarrierType?: string;
  CarrierName?: string;
  UnitType?: string;
  BusinessAddress?: string;
  RegisteredAddress?: string;
  Industry?: string;
  PersonInCharge?: string;
  Contract?: string;
  ContractDetails?: string;
  EmployeeNumber?: number;
  BusinessScope?: string;
  ShopSide?: number;
  Course?: number;
  RoadId?: string;
  RoadName?: string;
  RoadOrderNo?: number;

  OriRoadName?: string;

  index = 0;
  Road?: RoadViewModel;
  from = SystemMapSourceTableShopFrom.none;
  ObjectStateName?: string;
}

export enum SystemMapSourceTableShopFrom {
  none,
  task,
  registration,
}
