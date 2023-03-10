import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './layout.component';

const routes: Routes = [
  { path: '', component: LayoutComponent,
  children : [
    { path: '', redirectTo : 'dashboard', pathMatch :'full'},
    { 
      path: 'dashboard', 
      loadChildren: () => import('./../dashboard/dashboard.module').then(m => m.DashboardModule) 
    },
    { 
      path: 'creation', 
      loadChildren: () => import('./../creation/creation.module').then(m => m.CreationModule) 
    },
    { 
      path: 'admin-management', 
      loadChildren: () => import('./../admin-management/admin-management.module').then(m => m.AdminManagementModule) 
    },
    { 
      path: 'user-management', 
      loadChildren: () => import('./../user-management/user-management.module').then(m => m.UserManagementModule) 
    },

  ] 
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LayoutRoutingModule { }
