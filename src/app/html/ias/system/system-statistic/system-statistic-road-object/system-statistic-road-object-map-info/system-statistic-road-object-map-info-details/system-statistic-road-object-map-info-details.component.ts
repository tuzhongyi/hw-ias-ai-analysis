import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ContainerPageComponent } from '../../../../../../../common/components/container-page/container-page.component';
import { EventResourceContent } from '../../../../../../../common/data-core/models/arm/event/event-resource-content.model';
import { RoadObjectEventRecord } from '../../../../../../../common/data-core/models/arm/geographic/road-object-event-record.model';
import { Page } from '../../../../../../../common/data-core/models/interface/page-list.model';
import { MediumRequestService } from '../../../../../../../common/data-core/requests/services/medium/medium.service';
import { IconTool } from '../../../../../../../common/tools/icon-tool/icon.tool';
import { LanguageTool } from '../../../../../../../common/tools/language-tool/language.tool';
import { ObjectTool } from '../../../../../../../common/tools/object-tool/object.tool';

@Component({
  selector: 'ias-system-statistic-road-object-map-info-details',
  imports: [CommonModule, ContainerPageComponent],
  templateUrl: './system-statistic-road-object-map-info-details.component.html',
  styleUrl: './system-statistic-road-object-map-info-details.component.less',
})
export class SystemStatisticRoadObjectMapInfoDetailsComponent
  implements OnInit
{
  @Input() data?: RoadObjectEventRecord;
  @Output() close = new EventEmitter<void>();
  @Output() details = new EventEmitter<RoadObjectEventRecord>();

  constructor(
    private language: LanguageTool,
    private medium: MediumRequestService
  ) {}

  color = '';
  icon = '';

  resource?: EventResourceContent;

  name = {
    event: '',
    type: '',
  };

  ngOnInit(): void {
    if (this.data) {
      this.color = ObjectTool.model.RoadObjectEventRecord.get.color.event(
        this.data.EventType
      );

      this.load.icon(this.data);
      this.language.road.object.EventTypes(this.data.EventType).then((x) => {
        this.name.event = x;
      });
      this.language.road.object
        .ObjectTypes(this.data.RoadObjectType)
        .then((x) => {
          this.name.type = x;
        });

      this.picture.load(this.data);
    } else {
      this.color = '';
    }
  }

  private load = {
    icon: async (data: RoadObjectEventRecord) => {
      this.icon = IconTool.RoadObjectType(data.RoadObjectType);
    },
  };

  on = {
    close: () => {
      this.close.emit();
    },
    details: () => {
      this.details.emit(this.data);
    },
  };

  picture = {
    url: '',

    page: Page.create(1),
    load: (data: RoadObjectEventRecord) => {
      if (data.Resources && data.Resources.length > 0) {
        this.picture.page = Page.create(1, 1, data.Resources.length);
        let resource = data.Resources[0];
        if (resource.ImageUrl) {
          this.picture.url = this.medium.picture(resource.ImageUrl);
        }
      }
    },
    change: (page: Page) => {
      this.picture.page = page;
      if (
        this.data &&
        this.data.Resources &&
        this.data.Resources.length >= page.PageIndex
      ) {
        let index = page.PageIndex - 1;
        let resource = this.data.Resources[index];
        if (resource.ImageUrl) {
          this.picture.url = this.medium.picture(resource.ImageUrl);
        }
      }
    },
  };
}
