import { ShopRegistration } from '../../data-core/models/arm/analysis/shop-registration.model';
import { Shop } from '../../data-core/models/arm/analysis/shop.model';
import { Guid } from '../guid/guid';

export class ConvertShopTool {
  registration(shop: Shop) {
    let data = new ShopRegistration();
    data.Id = Guid.NewGuid().ToString('N');
    data.Address = shop.Address;
    data.BranchName = shop.BranchName;
    data.BusinessAddress = shop.BusinessAddress;
    data.BusinessScope = shop.BusinessScope;
    data.CarrierName = shop.CarrierName;
    data.CarrierType = shop.CarrierType;
    data.Classification = shop.Classification;
    data.Contract = shop.Contract;
    data.ContractDetails = shop.ContractDetails;
    data.Course = shop.Course;
    data.CreationTime = new Date();
    data.Description = shop.Description;
    data.EmployeeNumber = shop.EmployeeNumber;
    data.GridCellId = shop.GridCellId;
    data.GridCellName = shop.GridCellName;
    data.GroupId = shop.GroupId;

    data.Industry = shop.Industry;
    data.Location = shop.Location;
    data.Name = shop.Name;
    data.Nature = shop.Nature;
    data.ObjectState = shop.ObjectState;
    data.PersonInCharge = shop.PersonInCharge;
    data.RegisteredAddress = shop.RegisteredAddress;
    data.RoadId = shop.RoadId;
    data.RoadName = shop.RoadName;
    data.RoadOrderNo = shop.RoadOrderNo;
    data.ShopSide = shop.ShopSide;
    data.ShopType = shop.ShopType;
    data.StreetId = shop.StreetId;
    data.StreetName = shop.StreetName;
    data.Telphone = shop.Telphone;
    data.UnitName = shop.UnitName;
    data.UnitType = shop.UnitType;
    data.UpdateTime = new Date();
    data.UscId = shop.UscId;
    data.BusinessState = shop.BusinessState;
    data.ImageUrl = shop.ImageUrl;
    return data;
  }
}
