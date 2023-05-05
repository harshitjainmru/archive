import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CountrySelectionComponent } from '../country-selection.component';
import { MatDialogModule } from '@angular/material/dialog';
import { CountryService } from 'src/app/services/country.service';



@NgModule({
  declarations: [CountrySelectionComponent],
  imports: [
    CommonModule,
    MatDialogModule,    
  ],
  exports:[CountrySelectionComponent],
  entryComponents:[CountrySelectionComponent]
})
export class CountrySelectionModule { }
