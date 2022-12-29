import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminManagementRoutingModule } from './admin-management-routing.module';
import { AdminManagementComponent } from './admin-management.component';
import { AdminDetailsComponent } from './admin-details/admin-details.component';


@NgModule({
  declarations: [
    AdminManagementComponent,
    AdminDetailsComponent
  ],
  imports: [
    CommonModule,
    AdminManagementRoutingModule
  ]
})
export class AdminManagementModule { }
