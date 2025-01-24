import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TextSpaceBetweenDirective } from '../../../../common/directives/text-space-between/text-space-between.directive';
import {
  SystemMapShopDistanceArgs,
  SystemMapShopFilterArgs,
} from '../system-map/system-map.model';
import { SystemMapFilterSourceController } from './controller/system-map-filter-source.controller';

@Component({
  selector: 'ias-system-map-filter',
  imports: [CommonModule, FormsModule, TextSpaceBetweenDirective],
  templateUrl: './system-map-filter.component.html',
  styleUrl: './system-map-filter.component.less',
  providers: [SystemMapFilterSourceController],
})
export class SystemMapFilterComponent implements OnInit, OnDestroy {
  @Input() filter = new SystemMapShopFilterArgs();
  @Output() filterChange = new EventEmitter<SystemMapShopFilterArgs>();

  @Input() distance = new SystemMapShopDistanceArgs();
  @Output() distanceChange = new EventEmitter<SystemMapShopDistanceArgs>();

  @Output() close = new EventEmitter<void>();

  @Output() search = new EventEmitter<SystemMapShopFilterArgs>();

  @Output() mapdistance = new EventEmitter<void>();

  constructor(public source: SystemMapFilterSourceController) {}

  handle: any;

  ngOnInit(): void {
    this.handle = this.onenter.bind(this);
    window.addEventListener('keypress', this.handle);
  }
  ngOnDestroy(): void {
    if (this.handle) {
      window.removeEventListener('keypress', this.handle);
      this.handle = undefined;
    }
  }

  onenter(e: KeyboardEvent) {
    if (e.key === 'Enter') {
      this.onsearch();
    }
  }

  onsearch() {
    this.search.emit(this.filter);
  }
  onclose() {
    this.close.emit();
  }

  onmapmapdistance() {
    this.mapdistance.emit();
  }
  onreset() {
    this.filter.clear();
    this.distance.enabled = false;
  }
}
