import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AreaAllocationComponent } from './area-allocation/area-allocation.component';
import { OfficerCollectionsComponent } from './officer-collections/officer-collections.component';
import { OfficerDetailsComponent } from './officer-details/officer-details.component';
import { OfficerManagementComponent } from './officer-management.component';

const routes: Routes = [{ path: '', component: OfficerManagementComponent,
children : [
  { 
    path: 'officer-details', component: OfficerDetailsComponent
  },
  { 
    path: 'area-allocation', component: AreaAllocationComponent
  },
  { 
    path: 'officer-collections', component: OfficerCollectionsComponent
  },
]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OfficerManagementRoutingModule { }
