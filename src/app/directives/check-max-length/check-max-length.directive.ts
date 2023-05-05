import { Directive, ChangeDetectorRef, Input, ElementRef } from "@angular/core";
import { MatFormField } from "@angular/material/form-field";
import { Subscription } from "rxjs";
import { IValidation } from "src/app/models/validation.interface";
import { AutoUnsubscribe } from "../../constants/unsubscriber";
import { VALIDATION_CRITERIA } from "../../constants/validation-criteria";

type keyTypes = keyof IValidation;
@Directive({
  selector: "[checkMaxLength]",
})
@AutoUnsubscribe()
export class CheckMaxLengthDirective {
  @Input() checkMaxLength: keyTypes;
  @Input() showHint = false;

  subscription = new Subscription();

  constructor(private cd: ChangeDetectorRef, private formField: MatFormField) {}

  ngAfterViewInit() {
    setTimeout(() => {
      let control: any = this.formField._controlStatic;
      let el: ElementRef<HTMLInputElement> = control._elementRef;
      el.nativeElement.maxLength = VALIDATION_CRITERIA[this.checkMaxLength];
      if (this.showHint) {
        this.assignValue();
        this.cd.detectChanges();
        this.subscription.add(
          this.formField._controlStatic.ngControl.valueChanges.subscribe(
            (data) => {
              this.assignValue();
            }
          )
        );
      }
    });
  }

  assignValue() {
    try {
      this.formField.hintLabel = `${
        this.formField._controlStatic.ngControl.value
          ? this.formField._controlStatic.ngControl.value.length
          : 0
      } / ${VALIDATION_CRITERIA[this.checkMaxLength]}`;
    } catch (error) {}
  }
}
