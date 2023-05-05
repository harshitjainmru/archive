import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { JobRequestRecievedPopupComponent } from "./job-request-recieved-popup.component";
import { JobService } from "../../add-job/service/job.service";
import { CustomCurrencyPipeModule } from "src/app/pipes/custom-currency-pipe/custom-currency-pipe.module";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { FormsModule } from "@angular/forms";
import { MatDialogModule } from "@angular/material/dialog";
import { CreateRequestModule } from "../../../user/request-module/create-request/create-request.module";
import { RouterModule } from "@angular/router";
import { AbsoluteRoutingModule } from "src/app/pipes/absolute-routing/absolute-routing.module";

@NgModule({
  declarations: [JobRequestRecievedPopupComponent],
  imports: [
    CommonModule,
    RouterModule,
    AbsoluteRoutingModule,
    CustomCurrencyPipeModule,
    MatCheckboxModule,
    FormsModule,
    MatDialogModule,
    CreateRequestModule,
  ],
  providers: [JobService],
  exports: [JobRequestRecievedPopupComponent],
})
export class JobRequestRecievedPopupModule {}
