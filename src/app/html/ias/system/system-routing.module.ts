import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SystemComponent } from './component/system.component';
import { SystemIndexComponent } from './system-index/system-index.component';
import { SystemModuleShopManagerComponent } from './system-module-shop-manager/system-module-shop-manager.component';
import { SystemModuleComponent } from './system-module/system-module.component';
import { SystemTaskManagerComponent } from './system-task-manager/system-task-manager.component';

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
        ],
      },
      {
        path: 'module',
        children: [
          {
            path: '',
            redirectTo: 'index',
            pathMatch: 'full',
          },
          {
            path: 'index',
            component: SystemModuleComponent,
          },
          {
            path: 'shop',
            component: SystemModuleShopManagerComponent,
          },
        ],
      },
    ],
  },
];

@NgModule({ imports: [RouterModule.forChild(routes)], exports: [RouterModule] })
export class SystemRoutingModule {}
