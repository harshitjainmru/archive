import { Pipe, PipeTransform } from "@angular/core";
import { TranslateService } from "../../services/translate.service";
import { environment } from "../../../environments/environment";
import { LANGUAGES } from "../../constants/languages";
import { formatString } from "../../constants/format-string";

@Pipe({
  name: "translate",
})
export class TranslatePipe implements PipeTransform {
  currentLanguage = localStorage.getItem(environment.languageKey);

  constructor() {}

  transform(
    key: any,
    caseSensitive?: "LOWER" | "UPPER" | "TITLE" | "SENTENCE"
  ): any {
    let data: string = TranslateService.data[key] || key;
    if (
      !caseSensitive ||
      (this.currentLanguage && this.currentLanguage != LANGUAGES.ENGLISH.value)
    ) {
      return TranslateService.data[key] || key;
    }
    return formatString(data, caseSensitive);
  }
}
