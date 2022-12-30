import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ComplainViewComponent } from './complain-view/complain-view.component';
import { UserCollectionsComponent } from './user-collections/user-collections.component';
import { UserDetailsComponent } from './user-details/user-details.component';
import { UserManagementComponent } from './user-management.component';

const routes: Routes = [
  { path: '', component: UserManagementComponent, 
  children : [
    { path: '', redirectTo : 'user-details', pathMatch :'full'},
    { 
      path: 'user-details', component: UserDetailsComponent
    },
    { 
      path: 'user-collections', component: UserCollectionsComponent
    },
    { 
      path: 'complain-view', component: ComplainViewComponent
    },
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserManagementRoutingModule { }
