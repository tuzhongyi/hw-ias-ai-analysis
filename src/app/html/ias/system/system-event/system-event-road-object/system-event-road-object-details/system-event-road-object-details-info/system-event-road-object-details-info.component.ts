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
  @Input() resourceindex = 1;

  constructor(
    private _language: LanguageTool,
    private division: ArmDivisionRequestService
  ) {}
  resource?: EventResourceContent;
  language = {
    event: '',
    type: '',
    division: '',
    gridcell: '',
  };

  Language = Language;

  ngOnChanges(changes: SimpleChanges): void {
    this.change.data(changes['data']);
    this.change.resource.index(changes['resourceindex']);
  }

  private change = {
    data: (change: SimpleChange) => {
      if (change) {
        if (this.data) {
          if (this.data.Resources && this.data.Resources.length > 0) {
            this.resource = this.data.Resources[this.resourceindex - 1];
          }
          this.init(this.data);
        }
      }
    },
    resource: {
      index: (simple: SimpleChange) => {
        if (simple && !simple.firstChange) {
          if (
            this.data &&
            this.data.Resources &&
            this.data.Resources.length > 0
          ) {
            this.resource = this.data.Resources[simple.currentValue - 1];
          }
        }
      },
    },
  };

  private async init(data: RoadObjectEventRecord) {
    this._language.road.object.EventTypes(data.EventType).then((x) => {
      this.language.event = x;
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
