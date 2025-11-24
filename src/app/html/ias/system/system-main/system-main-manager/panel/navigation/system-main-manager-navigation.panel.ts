import {
  EventMode,
  SyatemMainMapNavigation,
} from '../../../system-main-map-navigation/system-main-map-navigation.model';
import { SystemMainManagerComponent } from '../../system-main-manager.component';

export class SystemMainManagerPanelNavigation {
  index = SyatemMainMapNavigation.main;
  constructor(private that: SystemMainManagerComponent) {
    this.change(SyatemMainMapNavigation.main);
  }

  private get card() {
    return this.that.card;
  }

  private get map() {
    return this.that.map;
  }

  change(index: SyatemMainMapNavigation, first = false) {
    if (index === this.index && !first) return;
    this.display.card(index);
    this.display.map(index);
    this.index = index;
  }

  private display = {
    card: (index: SyatemMainMapNavigation) => {
      switch (index) {
        case SyatemMainMapNavigation.main:
          this.card.statistic.table.modeable = true;
          this.card.statistic.number.show = true;
          this.card.statistic.pie.show = true;
          this.card.device.state.show = false;
          this.card.device.route.show = false;
          this.card.shop.statistic.show = true;
          this.card.shop.pie.show = false;
          this.card.shop.line.show = false;
          this.card.shop.task.show = true;
          this.card.realtime.line.show = true;
          this.card.realtime.pie.show = false;
          this.card.realtime.table.show = false;
          this.card.gpstask.line.show = false;
          break;
        case SyatemMainMapNavigation.shop:
          this.card.statistic.table.mode = EventMode.shop;
          this.card.statistic.table.modeable = false;
          this.card.statistic.number.show = true;
          this.card.statistic.pie.show = false;
          this.card.device.state.show = false;
          this.card.device.route.show = false;
          this.card.shop.statistic.show = true;
          this.card.shop.task.show = true;
          this.card.shop.table.show = true;
          this.card.shop.pie.show = true;
          this.card.shop.line.show = true;
          this.card.realtime.line.show = false;
          this.card.realtime.pie.show = false;
          this.card.realtime.table.show = false;
          this.card.gpstask.line.show = false;
          break;
        case SyatemMainMapNavigation.realtime:
          this.card.statistic.table.mode = EventMode.realtime;
          this.card.statistic.table.modeable = false;
          this.card.statistic.number.show = true;
          this.card.statistic.pie.show = false;
          this.card.device.state.show = true;
          this.card.device.route.show = false;
          this.card.shop.statistic.show = false;
          this.card.shop.pie.show = false;
          this.card.shop.line.show = false;
          this.card.realtime.pie.show = true;
          this.card.realtime.table.show = true;
          this.card.realtime.line.show = true;
          this.card.gpstask.line.show = false;
          break;
        case SyatemMainMapNavigation.gpstask:
          this.card.statistic.table.mode = EventMode.gpstask;
          this.card.statistic.table.modeable = false;
          this.card.statistic.number.show = true;
          this.card.statistic.pie.show = false;
          this.card.device.state.show = true;
          this.card.device.route.show = true;
          this.card.shop.statistic.show = false;
          this.card.shop.pie.show = false;
          this.card.shop.line.show = false;
          this.card.realtime.line.show = false;
          this.card.realtime.pie.show = false;
          this.card.realtime.table.show = false;
          this.card.gpstask.line.show = true;
          break;
        case SyatemMainMapNavigation.heatmap:
          break;
        default:
          break;
      }
    },
    map: (index: SyatemMainMapNavigation) => {
      switch (index) {
        case SyatemMainMapNavigation.main:
          this.map.display.heatmap = false;
          this.map.display.shop = true;
          this.map.display.device = true;
          this.map.display.alarm = true;
          this.map.display.sample = true;
          break;
        case SyatemMainMapNavigation.shop:
          this.map.display.shop = true;
          this.map.display.device = false;
          this.map.display.alarm = false;
          this.map.display.sample = false;
          this.map.display.heatmap = false;
          break;
        case SyatemMainMapNavigation.realtime:
          this.map.display.shop = false;
          this.map.display.device = true;
          this.map.display.alarm = true;
          this.map.display.sample = false;
          this.map.display.heatmap = false;
          break;
        case SyatemMainMapNavigation.gpstask:
          this.map.display.shop = false;
          this.map.display.device = true;
          this.map.display.alarm = false;
          this.map.display.sample = true;
          this.map.display.heatmap = false;
          break;
        case SyatemMainMapNavigation.heatmap:
          this.map.display.shop = false;
          this.map.display.device = false;
          this.map.display.alarm = false;
          this.map.display.sample = false;
          this.map.display.heatmap = true;
          break;
        default:
          break;
      }
    },
  };
}
