import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { UnderDevDirective } from "./under-dev.directive";

@NgModule({
  declarations: [UnderDevDirective],
  imports: [CommonModule],
  exports: [UnderDevDirective],
})
export class UnderDevModule {}
