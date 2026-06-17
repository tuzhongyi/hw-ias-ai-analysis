import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ContainerPageComponent } from '../../../../../../../common/components/container-page/container-page.component';
import { RoadObjectEventType } from '../../../../../../../common/data-core/enums/road/road-object/road-object-event-type.enum';
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
export class SystemStatisticRoadObjectMapInfoDetailsComponent implements OnInit {
  @Input() datas: RoadObjectEventRecord[] = [];
  @Output() close = new EventEmitter<void>();
  @Output() details = new EventEmitter<RoadObjectEventRecord>();

  constructor(
    private language: LanguageTool,
    private medium: MediumRequestService,
  ) {}

  ObjectTool = ObjectTool;
  color = '';
  icon = '';

  resource?: EventResourceContent;
  current?: RoadObjectEventRecord;

  name = {
    event: '',
    type: '',
  };

  ngOnInit(): void {
    if (this.datas.length > 0) {
      // 优先度：Breakage > 最近 EventTime
      this.current =
        this.datas.find(
          (x) => x.EventType === RoadObjectEventType.Breakage,
        ) ??
        this.datas.reduce((latest, item) =>
          item.EventTime > latest.EventTime ? item : latest,
        );
      this.load.all(this.current);
    } else {
      this.current = undefined;
      this.color = '';
    }
  }

  private load = {
    all: (data: RoadObjectEventRecord) => {
      this.color = ObjectTool.model.RoadObjectEventRecord.get.color.name.event(
        data.EventType,
      );

      this.load.icon(data);
      this.language.road.object.EventTypes(data.EventType).then((x) => {
        this.name.event = x;
      });
      this.language.road.object.ObjectTypes(data.RoadObjectType).then((x) => {
        this.name.type = x;
      });

      this.picture.load(data);
    },
    icon: async (data: RoadObjectEventRecord) => {
      this.icon = IconTool.RoadObjectType(data.RoadObjectType);
    },
  };

  on = {
    page: (data: RoadObjectEventRecord) => {
      this.current = data;
      this.color = ObjectTool.model.RoadObjectEventRecord.get.color.name.event(
        data.EventType,
      );
    },
    close: () => {
      this.close.emit();
    },
    details: () => {
      this.details.emit(this.current);
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
        this.current &&
        this.current.Resources &&
        this.current.Resources.length >= page.PageIndex
      ) {
        let index = page.PageIndex - 1;
        let resource = this.current.Resources[index];
        if (resource.ImageUrl) {
          this.picture.url = this.medium.picture(resource.ImageUrl);
        }
      }
    },
  };
}
