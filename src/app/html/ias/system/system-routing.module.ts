import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SystemComponent } from './component/system.component';
import { SystemIndexComponent } from './system-index/system-index.component';
import { SystemModuleComponent } from './system-module/component/system-module.component';
import { SystemModuleIndexComponent } from './system-module/system-module-index/system-module-index.component';
import { SystemModuleRoadManagerComponent } from './system-module/system-module-road/system-module-road-manager/system-module-road-manager.component';
import { SystemModuleShopManagerComponent } from './system-module/system-module-shop/system-module-shop-manager/system-module-shop-manager.component';

import { SystemEventComponent } from './system-event/component/system-event.component';
import { SystemEventIndexComponent } from './system-event/system-event-index/system-event-index.component';
import { SystemEventManagerAnalysisComponent } from './system-event/system-event-manager/system-event-manager-analysis/system-event-manager-analysis.component';
import { SystemEventManagerRealtimeComponent } from './system-event/system-event-manager/system-event-manager-realtime/system-event-manager-realtime.component';
import { SystemEventManagerShopComponent } from './system-event/system-event-manager/system-event-manager-shop/system-event-manager-shop.component';
import { SystemMainManagerComponent } from './system-main/system-main-manager/system-main-manager.component';
import { SystemModuleShopCompareManagerComponent } from './system-module/system-module-shop-compare/system-module-shop-compare-manager/system-module-shop-compare-manager.component';
import { SystemModuleShopRegistrationManagerComponent } from './system-module/system-module-shop-registration/system-module-shop-registration-manager/system-module-shop-registration-manager.component';
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
            path: 'shop-registration',
            component: SystemModuleShopRegistrationManagerComponent,
          },
          {
            path: 'shop-compare',
            component: SystemModuleShopCompareManagerComponent,
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
            component: SystemMainManagerComponent,
          },
        ],
      },
      {
        path: 'event',
        component: SystemEventComponent,
        children: [
          {
            path: '',
            redirectTo: 'index',
            pathMatch: 'full',
          },
          {
            path: 'index',
            component: SystemEventIndexComponent,
          },
          {
            path: 'manager',
            children: [
              {
                path: '',
                redirectTo: 'index',
                pathMatch: 'full',
              },
              {
                path: 'shop',
                component: SystemEventManagerShopComponent,
              },
              {
                path: 'realtime',
                component: SystemEventManagerRealtimeComponent,
              },
              {
                path: 'analysis',
                component: SystemEventManagerAnalysisComponent,
              },
            ],
          },
        ],
      },
    ],
  },
];

@NgModule({ imports: [RouterModule.forChild(routes)], exports: [RouterModule] })
export class SystemRoutingModule {}
