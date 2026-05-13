import { Component, Input, OnInit } from '@angular/core';
import { RoadObjectStatement } from '../../../../../../common/data-core/models/arm/geographic/road-object-statement.model';
import { IntNumber } from '../../../../../../common/data-core/models/arm/int-number.model';
import { EnumNameValue } from '../../../../../../common/data-core/models/capabilities/enum-name-value.model';
import { IconTool } from '../../../../../../common/tools/icon-tool/icon.tool';

@Component({
  selector: 'ias-system-statistic-road-object-statement-3-item',
  imports: [],
  templateUrl: './system-statistic-road-object-statement-3-item.component.html',
  styleUrl: './system-statistic-road-object-statement-3-item.component.less',
})
export class SystemStatisticRoadObjectStatement3ItemComponent
  implements OnInit
{
  @Input() statement?: RoadObjectStatement;
  @Input() type?: EnumNameValue<number>;

  constructor() {}

  model = new RoadObjectModel();

  ngOnInit(): void {
    if (this.statement && this.type) {
      this.load(this.statement, this.type.Value, this.type.Name);
    }
  }

  private load(data: RoadObjectStatement, type: number, name: string) {
    this.model.name = name;
    this.model.icon = IconTool.RoadObjectType(type);

    let objecttypenumber = data.ObjectTypeNumbers.find(
      (x) => x.Value == type
    ) as IntNumber;
    this.model.count = objecttypenumber.Number;
    this.model.ratio =
      data.TotalNumber > 0 ? (this.model.count / data.TotalNumber) * 100 : 0;
    this.model.ratio = Math.round(this.model.ratio);
  }
}
class RoadObjectModel {
  icon = '';
  name = '';
  count = 0;
  ratio = 0;
}
