import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AntdesignModule } from 'src/app/modules/antdesign.module';

import { DealerManagementRoutingModule } from './dealer-management-routing.module';
import { DealerManagementComponent } from './dealer-management.component';
import { DealerDetailsComponent } from './dealer-details/dealer-details.component';
import { DealerCollectionsComponent } from './dealer-collections/dealer-collections.component';


@NgModule({
  declarations: [
    DealerManagementComponent,
    DealerDetailsComponent,
    DealerCollectionsComponent
  ],
  imports: [
    CommonModule,
    AntdesignModule,
    DealerManagementRoutingModule
  ]
})
export class DealerManagementModule { }
