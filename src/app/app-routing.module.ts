import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
     { path: '', loadChildren: () => import('./components/auth/auth.module').then(m => m.AuthModule) },
     { path: 'click-pay', loadChildren: () => import('./components/layout/layout.module').then(m => m.LayoutModule) },
     { path: 'user-management', loadChildren: () => import('./components/user-management/user-management.module').then(m => m.UserManagementModule) },
     { path: 'admin-management', loadChildren: () => import('./components/admin-management/admin-management.module').then(m => m.AdminManagementModule) },
     { path: 'creation', loadChildren: () => import('./components/creation/creation.module').then(m => m.CreationModule) },
     { path: 'dashboard', loadChildren: () => import('./components/dashboard/dashboard.module').then(m => m.DashboardModule) },
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
