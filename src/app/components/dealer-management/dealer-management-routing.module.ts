import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DealerCollectionsComponent } from './dealer-collections/dealer-collections.component';
import { DealerDetailsComponent } from './dealer-details/dealer-details.component';
import { DealerManagementComponent } from './dealer-management.component';

const routes: Routes = [{ path: '', component: DealerManagementComponent,
children : [
  { path: '', redirectTo : 'dealer-details', pathMatch :'full'},
  { 
    path: 'dealer-details', component: DealerDetailsComponent
  },
  { 
    path: 'dealer-collections', component: DealerCollectionsComponent
  },
]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DealerManagementRoutingModule { }
