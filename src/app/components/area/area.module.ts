import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AreaRoutingModule } from './area-routing.module';
import { AreaComponent } from './area.component';
import { CityComponent } from './city/city.component';
import { CountryComponent } from './country/country.component';
import { LocalityComponent } from './locality/locality.component';
import { SubLocalityComponent } from './sub-locality/sub-locality.component';


@NgModule({
  declarations: [
    AreaComponent,
    CityComponent,
    CountryComponent,
    LocalityComponent,
    SubLocalityComponent
  ],
  imports: [
    CommonModule,
    AreaRoutingModule
  ]
})
export class AreaModule { }
