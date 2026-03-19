import { CommonModule } from '@angular/common';
import {
  Component,
  Input,
  OnChanges,
  SimpleChange,
  SimpleChanges,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { EventResourceContent } from '../../../../../../../common/data-core/models/arm/event/event-resource-content.model';
import { RoadObjectEventRecord } from '../../../../../../../common/data-core/models/arm/geographic/road-object-event-record.model';
import { ArmDivisionRequestService } from '../../../../../../../common/data-core/requests/services/division/division.service';
import { TextSpaceBetweenDirective } from '../../../../../../../common/directives/text-space-between/text-space-between.directive';
import { ColorTool } from '../../../../../../../common/tools/color/color.tool';
import { Language } from '../../../../../../../common/tools/language-tool/language';
import { LanguageTool } from '../../../../../../../common/tools/language-tool/language.tool';

@Component({
  selector: 'ias-system-event-road-object-details-info',
  imports: [CommonModule, FormsModule, TextSpaceBetweenDirective],
  templateUrl: './system-event-road-object-details-info.component.html',
  styleUrl: './system-event-road-object-details-info.component.less',
})
export class SystemEventRoadObjectDetailsInfoComponent implements OnChanges {
  @Input() data = new RoadObjectEventRecord();
  @Input() resource?: EventResourceContent;

  constructor(
    private _language: LanguageTool,
    private division: ArmDivisionRequestService
  ) {}

  language = {
    event: '',
    type: '',
    division: '',
    gridcell: '',
  };

  Language = Language;
  Color = ColorTool;

  ngOnChanges(changes: SimpleChanges): void {
    this.change.data(changes['data']);
  }

  private change = {
    data: (change: SimpleChange) => {
      if (change) {
        if (this.data) {
          this.init(this.data);
        }
      }
    },
  };

  private async init(data: RoadObjectEventRecord) {
    this._language.road.object.EventTypes(data.EventType).then((x) => {
      this.language.event = x;
    });
    this._language.road.object.ObjectTypes(data.RoadObjectType).then((x) => {
      this.language.type = x;
    });
    if (data.DivisionId) {
      this.division.cache.get(data.DivisionId).then((x) => {
        this.language.division = x.Name;
      });
    }
    if (data.GridCellId) {
      this.division.cache.get(data.GridCellId).then((x) => {
        this.language.gridcell = x.Name;
      });
    }
  }
}
