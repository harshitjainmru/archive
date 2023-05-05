import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddAddressComponent } from './add-address.component';
import { SelectJobareaModule } from '../../../../../modules/common/modules/select-jobarea/select-jobarea.module';
import { GetControlModule } from 'src/app/pipes/get-control/get-control.module';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { WhiteSpaceModule } from 'src/app/directives/white-space/white-space.module';

@NgModule({
  declarations: [AddAddressComponent],
  imports: [
    CommonModule,
    SelectJobareaModule,
    MatDialogModule,
    MatInputModule,
    GetControlModule,
    WhiteSpaceModule
  ],
  exports: [
    SelectJobareaModule,
    MatDialogModule,
    MatInputModule,
    GetControlModule
  ],
  entryComponents: [AddAddressComponent]
})
export class AddAddressModule { }
