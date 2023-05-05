import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LandingComponent } from './landing.component';
import { Routes, RouterModule } from '@angular/router';
import { MatMenuModule } from '@angular/material/menu';
import { AbsoluteRoutingModule } from 'src/app/pipes/absolute-routing/absolute-routing.module';
import { CountryService } from 'src/app/services/country.service';

console.log('wleellelelel')

const routes: Routes = [
  {
    path: "",
    component: LandingComponent
  }
];


@NgModule({
  declarations: [LandingComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MatMenuModule,
    AbsoluteRoutingModule
  ],
  providers:[CountryService]
})
export class LandingModule { }
