import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { WhiteSpaceDirective } from "./white-space.directive";

@NgModule({
  declarations: [WhiteSpaceDirective],
  imports: [CommonModule],
  exports: [WhiteSpaceDirective],
})
export class WhiteSpaceModule {}
