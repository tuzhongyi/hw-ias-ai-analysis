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
      } else if (
        location.pathname.indexOf(SystemPath.module_road_section) >= 0
      ) {
        return [
          this.home.index(),
          this.module.index(),
          this.module.roadsection(),
        ];
      } else if (
        location.pathname.indexOf(SystemPath.module_road_object) >= 0
      ) {
        return [
          this.home.index(),
          this.module.index(),
          this.module.roadobject(),
        ];
      } else if (
        location.pathname.indexOf(SystemPath.module_mobile_device_route) >= 0
      ) {
        return [this.home.index(), this.module.index(), this.module.route()];
      } else if (location.pathname.indexOf(SystemPath.module_road) >= 0) {
        return [this.home.index(), this.module.index(), this.module.road()];
      } else if (location.pathname.indexOf(SystemPath.module_gps_task) >= 0) {
        return [this.home.index(), this.module.index(), this.module.gps.task()];
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
    roadsection: () => {
      let item = new SystemBreadcrumbItem();
      item.path = SystemPath.module_road_section;
      item.text = '屏蔽路段';
      return item;
    },

    roadobject: () => {
      let item = new SystemBreadcrumbItem();
      item.path = SystemPath.module_road_object;
      item.text = '道路物件';
      return item;
    },
    route: () => {
      let item = new SystemBreadcrumbItem();
      item.path = SystemPath.module_mobile_device_route;
      item.text = '巡检线路';
      return item;
    },
    gps: {
      task: () => {
        let item = new SystemBreadcrumbItem();
        item.path = SystemPath.module_gps_task;
        item.text = '定制场景';
        return item;
      },
    },
  };

  private task = {
    load: () => {
      if (location.pathname.indexOf(SystemPath.task_file) >= 0) {
        return [
          this.home.index(),
          this.task.index(),
          this.task.shop.manager(),
          this.task.shop.file(),
        ];
      } else if (location.pathname.indexOf(SystemPath.task_shop) >= 0) {
        return [this.home.index(), this.task.index(), this.task.shop.manager()];
      } else if (location.pathname.indexOf(SystemPath.task_gps) >= 0) {
        return [this.home.index(), this.task.index(), this.task.gps.manager()];
      } else if (location.pathname.indexOf(SystemPath.task_index) >= 0) {
        return [this.home.index(), this.task.index()];
      } else {
        return [];
      }
    },
    index: () => {
      let item = new SystemBreadcrumbItem();
      item.text = 'AI分析任务';
      item.path = SystemPath.task_index;
      return item;
    },
    shop: {
      manager: () => {
        let item = new SystemBreadcrumbItem();
        item.text = '商铺分析任务';
        item.path = SystemPath.task_shop;
        return item;
      },
      file: () => {
        let item = new SystemBreadcrumbItem();
        item.text = '录像文件';
        item.path = SystemPath.task_file;
        return item;
      },
    },
    gps: {
      manager: () => {
        let item = new SystemBreadcrumbItem();
        item.text = '定制场景任务';
        item.path = SystemPath.task_shop;
        return item;
      },
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
      } else if (
        location.pathname.indexOf(SystemPath.event_gps_task_manager) >= 0
      ) {
        return [
          this.home.index(),
          this.event.index(),
          this.event.manager.gpstask(),
        ];
      } else if (
        location.pathname.indexOf(SystemPath.event_road_object_manager) >= 0
      ) {
        return [
          this.home.index(),
          this.event.index(),
          this.event.manager.roadobject(),
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
      gpstask: () => {
        let item = new SystemBreadcrumbItem();
        item.text = '定制场景事件';
        item.path = SystemPath.event_gps_task_manager;
        return item;
      },
      roadobject: () => {
        let item = new SystemBreadcrumbItem();
        item.text = '道路物件事件';
        item.path = SystemPath.event_gps_task_manager;
        return item;
      },
    },
  };
}
