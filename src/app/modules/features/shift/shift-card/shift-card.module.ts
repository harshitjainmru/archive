import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShiftCardComponent } from './shift-card.component';
import { MatMenuModule } from '@angular/material/menu';
import {MatIconModule} from '@angular/material/icon';


@NgModule({
  declarations: [ShiftCardComponent],
  imports: [
    CommonModule,
    MatMenuModule,
    MatIconModule
  ],
  exports: [ShiftCardComponent]
})
export class ShiftCardModule { }
