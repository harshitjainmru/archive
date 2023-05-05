import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InviteCandidatePopupComponent } from './invite-candidate-popup.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { GetControlModule } from 'src/app/pipes/get-control/get-control.module';
import { ValidationErrorPipeModule } from 'src/app/pipes/validation-error/validation-error-pipe.module';

@NgModule({
  declarations: [InviteCandidatePopupComponent],
  imports: [CommonModule, MatInputModule, MatFormFieldModule,ReactiveFormsModule,GetControlModule,ValidationErrorPipeModule],
  exports: [InviteCandidatePopupComponent],
})
export class InviteCandidatePopupModule {}
