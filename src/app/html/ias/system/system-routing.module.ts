import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SystemComponent } from './component/system.component';
import { SystemIndexComponent } from './system-index/system-index.component';
import { SystemMapComponent } from './system-map/component/system-map.component';
import { SystemModuleComponent } from './system-module/component/system-module.component';
import { SystemModuleIndexComponent } from './system-module/system-module-index/system-module-index.component';
import { SystemModuleRoadManagerComponent } from './system-module/system-module-road/system-module-road-manager/system-module-road-manager.component';
import { SystemModuleShopManagerComponent } from './system-module/system-module-shop/system-module-shop-manager/system-module-shop-manager.component';

import { SystemTaskComponent } from './system-task/component/system-task.component';
import { SystemTaskFileManagerComponent } from './system-task/system-task-file/system-task-file-manager/system-task-file-manager.component';
import { SystemTaskManagerComponent } from './system-task/system-task-manager/system-task-manager.component';

const routes: Routes = [
  {
    path: '',
    component: SystemComponent,
    children: [
      {
        path: '',
        redirectTo: 'index',
        pathMatch: 'full',
      },
      {
        path: 'index',
        component: SystemIndexComponent,
      },
      {
        path: 'task',
        component: SystemTaskComponent,
        children: [
          {
            path: '',
            redirectTo: 'index',
            pathMatch: 'full',
          },
          {
            path: 'index',
            component: SystemTaskManagerComponent,
          },
          {
            path: 'file',
            component: SystemTaskFileManagerComponent,
            pathMatch: 'prefix',
          },
        ],
      },
      {
        path: 'module',
        component: SystemModuleComponent,
        children: [
          {
            path: '',
            redirectTo: 'index',
            pathMatch: 'full',
          },
          {
            path: 'index',
            component: SystemModuleIndexComponent,
          },
          {
            path: 'shop',
            component: SystemModuleShopManagerComponent,
          },
          {
            path: 'road',
            component: SystemModuleRoadManagerComponent,
          },
        ],
      },
      {
        path: 'map',
        children: [
          {
            path: '',
            redirectTo: 'index',
            pathMatch: 'full',
          },
          {
            path: 'index',
            component: SystemMapComponent,
          },
        ],
      },
    ],
  },
];

@NgModule({ imports: [RouterModule.forChild(routes)], exports: [RouterModule] })
export class SystemRoutingModule {}
