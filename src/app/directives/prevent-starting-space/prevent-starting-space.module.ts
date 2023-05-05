import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { PreventStartingSpaceDirective } from "./prevent-starting-space.directive";

@NgModule({
  declarations: [PreventStartingSpaceDirective],
  imports: [CommonModule],
  exports: [PreventStartingSpaceDirective],
})
export class PreventStartingSpaceModule {}
