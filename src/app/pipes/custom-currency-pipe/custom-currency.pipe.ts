import { Pipe, PipeTransform } from "@angular/core";
import { CurrencyPipe } from "@angular/common";
import { UtilityService } from "src/app/services/utility.service";
import { CURRENCY_TYPE, COUNTRY_LOCALE } from "src/app/constants/enums";
import { formatCurrency, getCurrencySymbol } from "@angular/common";

@Pipe({
  name: "customCurrency",
})
export class CustomCurrencyPipe implements PipeTransform {
  constructor(
    private utilService: UtilityService,
    private currencyPipe?: CurrencyPipe
  ) {}
  transform(
    value: number,
    country?: "MALAYSIA" | "SINGAPORE",
    display: "code" | "symbol" | "symbol-narrow" | string | boolean = "symbol",
    digitsInfo: string = "1.2-2",
    locale: string = "zh"
  ): string | null {
    let currencyCode =
      CURRENCY_TYPE[
        country ?? this.utilService.currentCountry.name.toUpperCase()
      ];

    if (value % 1 === 0) {
      digitsInfo = "1.0-0";
    }
    let formatted: any = formatCurrency(
      value,
      locale,
      getCurrencySymbol(currencyCode, "narrow"),
      currencyCode,
      digitsInfo
    );

    if (currencyCode === CURRENCY_TYPE.SINGAPORE) {
      formatted = "S" + formatted;
    }
    formatted = formatted.split("");
    formatted.splice(2, 0, " ");
    formatted = formatted.join("");
    return formatted;
  }
}
