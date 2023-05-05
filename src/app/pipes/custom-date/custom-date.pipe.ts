import { Pipe, PipeTransform } from "@angular/core";
import { DatePipe } from "@angular/common";
import { TranslateService } from "src/app/services/translate.service";

@Pipe({
  name: "customDate",
})
export class CustomDatePipe implements PipeTransform {
  datePipe: DatePipe;
  /**
   * Creates an instance of custom date pipe.
   */
  constructor() {
    this.datePipe = new DatePipe(TranslateService.getCurrentLocale());
  }
  /**
   * Transforms custom date pipe
   * @param value Date to be transformed
   * @param [customFormat] any custom format
   * @param [seperator] custom seperator
   * @returns transformed value
   */


  // Pipe to Get value in the format desired  like only date or or only month depending on 
  // customFormat argument passed into this pipe
  
  transform(value: any, customFormat?: any, seperator?: any): any {
    if (customFormat) {
      return value ? this.datePipe.transform(value, customFormat) : "-";
    }
    return value
      ? this.datePipe.transform(value, "d MMM y")
      : seperator !== undefined && seperator !== null
      ? seperator
      : "-";
  }
}
