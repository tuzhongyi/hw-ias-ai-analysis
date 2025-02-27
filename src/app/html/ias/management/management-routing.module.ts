import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { plainToInstance } from 'class-transformer';
import json from '../management/management-path/management-path.json';
import { ManagementComponent } from './component/management.component';
import { ManagementNetworkLocationSSHComponent } from './management-network-location-ssh/management-network-location-ssh.component';
import { ManagementNetworkLocationTcpIpComponent } from './management-network-location-tcpip/management-network-location-tcpip.component';
import { ManagementPathRoot } from './management-path/management.path';
import { ManagementRecordFileManagerComponent } from './management-record-file-manager/management-record-file-manager.component';
import { ManagementSystemDeviceDatetimeComponent } from './management-system-device-datetime/management-system-device-datetime.component';
import { ManagementSystemDeviceInfoComponent } from './management-system-device-info/management-system-device-info.component';
import { ManagementSystemMaintainConfigComponent } from './management-system-maintain-config/management-system-maintain-config.component';
import { ManagementSystemMaintainLogComponent } from './management-system-maintain-log/management-system-maintain-log.component';
import { ManagementSystemStatusProcessComponent } from './management-system-status-process/management-system-status-process.component';
import { ManagementSystemStatusRunningComponent } from './management-system-status-running/management-system-status-running.component';
import { ManagementTabIndexComponent } from './management-tab-index/management-tab-index.component';
import { ManagementUserInfoManagerComponent } from './management-user-info-manager/management-user-info-manager.component';

const root = plainToInstance(ManagementPathRoot, json);

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
              },
              {
                path: 'datetime',
                component: ManagementSystemDeviceDatetimeComponent,
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
              },
              {
                path: 'process',
                component: ManagementSystemStatusProcessComponent,
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
              },
              {
                path: 'log',
                component: ManagementSystemMaintainLogComponent,
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
              },
              {
                path: 'ssh',
                component: ManagementNetworkLocationSSHComponent,
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
              },
            ],
          },
        ],
      },
    ],
  },
];

@NgModule({ imports: [RouterModule.forChild(routes)], exports: [RouterModule] })
export class ManagementRoutingModule {}
