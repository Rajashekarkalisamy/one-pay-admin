import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ToursRoutingModule } from './tours-routing.module';
import { MaterialModule } from 'src/app/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatNativeDateModule } from '@angular/material/core';

import { TourslistComponent } from './tourslist/tourslist.component';
import { AddtourComponent } from './addtour/addtour.component';
import { AddmemberComponent } from './addmember/addmember.component';
import { AccountsComponent } from './accounts/accounts.component';


@NgModule({
  declarations: [
    TourslistComponent,
    AddtourComponent,
    AddmemberComponent,
    AccountsComponent
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
