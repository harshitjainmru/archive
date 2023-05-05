import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RequestListComponent } from "./request-list.component";
import { CreateRequestModule } from "../create-request/create-request.module";
import { RequestDetailsModule } from "../request-details/request-details.module";
import { MatSelectModule } from "@angular/material/select";
import { MatDialogModule } from "@angular/material/dialog";
import { RequestService } from "../request.service";
import { MatPaginatorModule } from "@angular/material/paginator";
import { DateAgoModule } from "src/app/pipes/date-ago/date-ago.module";
import { NoRecordModule } from "src/app/modules/common/modules/no-record/no-record.module";

@NgModule({
  declarations: [RequestListComponent],
  imports: [
    CommonModule,
    CreateRequestModule,
    RequestDetailsModule,
    MatSelectModule,
    MatDialogModule,
    MatPaginatorModule,
    DateAgoModule,
    NoRecordModule,
  ],

  exports: [RequestListComponent],
  providers: [RequestService],
})
export class RequestListModule {}
