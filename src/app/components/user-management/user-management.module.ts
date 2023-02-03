import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserManagementRoutingModule } from './user-management-routing.module';
import { UserManagementComponent } from './user-management.component';
import { UserDetailsComponent } from './user-details/user-details.component';
import { UserCollectionsComponent } from './user-collections/user-collections.component';
import { ComplainViewComponent } from './complain-view/complain-view.component';
import { AntdesignModule } from 'src/app/modules/antdesign.module';
import { CreateUpdateUserModalComponent } from './user-details/create-update-user-modal/create-update-user-modal.component';
import { CreateUserCollectionsModalComponent } from './user-collections/create-user-collections-modal/create-user-collections-modal.component';


@NgModule({
  declarations: [
    UserManagementComponent,
    UserDetailsComponent,
    UserCollectionsComponent,
    ComplainViewComponent,
    CreateUpdateUserModalComponent,
    CreateUserCollectionsModalComponent
  ],
  imports: [
    CommonModule,
    UserManagementRoutingModule,
    AntdesignModule
  ]
})
export class UserManagementModule { }
