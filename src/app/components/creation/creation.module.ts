import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CreationRoutingModule } from './creation-routing.module';
import { CreationComponent } from './creation.component';
import { BillComponent } from './bill/bill.component';
import { PackageComponent } from './package/package.component';
import { BoxMediaComponent } from './box-media/box-media.component';
import { AreaComponent } from './area/area.component';
import { AntdesignModule } from 'src/app/modules/antdesign.module';
import { CompanyComponent } from './company/company.component';


@NgModule({
  declarations: [
    CreationComponent,
    BillComponent,
    PackageComponent,
    BoxMediaComponent,
    AreaComponent,
    CompanyComponent
  ],
  imports: [
    CommonModule,
    CreationRoutingModule,
    AntdesignModule
  ]
})
export class CreationModule { }
