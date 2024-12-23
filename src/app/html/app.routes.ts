import { Routes } from '@angular/router';
import { AuthorizationActivate } from '../common/data-core/requests/auth/authorization.activate';
import { LoginComponent } from './login/login.component';

enum RoutePath {
  login = 'login',
  management = 'management',
  system = 'system',
}

export const routes: Routes = [
  {
    path: '',
    redirectTo: RoutePath.login,
    pathMatch: 'full',
  },
  {
    path: RoutePath.login,
    component: LoginComponent,
  },
  {
    path: RoutePath.management,
    loadChildren: () =>
      import('./ias/management/management.module').then(
        (mod) => mod.ManagementModule
      ),
    canActivate: [AuthorizationActivate],
  },

  {
    path: RoutePath.system,
    loadChildren: () =>
      import('./ias/system/system.module').then((mod) => mod.SystemModule),
    canActivate: [AuthorizationActivate],
  },
];
