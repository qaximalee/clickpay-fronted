import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
     { path: '', loadChildren: () => import('./components/auth/auth.module').then(m => m.AuthModule) },
     { path: 'click-pay', loadChildren: () => import('./components/layout/layout.module').then(m => m.LayoutModule) },
     { path: 'dealer-management', loadChildren: () => import('./components/dealer-management/dealer-management.module').then(m => m.DealerManagementModule) },
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
