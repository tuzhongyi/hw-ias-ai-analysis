import { Injectable } from '@angular/core';
import { SystemPath } from '../system.model';
import { SystemBreadcrumbItem } from './system-breadcrumb.model';

@Injectable()
export class SystemBreadcrumbBusiness {
  load(): SystemBreadcrumbItem[] {
    let models: SystemBreadcrumbItem[] = [];

    if (location.pathname.indexOf(SystemPath.module_shop) >= 0) {
      models = [this.home(), this.module(), this.module_shop()];
    } else if (location.pathname.indexOf(SystemPath.module) >= 0) {
      models = [this.home(), this.module()];
    } else if (location.pathname.indexOf(SystemPath.task_file) >= 0) {
      models = [this.home(), this.task(), this.file()];
    } else if (location.pathname.indexOf(SystemPath.task) >= 0) {
      models = [this.home(), this.task()];
    }
    if (models.length > 0) {
      models[models.length - 1].selected = true;
    }
    return models;
  }

  private home() {
    let item = new SystemBreadcrumbItem();
    item.text = '主页';
    item.path = SystemPath.index;
    return item;
  }

  private module() {
    let item = new SystemBreadcrumbItem();
    item.text = 'AI功能模块';
    item.path = SystemPath.module;
    return item;
  }
  private module_shop() {
    let item = new SystemBreadcrumbItem();
    item.path = SystemPath.module_shop;
    item.text = '商铺';
    return item;
  }

  private task() {
    let item = new SystemBreadcrumbItem();
    item.text = 'AI分析任务';
    item.path = SystemPath.task;
    return item;
  }

  private file() {
    let item = new SystemBreadcrumbItem();
    item.text = '录像文件';
    item.path = SystemPath.task_file;
    return item;
  }
}
