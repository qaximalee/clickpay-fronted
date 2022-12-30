import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminDetailsComponent } from './admin-details/admin-details.component';
import { AdminManagementComponent } from './admin-management.component';

const routes: Routes = [
  { path: '', component: AdminManagementComponent, 
    children : [
      { path: '', redirectTo : 'admin-details', pathMatch :'full'},
      { 
        path: 'admin-details', component: AdminDetailsComponent
      },
    ]
},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminManagementRoutingModule { }
