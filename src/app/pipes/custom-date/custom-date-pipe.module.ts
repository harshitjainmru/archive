import { NgModule } from "@angular/core";
import { CommonModule, DatePipe } from "@angular/common";
import { CustomDatePipe } from "./custom-date.pipe";

@NgModule({
  imports: [CommonModule],
  declarations: [CustomDatePipe],
  exports: [CustomDatePipe],
  providers: [DatePipe, CustomDatePipe],
})
export class CustomDatePipeModule {}
