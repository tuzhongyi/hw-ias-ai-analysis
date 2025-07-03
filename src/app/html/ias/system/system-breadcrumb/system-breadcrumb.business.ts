import { Injectable } from '@angular/core';
import { SystemPath } from '../system.model';
import { SystemBreadcrumbItem } from './system-breadcrumb.model';

@Injectable()
export class SystemBreadcrumbBusiness {
  load(): SystemBreadcrumbItem[] {
    let models: SystemBreadcrumbItem[] = [];
    try {
      models = this.module.load();
      if (models.length > 0) {
        return models;
      }
      models = this.task.load();
      if (models.length > 0) {
        return models;
      }
      models = this.map.load();
      if (models.length > 0) {
        return models;
      }
      models = this.map.load();
      if (models.length > 0) {
        return models;
      }
      models = this.event.load();
      return models;
    } finally {
      if (models.length > 0) {
        models[models.length - 1].selected = true;
      }
    }
  }

  private home = {
    index: () => {
      let item = new SystemBreadcrumbItem();
      item.text = '主页';
      item.path = SystemPath.index;
      return item;
    },
  };

  private module = {
    load: () => {
      if (location.pathname.indexOf(SystemPath.module_shop_registration) >= 0) {
        return [
          this.home.index(),
          this.module.index(),
          this.module.shop.registration(),
        ];
      } else if (
        location.pathname.indexOf(SystemPath.module_shop_compare) >= 0
      ) {
        return [
          this.home.index(),
          this.module.index(),
          this.module.shop.compare(),
        ];
      } else if (location.pathname.indexOf(SystemPath.module_shop) >= 0) {
        return [
          this.home.index(),
          this.module.index(),
          this.module.shop.analysis(),
        ];
      } else if (location.pathname.indexOf(SystemPath.module_road) >= 0) {
        return [this.home.index(), this.module.index(), this.module.road()];
      } else if (location.pathname.indexOf(SystemPath.module) >= 0) {
        return [this.home.index(), this.module.index()];
      } else {
        return [];
      }
    },
    index: () => {
      let item = new SystemBreadcrumbItem();
      item.text = 'AI功能模块';
      item.path = SystemPath.module;
      return item;
    },
    shop: {
      analysis: () => {
        let item = new SystemBreadcrumbItem();
        item.path = SystemPath.module_shop;
        item.text = '分析商铺';
        return item;
      },
      registration: () => {
        let item = new SystemBreadcrumbItem();
        item.path = SystemPath.module_shop_registration;
        item.text = '注册商铺';
        return item;
      },
      compare: () => {
        let item = new SystemBreadcrumbItem();
        item.path = SystemPath.module_shop_compare;
        item.text = '商铺管理';
        return item;
      },
    },
    road: () => {
      let item = new SystemBreadcrumbItem();
      item.path = SystemPath.module_road;
      item.text = '道路';
      return item;
    },
  };

  private task = {
    load: () => {
      if (location.pathname.indexOf(SystemPath.task_file) >= 0) {
        return [this.home.index(), this.task.manager(), this.task.file()];
      } else if (location.pathname.indexOf(SystemPath.task) >= 0) {
        return [this.home.index(), this.task.manager()];
      } else {
        return [];
      }
    },
    manager: () => {
      let item = new SystemBreadcrumbItem();
      item.text = 'AI分析任务';
      item.path = SystemPath.task;
      return item;
    },
    file: () => {
      let item = new SystemBreadcrumbItem();
      item.text = '录像文件';
      item.path = SystemPath.task_file;
      return item;
    },
  };

  private map = {
    load: () => {
      if (location.pathname.indexOf(SystemPath.map) >= 0) {
        return [this.home.index(), this.map.manager()];
      } else {
        return [];
      }
    },
    manager: () => {
      let item = new SystemBreadcrumbItem();
      item.text = '地图';
      item.path = SystemPath.map;
      return item;
    },
  };

  private event = {
    load: () => {
      if (location.pathname.indexOf(SystemPath.event_shop_manager) >= 0) {
        return [
          this.home.index(),
          this.event.index(),
          this.event.manager.shop(),
        ];
      } else if (
        location.pathname.indexOf(SystemPath.event_realtime_manager) >= 0
      ) {
        return [
          this.home.index(),
          this.event.index(),
          this.event.manager.realtime(),
        ];
      } else if (
        location.pathname.indexOf(SystemPath.event_analysis_manager) >= 0
      ) {
        return [
          this.home.index(),
          this.event.index(),
          this.event.manager.analysis(),
        ];
      } else if (location.pathname.indexOf(SystemPath.event) >= 0) {
        return [this.home.index(), this.event.index()];
      } else {
        return [];
      }
    },
    index: () => {
      let item = new SystemBreadcrumbItem();
      item.text = 'AI分析事件';
      item.path = SystemPath.event;
      return item;
    },
    manager: {
      shop: () => {
        let item = new SystemBreadcrumbItem();
        item.text = '商铺事件';
        item.path = SystemPath.event_shop_manager;
        return item;
      },
      realtime: () => {
        let item = new SystemBreadcrumbItem();
        item.text = '实时事件';
        item.path = SystemPath.event_realtime_manager;
        return item;
      },
      analysis: () => {
        let item = new SystemBreadcrumbItem();
        item.text = '分析事件';
        item.path = SystemPath.event_analysis_manager;
        return item;
      },
    },
  };
}
