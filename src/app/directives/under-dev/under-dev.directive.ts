import { Directive, HostListener } from "@angular/core";
import { UtilityService } from "src/app/services/utility.service";

@Directive({
  selector: "[appUnderDev]",
})
export class UnderDevDirective {
  constructor(private utility: UtilityService) {}

  @HostListener("click", ["$event"]) onClick($event: Event) {
    console.log("host listener called"); // will be called
    this.utility.showAlert("Under Development");
    $event.preventDefault();
  }
}
