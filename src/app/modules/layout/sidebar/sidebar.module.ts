import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from './sidebar.component';
import { AbsoluteRoutingModule } from 'src/app/pipes/absolute-routing/absolute-routing.module';
import { MatExpansionModule } from '@angular/material/expansion';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [SidebarComponent],
  imports: [
    CommonModule,
    RouterModule,
    AbsoluteRoutingModule,
    MatExpansionModule
  ],
  exports: [SidebarComponent],
})
export class SidebarModule { }
