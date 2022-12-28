import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AreaRoutingModule } from './area-routing.module';
import { AreaComponent } from './area.component';
import { CityComponent } from './city/city.component';
import { LocalityComponent } from './locality/locality.component';
import { SubLocalityComponent } from './sub-locality/sub-locality.component';
import { AntdesignModule } from 'src/app/modules/antdesign.module';


@NgModule({
  declarations: [
    AreaComponent,
    CityComponent,
    LocalityComponent,
    SubLocalityComponent
  ],
  imports: [
    CommonModule,
    AreaRoutingModule,
    AntdesignModule
  ]
})
export class AreaModule { }
