import { Injectable } from '@angular/core';
import { ShopRegistration } from '../../../../../../common/data-core/models/arm/analysis/shop-registration.model';
import { Shop } from '../../../../../../common/data-core/models/arm/analysis/shop.model';
import { ArmAnalysisRequestService } from '../../../../../../common/data-core/requests/services/analysis/analysis.service';
import { GetAnalysisTaskListParams } from '../../../../../../common/data-core/requests/services/analysis/server/analysis-server.params';
import { ArmGeographicRequestService } from '../../../../../../common/data-core/requests/services/geographic/geographic.service';
import { MediumRequestService } from '../../../../../../common/data-core/requests/services/medium/medium.service';
import { Guid } from '../../../../../../common/tools/guid/guid';

@Injectable()
export class SystemModuleShopCompareManagerBusiness {
  constructor(
    private service: ArmGeographicRequestService,
    private analysis: ArmAnalysisRequestService,
    private medium: MediumRequestService
  ) {}
  async create(shop: ShopRegistration) {
    return this.service.shop.create(shop);
  }
  update(shop: Shop) {
    return this.service.shop.update(shop);
  }

  private _count = 0;
  get count() {
    return new Promise<number>((resolve) => {
      if (this._count) {
        resolve(this._count);
        return;
      }
      let params = new GetAnalysisTaskListParams();
      params.PageIndex = 1;
      params.PageSize = 1;
      params.TaskStates = [2];
      params.TaskTypes = [101];
      return this.analysis.server.task.list(params).then((x) => {
        this._count = x.Page.TotalRecordCount;
        resolve(this._count);
      });
    });
  }

  convert = {
    shop: async (shop: Shop) => {
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
      if (shop.ImageUrl) {
        data.ImageUrl = await this.convert.image(shop.ImageUrl);
      }
      return data;
    },
    image: async (id: string) => {
      return this.medium.copy(id);
    },
  };
}
