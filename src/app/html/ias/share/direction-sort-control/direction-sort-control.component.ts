import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import {
  GeoDirectionSort,
  GeoLatitudeDirection,
  GeoLongitudeDirection,
} from '../../../../common/tools/geo-tool/geo.model';

@Component({
  selector: 'ias-direction-sort-control',
  imports: [CommonModule],
  templateUrl: './direction-sort-control.component.html',
  styleUrl: './direction-sort-control.component.less',
})
export class DirectionSortControlComponent implements OnInit, OnDestroy {
  @Input() sort = new GeoDirectionSort();
  @Output() sortChange = new EventEmitter<GeoDirectionSort>();
  @Input() direction: 'top' | 'down' = 'top';

  constructor() {}

  Longitude = GeoLongitudeDirection;
  Latitude = GeoLatitudeDirection;
  opened = false;
  private handle?: (e: Event) => void;

  ngOnInit(): void {
    this.handle = this.close.bind(this);

    document.addEventListener('click', this.handle);
  }

  ngOnDestroy(): void {
    if (this.handle) {
      document.removeEventListener('click', this.handle);
      this.handle = undefined;
    }
  }

  onlat(e: Event) {
    if (this.sort.lat === GeoLatitudeDirection.north2south) {
      this.sort.lat = GeoLatitudeDirection.south2north;
    } else {
      this.sort.lat = GeoLatitudeDirection.north2south;
    }
    this.sortChange.emit(this.sort);
    e.stopImmediatePropagation();
  }
  onlon(e: Event) {
    if (this.sort.lon === GeoLongitudeDirection.east2west) {
      this.sort.lon = GeoLongitudeDirection.west2east;
    } else {
      this.sort.lon = GeoLongitudeDirection.east2west;
    }
    this.sortChange.emit(this.sort);
    e.stopImmediatePropagation();
  }

  onopen(e: Event) {
    this.opened = !this.opened;
    e.stopImmediatePropagation();
  }

  close() {
    this.opened = false;
  }
  oncontentclick(e: Event) {
    e.stopImmediatePropagation();
  }
}
