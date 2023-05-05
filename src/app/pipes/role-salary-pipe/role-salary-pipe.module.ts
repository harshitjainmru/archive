import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RoleSalaryPipe } from "./role-salary.pipe";

@NgModule({
  declarations: [RoleSalaryPipe],
  imports: [CommonModule],
  exports: [RoleSalaryPipe],
})
export class RoleSalaryPipeModule {}
