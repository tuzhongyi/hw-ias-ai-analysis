import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { Language } from '../../../common/tools/language-tool/language';
import { SystemComponent } from './component/system.component';
import { SystemIndexComponent } from './system-index/system-index.component';
import { SystemModuleComponent } from './system-module/component/system-module.component';
import { SystemModuleIndexComponent } from './system-module/system-module-index/system-module-index.component';
import { SystemModuleRoadManagerComponent } from './system-module/system-module-road/system-module-road-manager/system-module-road-manager.component';
import { SystemModuleShopManagerComponent } from './system-module/system-module-shop/system-module-shop-manager/system-module-shop-manager.component';

import { SystemEventComponent } from './system-event/component/system-event.component';
import { SystemEventGpsTaskManagerComponent } from './system-event/system-event-gps-task/system-event-gps-task-manager/system-event-gps-task-manager.component';
import { SystemEventIndexComponent } from './system-event/system-event-index/system-event-index.component';
import { SystemEventManagerAnalysisComponent } from './system-event/system-event-manager/system-event-manager-analysis/system-event-manager-analysis.component';
import { SystemEventManagerRealtimeComponent } from './system-event/system-event-manager/system-event-manager-realtime/system-event-manager-realtime.component';
import { SystemEventManagerShopComponent } from './system-event/system-event-manager/system-event-manager-shop/system-event-manager-shop.component';
import { SystemEventRoadLineManagerComponent } from './system-event/system-event-road-line/system-event-road-line-manager/system-event-road-line-manager.component';
import { SystemEventRoadObjectManagerComponent } from './system-event/system-event-road-object/system-event-road-object-manager/system-event-road-object-manager.component';
import { SystemMainManagerComponent } from './system-main/system-main-manager/system-main-manager.component';
import { SystemModuleFileManagerComponent } from './system-module/system-module-file/system-module-file-manager/system-module-file-manager.component';
import { SystemModuleMobileDeviceRouteManagerComponent } from './system-module/system-module-mobile-device-route/system-module-mobile-device-route-manager/system-module-mobile-device-route-manager.component';

import { SystemModulePatrolSectionManagerComponent } from './system-module/system-module-patrol-section/system-module-patrol-section-manager/system-module-patrol-section-manager.component';
import { SystemModuleRoadAreaManagerComponent } from './system-module/system-module-road-area/system-module-road-area-manager/system-module-road-area-manager.component';
import { SystemModuleRoadObjectManagerComponent } from './system-module/system-module-road-object/system-module-road-object-manager/system-module-road-object-manager.component';
import { SystemModuleRoadPointManagerComponent } from './system-module/system-module-road-point/system-module-road-point-manager/system-module-road-point-manager.component';
import { SystemModuleRoadSectionManagerComponent } from './system-module/system-module-road-section/system-module-road-section-manager/system-module-road-section-manager.component';
import { SystemModuleSecurityDepartmentManagerComponent } from './system-module/system-module-security/system-module-security-department/system-module-security-department-manager/system-module-security-department-manager.component';
import { SystemModuleSecurityManagerComponent } from './system-module/system-module-security/system-module-security-manager/system-module-security-manager.component';
import { SystemModuleSecurityMemberManagerComponent } from './system-module/system-module-security/system-module-security-member/system-module-security-member-manager/system-module-security-member-manager.component';
import { SystemModuleShopCompareManagerComponent } from './system-module/system-module-shop-compare/system-module-shop-compare-manager/system-module-shop-compare-manager.component';
import { SystemModuleShopRegistrationManagerComponent } from './system-module/system-module-shop-registration/system-module-shop-registration-manager/system-module-shop-registration-manager.component';
import { SystemStatisticComponent } from './system-statistic/component/system-statistic.component';
import { SystemStatisticDeviceRouteManagerComponent } from './system-statistic/system-statistic-device-route/system-statistic-device-route-manager/system-statistic-device-route-manager.component';
import { SystemStatisticIndexComponent } from './system-statistic/system-statistic-index/system-statistic-index.component';
import { SystemStatisticRoadObjectDurationManagerComponent } from './system-statistic/system-statistic-road-object-duration/system-statistic-road-object-duration-manager/system-statistic-road-object-duration-manager.component';
import { SystemStatisticRoadObjectStatementManagerComponent } from './system-statistic/system-statistic-road-object-statement/system-statistic-road-object-statement-manager/system-statistic-road-object-statement-manager.component';
import { SystemStatisticRoadObjectManagerComponent } from './system-statistic/system-statistic-road-object/system-statistic-road-object-manager/system-statistic-road-object-manager.component';
import { SystemTaskComponent } from './system-task/component/system-task.component';
import { SystemModuleGpsTaskManagerComponent } from './system-task/system-module-gps-task/system-module-gps-task-manager/system-module-gps-task-manager.component';
import { SystemTaskIndexComponent } from './system-task/system-task-index/system-task-index.component';
import { SystemTaskRoadObjectManagerComponent } from './system-task/system-task-road-object/system-task-road-object-manager/system-task-road-object-manager.component';
import { SystemTaskFileManagerComponent } from './system-task/system-task-shop/system-task-file/system-task-file-manager/system-task-file-manager.component';
import { SystemTaskManagerComponent } from './system-task/system-task-shop/system-task-manager/system-task-manager.component';

