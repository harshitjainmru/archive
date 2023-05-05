import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchBusinessCategoryComponent } from './search-business-category.component';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatChipsModule } from '@angular/material/chips';
import { MatTooltipModule } from '@angular/material/tooltip';



@NgModule({
  declarations: [SearchBusinessCategoryComponent],
  imports: [
    CommonModule,
    MatSelectModule,
    MatIconModule,
    MatFormFieldModule,
    MatChipsModule,
    MatTooltipModule
  ],
  exports: [
    SearchBusinessCategoryComponent,
    MatSelectModule,
    MatIconModule
  ]

})
export class SearchBusinessCategoryModule { }
