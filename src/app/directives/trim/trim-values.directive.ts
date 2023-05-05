import { Directive, forwardRef, HostListener } from "@angular/core";
import { NG_VALUE_ACCESSOR, DefaultValueAccessor } from "@angular/forms";

const TRIM_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => TrimValuesDirective),
  multi: true,
};

/**
 * The trim accessor for writing trimmed value and listening to changes that is
 * used by the {@link NgModel}, {@link FormControlDirective}, and
 * {@link FormControlName} directives.
 */
@Directive({
  // tslint:disable-next-line:directive-selector
  selector: `
    input:not([type=checkbox]):not([type=radio]):not([type=password]):not([readonly]):not(.ng-trim-ignore)[formControlName],
    input:not([type=checkbox]):not([type=radio]):not([type=password]):not([readonly]):not(.ng-trim-ignore)[formControl],
    input:not([type=checkbox]):not([type=radio]):not([type=password]):not([readonly]):not(.ng-trim-ignore)[ngModel],
    textarea:not([readonly]):not(.ng-trim-ignore)[formControlName],
    textarea:not([readonly]):not(.ng-trim-ignore)[formControl],
    textarea:not([readonly]):not(.ng-trim-ignore)[ngModel],
    :not([readonly]):not(.ng-trim-ignore)[ngDefaultControl]
  `,
  providers: [TRIM_VALUE_ACCESSOR],
})
export class TrimValuesDirective extends DefaultValueAccessor {
  @HostListener("input", ["$event.target.value"])
  ngOnChange = (val: string) => {
    this.onChange(val.trim());
  };

  @HostListener("blur", ["$event.target.value"])
  ngOnBlur = (val: string) => {
    this.writeValue(val.trim());
    this.onTouched();
  };

  writeValue(value: any): void {
    if (typeof value === "string") {
      value = value.trim();
    }

    super.writeValue(value);
  }
}
