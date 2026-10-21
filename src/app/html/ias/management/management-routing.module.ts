import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ManagementComponent } from './component/management.component';
import { ManagementDeviceMobileManagerComponent } from './management-device-mobile/management-device-mobile-manager/management-device-mobile-manager.component';
import { ManagementDivisionManagerComponent } from './management-division/management-division-manager/management-division-manager.component';
import { ManagementNetworkLocationSSHComponent } from './management-network-location-ssh/management-network-location-ssh.component';
import { ManagementNetworkLocationTcpIpComponent } from './management-network-location-tcpip/management-network-location-tcpip.component';
import { ManagementRecordFileManagerComponent } from './management-record-file-manager/management-record-file-manager.component';
import { ManagementSystemDeviceDatetimeComponent } from './management-system-device-datetime/management-system-device-datetime.component';
import { ManagementSystemDeviceInfoComponent } from './management-system-device-info/management-system-device-info.component';
import { ManagementSystemMaintainConfigComponent } from './management-system-maintain-config/management-system-maintain-config.component';
import { ManagementSystemMaintainLogComponent } from './management-system-maintain-log/management-system-maintain-log.component';
import { ManagementSystemStatusProcessComponent } from './management-system-status-process/management-system-status-process.component';
import { ManagementSystemStatusRunningComponent } from './management-system-status-running/management-system-status-running.component';
import { ManagementTabIndexComponent } from './management-tab-index/management-tab-index.component';
import { ManagementUserGroupManagerComponent } from './management-user/management-user-group/management-user-group-manager/management-user-group-manager.component';
import { ManagementUserInfoManagerComponent } from './management-user/management-user-info/management-user-info-manager/management-user-info-manager.component';

const routes: Routes = [
  {
    path: '',
    component: ManagementComponent,
    children: [
      {
        path: '',
        redirectTo: 'system',
        pathMatch: 'full',
      },
      {
        path: 'system',
        component: ManagementTabIndexComponent,
        children: [
          {
            path: '',
            redirectTo: 'device',
            pathMatch: 'full',
          },
          {
            path: 'device',
            children: [
              {
                path: '',
                redirectTo: 'info',
                pathMatch: 'full',
              },
              {
                path: 'info',
                component: ManagementSystemDeviceInfoComponent,
                data: { title: '设备信息' },
              },
              {
                path: 'datetime',
                component: ManagementSystemDeviceDatetimeComponent,
                data: { title: '时间配置' },
              },
            ],
          },
          {
            path: 'status',
            children: [
              {
                path: '',
                redirectTo: 'running',
                pathMatch: 'full',
              },
              {
                path: 'running',
                component: ManagementSystemStatusRunningComponent,
                data: { title: '系统运行状态' },
              },
              {
                path: 'process',
                component: ManagementSystemStatusProcessComponent,
                data: { title: '进程信息' },
              },
            ],
          },
          {
            path: 'maintain',
            children: [
              {
                path: '',
                redirectTo: 'config',
                pathMatch: 'full',
              },
              {
                path: 'config',
                component: ManagementSystemMaintainConfigComponent,
                data: { title: '系统维护' },
              },
              {
                path: 'log',
                component: ManagementSystemMaintainLogComponent,
                data: { title: '日志' },
              },
            ],
          },
        ],
      },
      {
        path: 'network',
        component: ManagementTabIndexComponent,
        children: [
          {
            path: '',
            redirectTo: 'location',
            pathMatch: 'full',
          },
          {
            path: 'location',
            children: [
              {
                path: '',
                redirectTo: 'tcpip',
                pathMatch: 'full',
              },
              {
                path: 'tcpip',
                component: ManagementNetworkLocationTcpIpComponent,
                data: { title: 'TCP/IP' },
              },
              {
                path: 'ssh',
                component: ManagementNetworkLocationSSHComponent,
                data: { title: 'SSH' },
              },
            ],
          },
        ],
      },
      {
        path: 'record',
        component: ManagementTabIndexComponent,
        children: [
          {
            path: '',
            redirectTo: 'file',
            pathMatch: 'full',
          },
          {
            path: 'file',
            children: [
              {
                path: '',
                redirectTo: 'manager',
                pathMatch: 'full',
              },
              {
                path: 'manager',
                component: ManagementRecordFileManagerComponent,
                data: { title: '录像文件' },
              },
            ],
          },
        ],
      },
      {
        path: 'device',
        component: ManagementTabIndexComponent,
        children: [
          {
            path: '',
            redirectTo: 'mobile',
            pathMatch: 'full',
          },
          {
            path: 'mobile',
            children: [
              {
                path: '',
                redirectTo: 'manager',
                pathMatch: 'full',
              },
              {
                path: 'manager',
                component: ManagementDeviceMobileManagerComponent,
                data: { title: '前端设备列表' },
              },
            ],
          },
        ],
      },
      {
        path: 'user',
        component: ManagementTabIndexComponent,
        children: [
          {
            path: '',
            redirectTo: 'info',
            pathMatch: 'full',
          },
          {
            path: 'info',
            children: [
              {
                path: '',
                redirectTo: 'manager',
                pathMatch: 'full',
              },
              {
                path: 'manager',
                component: ManagementUserInfoManagerComponent,
                data: { title: '用户列表' },
              },
            ],
          },
          {
            path: 'group',
            children: [
              {
                path: '',
                redirectTo: 'manager',
                pathMatch: 'full',
              },
              {
                path: 'manager',
                component: ManagementUserGroupManagerComponent,
                data: { title: '用户组列表' },
              },
            ],
          },
        ],
      },
      {
        path: 'division',
        component: ManagementTabIndexComponent,
        children: [
          {
            path: '',
            redirectTo: 'manager',
            pathMatch: 'full',
          },
          {
            path: 'manager',
            component: ManagementDivisionManagerComponent,
            data: { title: '区划管理' },
          },
        ],
      },
    ],
  },
];

@NgModule({ imports: [RouterModule.forChild(routes)], exports: [RouterModule] })
export class ManagementRoutingModule {}
