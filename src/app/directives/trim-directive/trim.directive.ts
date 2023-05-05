import { Directive, HostListener, ElementRef } from "@angular/core";
import { NgControl } from "@angular/forms";

@Directive({
  selector: "[appTrim]",
})
export class TrimDirective {
  get ctrl() {
    return this.ngControl.control;
  }

  constructor(private ngControl: NgControl, private el: ElementRef) {}

  @HostListener("focus")
  @HostListener("blur")
  onBlur() {
    // console.log("el", this.el.nativeElement.value);
    if (
      this.el.nativeElement.value === null ||
      this.el.nativeElement.value === undefined ||
      this.el.nativeElement.value === ""
    ) {
      return;
    }
    this.el.nativeElement.value = this.el.nativeElement.value.trim();
    // console.log("el", this.el.nativeElement.value);
    this.ctrl.setValue(this.ctrl.value.trim());
    // console.log(this.ctrl.value);
  }
}
