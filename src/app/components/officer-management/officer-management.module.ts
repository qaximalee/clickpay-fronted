import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OfficerManagementRoutingModule } from './officer-management-routing.module';
import { OfficerManagementComponent } from './officer-management.component';
import { OfficerDetailsComponent } from './officer-details/officer-details.component';
import { AreaAllocationComponent } from './area-allocation/area-allocation.component';
import { OfficerCollectionsComponent } from './officer-collections/officer-collections.component';
import { CreateUpdateOfficerModalComponent } from './officer-details/create-update-officer-modal/create-update-officer-modal.component';
import { AntdesignModule } from 'src/app/modules/antdesign.module';


@NgModule({
  declarations: [
    OfficerManagementComponent,
    OfficerDetailsComponent,
    AreaAllocationComponent,
    OfficerCollectionsComponent,
    CreateUpdateOfficerModalComponent
  ],
  imports: [
    CommonModule,
    OfficerManagementRoutingModule,
    AntdesignModule
  ]
})
export class OfficerManagementModule { }
