import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonLabelSelecComponent } from '../../../../common/components/common-label-select/common-label-select.component';
import { SelectShopObjectStateComponent } from '../../share/select/select-shop-object-state/select-shop-object-state.component';
import { SystemMapShopFilterArgs } from '../system-map/system-map.model';
import { SystemMapFilterSourceStateController } from './controller/system-map-filter-source-state.controller.ts';
import { SystemMapFilterSourceController } from './controller/system-map-filter-source.controller';

@Component({
  selector: 'ias-system-map-filter',
  imports: [
    CommonModule,
    FormsModule,
    CommonLabelSelecComponent,
    SelectShopObjectStateComponent,
  ],
  templateUrl: './system-map-filter.component.html',
  styleUrl: './system-map-filter.component.less',
  providers: [
    SystemMapFilterSourceStateController,
    SystemMapFilterSourceController,
  ],
})
export class SystemMapFilterComponent implements OnInit {
  @Input() args = new SystemMapShopFilterArgs();
  @Output() argsChange = new EventEmitter<SystemMapShopFilterArgs>();

  @Output() search = new EventEmitter<SystemMapShopFilterArgs>();

  constructor(public source: SystemMapFilterSourceController) {}

  handle: any;

  ngOnInit(): void {
    this.handle = this.onenter.bind(this);
    window.addEventListener('keypress', this.handle);
    this.source.state.select.subscribe((x) => {
      this.args.states = x;
    });
  }

  onenter(e: KeyboardEvent) {
    if (e.key === 'Enter') {
      this.onsearch();
    }
  }

  onsearch() {
    this.search.emit(this.args);
  }
}
