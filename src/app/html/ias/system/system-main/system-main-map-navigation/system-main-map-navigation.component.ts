import { CommonModule, KeyValue } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { GlobalStorage } from '../../../../../common/storage/global.storage';
import { wait } from '../../../../../common/tools/wait';
import { SyatemMainMapNavigation } from './system-main-map-navigation.model';

@Component({
  selector: 'ias-system-main-map-navigation',
  imports: [CommonModule],
  templateUrl: './system-main-map-navigation.component.html',
  styleUrl: './system-main-map-navigation.component.less',
})
export class SystemMainMapNavigationComponent implements OnInit {
  @Input() index = SyatemMainMapNavigation.main;
  @Output() indexChange = new EventEmitter<SyatemMainMapNavigation>();

  constructor(private global: GlobalStorage) {}

  items: KeyValue<SyatemMainMapNavigation, string>[] = [];

  private init() {
    let main = { key: SyatemMainMapNavigation.main, value: '平台总览' };
    let shop = { key: SyatemMainMapNavigation.shop, value: '分析商铺' };
    let realtime = { key: SyatemMainMapNavigation.realtime, value: '实时事件' };
    let gpstask = { key: SyatemMainMapNavigation.gpstask, value: '定制场景' };
    let roadobject = {
      key: SyatemMainMapNavigation.roadobject,
      value: '道路物件',
    };
    let heatmap = { key: SyatemMainMapNavigation.heatmap, value: '事件热力' };

    this.items.push(main);
    if (this.global.display.map.shop) {
      this.items.push(shop);
    }
    if (this.global.display.map.roadobject) {
      this.items.push(realtime);
    }
    if (this.global.display.map.gpstask) {
      this.items.push(gpstask);
    }
    if (this.global.display.map.roadobject) {
      // this.items.push(roadobject);
    }
    this.items.push(heatmap);
  }

  ngOnInit(): void {
    wait(() => {
      return !this.global.display.loading;
    }).then(() => {
      this.init();
    });
  }

  on = {
    select: (index: SyatemMainMapNavigation) => {
      this.index = index;
      this.indexChange.emit(this.index);
    },
  };
}
