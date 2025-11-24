import { CommonModule, KeyValue } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { SyatemMainMapNavigation } from './system-main-map-navigation.model';

@Component({
  selector: 'ias-system-main-map-navigation',
  imports: [CommonModule],
  templateUrl: './system-main-map-navigation.component.html',
  styleUrl: './system-main-map-navigation.component.less',
})
export class SystemMainMapNavigationComponent {
  @Input() index = SyatemMainMapNavigation.main;
  @Output() indexChange = new EventEmitter<SyatemMainMapNavigation>();

  constructor() {}

  items: KeyValue<SyatemMainMapNavigation, string>[] = [
    { key: SyatemMainMapNavigation.main, value: '平台总览' },
    { key: SyatemMainMapNavigation.shop, value: '分析商铺' },
    { key: SyatemMainMapNavigation.realtime, value: '实时事件' },
    { key: SyatemMainMapNavigation.gpstask, value: '定制场景' },
    { key: SyatemMainMapNavigation.heatmap, value: '事件热力' },
  ];

  on = {
    select: (index: SyatemMainMapNavigation) => {
      this.index = index;
      this.indexChange.emit(this.index);
    },
  };
}
