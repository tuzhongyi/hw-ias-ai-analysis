import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { RoadObjectEventType } from '../../../../../../common/data-core/enums/road/road-object/road-object-event-type.enum';
import { RoadObjectEventRecord } from '../../../../../../common/data-core/models/arm/geographic/road-object-event-record.model';
import { ColorTool } from '../../../../../../common/tools/color/color.tool';
import { ObjectTool } from '../../../../../../common/tools/object-tool/object.tool';

@Component({
  selector: 'ias-system-statistic-road-object-map-marker',
  imports: [],
  templateUrl: './system-statistic-road-object-map-marker.component.html',
  styleUrl: './system-statistic-road-object-map-marker.component.less',
})
export class SystemStatisticRoadObjectMapMarkerComponent implements OnInit {
  @Input() data?: RoadObjectEventRecord;
  @Input() selected = false;

  constructor() {}

  ngOnInit(): void {
    if (this.data) {
      this.color.load(this.data);
      this.icon.load(this.data);
    }
  }

  @ViewChild('container', { static: true })
  container!: ElementRef<HTMLDivElement>;

  get size() {
    return this.selected ? 40 : 32;
  }
  get half() {
    return this.size / 2;
  }

  icon = {
    svg: '',
    load: (data: RoadObjectEventRecord) => {
      let icon = ObjectTool.model.RoadObjectEventRecord.get.icon.inner(
        data.RoadObjectType
      );
      this.icon.svg = `<svg viewBox="0 0 24 24" style="        
        width:${this.icon.size()}px;height:${this.icon.size()}px;
        color:${this.color.value};filter:drop-shadow(0 0 3px ${
        this.color.value
      }66);
      ">${icon}</svg>`;

      this.container.nativeElement.insertAdjacentHTML(
        'beforeend',
        this.icon.svg
      );
    },
    size: () => {
      return this.size * 0.45;
    },
    offset: () => {
      return (this.size - this.icon.size()) / 2;
    },
  };

  color = {
    value: '',
    background: '',
    load: (data: RoadObjectEventRecord) => {
      switch (data.EventType) {
        case RoadObjectEventType.Inspection:
          this.color.value = ColorTool.green;
          break;
        case RoadObjectEventType.Breakage:
          this.color.value = ColorTool.orange;
          break;
        case RoadObjectEventType.Disappear:
          this.color.value = ColorTool.red;
          break;

        default:
          this.color.value = '';
          break;
      }

      if (this.selected) {
        this.color.background = `linear-gradient(135deg,${
          this.color.value + '55'
        },${this.color.value + '22'})`;
      } else {
        this.color.background = `linear-gradient(135deg,rgba(3,7,18,0.5),rgba(3,7,18,0.7))`;
      }
    },
  };
}
