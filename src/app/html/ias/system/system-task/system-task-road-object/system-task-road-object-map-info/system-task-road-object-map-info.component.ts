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
import { RoadObject } from '../../../../../../common/data-core/models/arm/geographic/road-object.model';
import { RoadPoint } from '../../../../../../common/data-core/models/arm/geographic/road-point.model';
import { RoadSection } from '../../../../../../common/data-core/models/arm/geographic/road-section.model';
import { Size } from '../../../../../../common/data-core/models/arm/size.model';
import { wait } from '../../../../../../common/tools/wait';
import { SystemTaskRoadObjectMapInfoBusiness } from './system-task-road-object-map-info.business';
import { SystemTaskRoadObjectMapInfo } from './system-task-road-object-map-info.model';

@Component({
  selector: 'ias-system-task-road-object-map-info',
  imports: [CommonModule],
  templateUrl: './system-task-road-object-map-info.component.html',
  styleUrl: './system-task-road-object-map-info.component.less',
  providers: [SystemTaskRoadObjectMapInfoBusiness],
})
export class SystemTaskRoadObjectMapInfoComponent implements OnInit {
  @Input() data?: RoadObject | RoadPoint | RoadSection;
  @Output() size = new EventEmitter<Size>();

  constructor(private business: SystemTaskRoadObjectMapInfoBusiness) {}

  model = new SystemTaskRoadObjectMapInfo();
  loaded = false;

  @ViewChild('info') set info(value: ElementRef<HTMLDivElement>) {
    if (value) {
      wait(() => {
        return (
          value.nativeElement.clientWidth > 0 &&
          value.nativeElement.clientHeight > 0 &&
          this.loaded
        );
      }).then(() => {
        this.size.emit({
          Width: value.nativeElement.clientWidth,
          Height: value.nativeElement.clientHeight,
        });
      });
    }
  }

  ngOnInit(): void {
    if (this.data) {
      this.business
        .load(this.data)
        .then((x) => {
          this.model = x;
        })
        .finally(() => {
          this.loaded = true;
        });
    }
  }
}
