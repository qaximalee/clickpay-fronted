import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AreaComponent } from './area/area.component';
import { BillComponent } from './bill/bill.component';
import { BoxMediaComponent } from './box-media/box-media.component';
import { CompanyComponent } from './company/company.component';
import { CreationComponent } from './creation.component';
import { PackageComponent } from './package/package.component';

const routes: Routes = [
{ path: '', component: CreationComponent,

children : [
  { 
    path: 'bill', component: BillComponent
  },
  { 
    path: 'package', component: PackageComponent
  },
  { 
    path: 'company', component: CompanyComponent
  },
  { 
    path: 'box-media', component: BoxMediaComponent
  },
  { 
    path: 'area', component: AreaComponent
  },
]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CreationRoutingModule { }
