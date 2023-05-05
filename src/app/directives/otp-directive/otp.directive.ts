import { Directive, Input, OnInit, ElementRef, Renderer2 } from "@angular/core";

@Directive({
  selector: "[otp]"
})
export class OtpDirective implements OnInit {
  @Input() disabledNumberOnly: boolean;
  constructor(private _elRef: ElementRef, private _renderer: Renderer2) {}

  ngOnInit() {
    if (!this.disabledNumberOnly) {
      this._renderer.setAttribute(
        this._elRef.nativeElement,
        "onkeypress",
        "return (event.charCode >= 48 && event.charCode <= 57) || event.charCode == 0"
      );
    }
  }
}
