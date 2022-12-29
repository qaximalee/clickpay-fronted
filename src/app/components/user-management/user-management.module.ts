import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserManagementRoutingModule } from './user-management-routing.module';
import { UserManagementComponent } from './user-management.component';
import { UserDetailsComponent } from './user-details/user-details.component';
import { UserCollectionsComponent } from './user-collections/user-collections.component';
import { ComplainViewComponent } from './complain-view/complain-view.component';


@NgModule({
  declarations: [
    UserManagementComponent,
    UserDetailsComponent,
    UserCollectionsComponent,
    ComplainViewComponent
  ],
  imports: [
    CommonModule,
    UserManagementRoutingModule
  ]
})
export class UserManagementModule { }
