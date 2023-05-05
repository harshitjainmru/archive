import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FeaturesRoutingModule } from './features-routing.module';
import { FeaturesComponent } from './features.component';
import { LayoutModule } from '../layout/layout.module';
import { SidebarModule } from '../layout/sidebar/sidebar.module';


@NgModule({
  declarations: [FeaturesComponent],
  imports: [
    CommonModule,
    FeaturesRoutingModule,
    LayoutModule,
    SidebarModule
  ]
})
export class FeaturesModule { }