/**
 * 面包屑（SystemBreadcrumbBusiness）由这里的 `data.title` 推导：
 * 某个路由渲染时，沿路由链把每个声明了 data.title 的层级拼成「主页 > … > 当前页」。
 * 加页面时在这一行顺手写上 data.title 即可，不用再改面包屑组件。
 *
 * 注意：
 * - 用 data.title，不要用 Angular 的 title 属性（那会改写浏览器标签页标题）。
 * - 不要给 path: '' 的布局路由加 title，否则 /system 下每一页都会多一项。
 * - 不想出现在面包屑里的层级（各分区自己的 index 页、event/manager 这种纯分组）不写即可。
 */
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
        data: { title: 'AI分析任务' },
        children: [
          {
            path: '',
            redirectTo: 'index',
            pathMatch: 'full',
          },
          {
            path: 'index',
            component: SystemTaskIndexComponent,
          },
          {
            path: 'file',
            component: SystemTaskFileManagerComponent,
            pathMatch: 'prefix',
            data: { title: '录像文件' },
          },

          {
            path: 'shop',
            component: SystemTaskManagerComponent,
            data: { title: '商铺分析任务' },
          },
          {
            path: 'gps-task',
            component: SystemModuleGpsTaskManagerComponent,
            data: { title: '定制场景任务' },
          },
          {
            path: 'road-object',
            component: SystemTaskRoadObjectManagerComponent,
            data: { title: '道路部件任务' },
          },
        ],
      },
      {
        path: 'module',
        component: SystemModuleComponent,
        data: { title: 'AI功能模块' },
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
            data: { title: '分析商铺' },
          },
          {
            path: 'shop-registration',
            component: SystemModuleShopRegistrationManagerComponent,
            data: { title: '注册商铺' },
          },
          {
            path: 'shop-compare',
            component: SystemModuleShopCompareManagerComponent,
            data: { title: '商铺管理' },
          },
          {
            path: 'road',
            component: SystemModuleRoadManagerComponent,
            data: { title: '道路' },
          },
          {
            path: 'road-section',
            component: SystemModuleRoadSectionManagerComponent,
            data: { title: '屏蔽路段' },
          },
          {
            path: 'road-point',
            component: SystemModuleRoadPointManagerComponent,
            data: { title: '道路屏蔽点' },
          },
          {
            path: 'road-object',
            component: SystemModuleRoadObjectManagerComponent,
            data: { title: '道路部件' },
          },
          {
            path: 'road-area',
            component: SystemModuleRoadAreaManagerComponent,
            data: { title: '区域道路' },
          },
          {
            path: 'gps-task',
            component: SystemModuleGpsTaskManagerComponent,
            data: { title: '定制场景' },
          },
          {
            path: 'mobile-device-route',
            component: SystemModuleMobileDeviceRouteManagerComponent,
            data: { title: '巡检线路' },
          },
          {
            path: 'patrol-section',
            component: SystemModulePatrolSectionManagerComponent,
            data: { title: '巡逻计划' },
          },
          {
            path: 'file',
            component: SystemModuleFileManagerComponent,
            data: { title: '视频文件' },
          },
          {
            path: 'security',
            component: SystemModuleSecurityManagerComponent,
            data: { title: '部门管理' },
          },
          {
            path: 'security-department',
            component: SystemModuleSecurityDepartmentManagerComponent,
            data: { title: '部门管理' },
          },
          {
            path: 'security-member',
            component: SystemModuleSecurityMemberManagerComponent,
            data: { title: '人员管理' },
          },
        ],
      },
      {
        path: 'map',
        data: { title: '地图' },
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
        data: { title: 'AI分析事件' },
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
                data: { title: '商铺变更' },
              },
              {
                path: 'realtime',
                component: SystemEventManagerRealtimeComponent,
                data: { title: '实时事件' },
              },
              {
                path: 'analysis',
                component: SystemEventManagerAnalysisComponent,
                data: { title: '分析事件' },
              },
              {
                path: 'gps-task',
                component: SystemEventGpsTaskManagerComponent,
                data: { title: '定制场景事件' },
              },
              {
                path: 'road-object',
                component: SystemEventRoadObjectManagerComponent,
                data: { title: '部件扫描' },
              },
              {
                path: 'road-line',
                component: SystemEventRoadLineManagerComponent,
                data: { title: '路段扫描' },
              },
            ],
          },
        ],
      },
      {
        path: 'statistic',
        component: SystemStatisticComponent,
        data: { title: '分析统计' },
        children: [
          {
            path: '',
            redirectTo: 'index',
            pathMatch: 'full',
          },
          {
            path: 'index',
            component: SystemStatisticIndexComponent,
          },
          {
            path: 'road-object',
            component: SystemStatisticRoadObjectManagerComponent,
            // 页面自带标题栏，父级布局不要再画一条
            data: { title: '道路部件统计', headable: false },
          },
          {
            path: 'road-object-duration',
            component: SystemStatisticRoadObjectDurationManagerComponent,
            // 页面自带标题栏，父级布局不要再画一条
            data: { title: '道路部件统计', headable: false },
          },
          {
            path: 'road-object-statement',
            component: SystemStatisticRoadObjectStatementManagerComponent,
            // 页面自带标题栏，父级布局不要再画一条
            data: { title: '道路部件月报表', headable: false },
          },
          {
            path: 'device-route',
            component: SystemStatisticDeviceRouteManagerComponent,
            data: { title: `${Language.DeviceName}行驶统计` },
          },
          {
            path: 'device-travel',
            component: SystemModuleMobileDeviceRouteManagerComponent,
            data: { title: `${Language.DeviceName}线路统计` },
          },
        ],
      },
    ],
  },
];

@NgModule({ imports: [RouterModule.forChild(routes)], exports: [RouterModule] })
export class SystemRoutingModule {}
