import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { CreateRequestComponent } from "./create-request.component";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { ReactiveFormsModule } from "@angular/forms";
import { GetControlModule } from "src/app/pipes/get-control/get-control.module";
import { ValidationErrorPipeModule } from "src/app/pipes/validation-error/validation-error-pipe.module";
import { RequestService } from "../request.service";
import { AccountService } from "src/app/modules/account/account.service";
import { MatDialogModule } from "@angular/material/dialog";

@NgModule({
  declarations: [CreateRequestComponent],
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    GetControlModule,
    MatDialogModule,
    ValidationErrorPipeModule,
  ],
  exports: [CreateRequestComponent],
  providers: [RequestService, AccountService],
})
export class CreateRequestModule {}
