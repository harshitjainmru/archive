import { FormControl } from "@angular/forms";
import { Pipe, PipeTransform } from "@angular/core";
import { TranslateService } from "../../services/translate.service";
import { PATTERN } from "../../constants/patterns";
import { environment } from "../../../environments/environment";
import { LANGUAGES } from "../../constants/languages";
import { formatString } from "../../constants/format-string";
import { UtilityService } from "src/app/services/utility.service";
import { CustomCurrencyPipe } from "../custom-currency-pipe/custom-currency.pipe";
@Pipe({
  name: "validate",
  pure: false,
})
export class ValidationErrorPipe implements PipeTransform {
  formData = TranslateService.data.FORM;
  currentLanguage = localStorage.getItem(environment.languageKey);

  constructor(private utilService: UtilityService) {}

  transform(control: FormControl, key: string, customKey: string = ""): any {
    return control && control.errors
      ? this.getValidationError(control, key, customKey)
      : "";
  }

  getValidationError(control: FormControl, key, customKey) {
    // console.log(key)
    const currencyPipe = new CustomCurrencyPipe(this.utilService);
    let updatedKey =
      this.currentLanguage && this.currentLanguage != LANGUAGES.ENGLISH.value
        ? TranslateService.data[key]
        : formatString(TranslateService.data[key], "SENTENCE");

    // console.log(updatedKey);

    // console.log(TranslateService.data[key]);
    if (key == "UEN") {
      updatedKey = TranslateService.data[key];
    }
    if (updatedKey == "Salary" && control.hasError("min")) {
      // console.log(currencyPipe.transform(control.errors.min.min));

      return this.formData.MIN_SALARY_ERROR.replace(
        "$control$",
        updatedKey
      ).replace("$min$", currencyPipe.transform(control.errors.min.min));
    }
    if (control.hasError("required")) {
      if (customKey) {
        return this.formData[customKey].replace("$control$", updatedKey);
      } else {
        return this.formData.REQUIRED_ERROR.replace("$control$", updatedKey);
      }
    }
    if (control.hasError("pattern")) {
      let pattern = control.errors.pattern.requiredPattern;
      return this.getPatternErrors(pattern, key, updatedKey);
    }
    if (control.hasError("minlength")) {
      return this.formData.MIN_LENGTH_ERROR.replace(
        "$control$",
        updatedKey
      ).replace("$minLength$", control.errors.minlength.requiredLength);
    }
    if (control.hasError("maxlength")) {
      return this.formData.MAX_LENGTH_ERROR.replace(
        "$control$",
        updatedKey
      ).replace("$maxLength$", control.errors.maxlength.requiredLength);
    }

    if (control.hasError("max")) {
      return this.formData.MAX_ERROR.replace("$control$", updatedKey).replace(
        "$max$",
        control.errors.max.max
      );
    }
    if (control.hasError("min")) {
      return this.formData.MIN_ERROR.replace("$control$", updatedKey).replace(
        "$min$",
        control.errors.min.min
      );
    }
    if (control.hasError("matchPassword")) {
      return this.formData.PASSWORD_MISMATCH.replace(
        "$control$",
        updatedKey
      ).replace("$password$", TranslateService.data["PASSWORD"]);
    }
    if (control.hasError("mustMatch")) {
      return this.formData.PASSWORD_MISMATCH.replace(
        "$control$",
        updatedKey
      ).replace("$password$", TranslateService.data["PASSWORD"]);
    }
    if (control.hasError("lengthMatch")) {
      const error = control.getError("lengthMatch");
      return this.formData.MATCH_LENGTH.replace("$control$", updatedKey)
        .replace("$unit$", error.unit)
        .replace("$requiredLength$", error.requiredLength);
    }

    if (control.hasError("emailExist")) {
      console.log(control);

      const error = control.getError("emailExist");
      return TranslateService.data["INVITATION_ALREADY_SENT"];
    }
    if (control.hasError("emailAlreadyAdded")) {
      console.log(control);

      const error = control.getError("emailAlreadyAdded");
      return TranslateService.data["EMAIL_ALREADY_ADDED"];
    }
  }

  getPatternErrors(pattern, key, updatedKey) {
    let control: string;
    let value = TranslateService.data[key];
    if (pattern == PATTERN.email) {
      control = "EMAIL";
    } else if (pattern == PATTERN.password) {
      control = "PASSWORD";
      value = updatedKey;
    } else if (pattern == PATTERN.name) {
      control = "NAME";
      value = updatedKey;
    } else if (pattern == PATTERN.phone) {
      control = "PHONE";
      value = updatedKey;
    } else if (pattern == PATTERN.price) {
      control = "PRICE";
      value = updatedKey;
    } else if (pattern == PATTERN.passRegex) {
      control = "PASSWORD_RULE";
      value = updatedKey;
    } else if (pattern == PATTERN.url) {
      control = "COMPANY_WEBSITE";
      value = updatedKey;
    } else if (pattern == PATTERN.alphaNumeric) {
      control = "ZIP_CODE";
      value = updatedKey;
    }
    // console.log(pattern, PATTERN.url);

    return this.formData.PATTERN_ERRORS[control].replace("$control$", value);
  }
}
