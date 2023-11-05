import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ToursRoutingModule } from './tours-routing.module';
import { MaterialModule } from 'src/app/material.module';
import { TourslistComponent } from './tourslist/tourslist.component';
import { AddtourComponent } from './addtour/addtour.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatNativeDateModule } from '@angular/material/core';


@NgModule({
  declarations: [
    TourslistComponent,
    AddtourComponent
  ],
  imports: [
    CommonModule,
    ToursRoutingModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    MatNativeDateModule,
  ]
})
export class ToursModule { }
