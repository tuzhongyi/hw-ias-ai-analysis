import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChange,
  SimpleChanges,
} from '@angular/core';
import { RoadObjectState } from '../../../../../common/data-core/enums/road/road-object/road-object-state.enum';
import { RoadObject } from '../../../../../common/data-core/models/arm/geographic/road-object.model';
import { ArmDivisionRequestService } from '../../../../../common/data-core/requests/services/division/division.service';
import { Language } from '../../../../../common/tools/language-tool/language';
import { LanguageTool } from '../../../../../common/tools/language-tool/language.tool';
import { PictureComponent } from '../../../share/picture/component/picture.component';

@Component({
  selector: 'ias-system-map-panel-details-road-object',
  imports: [CommonModule, PictureComponent],
  templateUrl: './system-map-panel-details-road-object.component.html',
  styleUrl: './system-map-panel-details-road-object.component.less',
})
export class SystemMapPanelDetailsRoadObjectComponent implements OnChanges {
  @Input() data?: RoadObject;
  @Output() close = new EventEmitter<void>();
  @Output() picture = new EventEmitter<RoadObject>();

  constructor(
    private language: LanguageTool,
    private division: ArmDivisionRequestService
  ) {}

  State = RoadObjectState;
  Language = Language;

  name = {
    state: '',
    type: '',
    division: '',
    gridcell: '',
  };

  private change = {
    data: (change: SimpleChange) => {
      if (change) {
        if (this.data) {
          this.language.road.object
            .ObjectTypes(this.data.ObjectType)
            .then((x) => {
              this.name.type = x;
            });
          this.language.road.object
            .ObjectStates(this.data.ObjectState)
            .then((x) => {
              this.name.state = x;
            });
          if (this.data.DivisionId) {
            this.division.cache.get(this.data.DivisionId).then((x) => {
              this.name.division = x.Name;
            });
          } else {
            this.name.division = '';
          }
          if (this.data.GridCellId) {
            this.division.cache.get(this.data.GridCellId).then((x) => {
              this.name.gridcell = x.Name;
            });
          } else {
            this.name.gridcell = '';
          }
        }
      }
    },
  };

  ngOnChanges(changes: SimpleChanges): void {
    this.change.data(changes['data']);
  }

  load(data: RoadObject) {}

  onclose() {
    this.close.emit();
  }
  onpicture() {
    this.picture.emit(this.data);
  }
}
