import { CommonModule } from '@angular/common';
import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { RoadObjectEventRecord } from '../../../../../../common/data-core/models/arm/geographic/road-object-event-record.model';
import { LanguageTool } from '../../../../../../common/tools/language-tool/language.tool';
import { ObjectTool } from '../../../../../../common/tools/object-tool/object.tool';
import { wait } from '../../../../../../common/tools/wait';

@Component({
  selector: 'ias-system-statistic-road-object-map-info',
  imports: [CommonModule],
  templateUrl: './system-statistic-road-object-map-info.component.html',
  styleUrl: './system-statistic-road-object-map-info.component.less',
})
export class SystemStatisticRoadObjectMapInfoComponent implements OnInit {
  @Input() data?: RoadObjectEventRecord;
  @Output() close = new EventEmitter<void>();
  @Output() details = new EventEmitter<RoadObjectEventRecord>();
  constructor(private language: LanguageTool) {}

  color = '#fff';

  @ViewChild('icon') icon?: ElementRef<HTMLDivElement>;

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
    } else {
      this.color = '#fff';
    }
  }

  private load = {
    icon: async (data: RoadObjectEventRecord) => {
      await wait(() => {
        return !!this.icon;
      });

      if (this.icon) {
        let icon = `${ObjectTool.model.RoadObjectEventRecord.get.icon.load(
          data,
          15
        )}`;
        this.icon.nativeElement.insertAdjacentHTML('beforeend', icon);
      }
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
}
