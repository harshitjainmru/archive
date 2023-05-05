import { Pipe, PipeTransform } from '@angular/core';
import { format } from 'date-fns'
import { FNS_DATE_FORMATS } from 'src/app/constants/constant';

@Pipe({
  name: 'constantDate'
})
export class ConstantDatePipe implements PipeTransform {

  /*

  transform the date into below mentioned types as per requirements of the page
  DATE_TIME_TYPE1: "dd MMM y h:mm a",
  DATE_TIME_TYPE2: "dd MMMM y | h:mm a",
  DATE_TIME_TYPE3: "h:mm a dd MMM y",
  DATE_TYPE1: "dd MMM y",
  DATE_TYPE2: "dd MMMM y",
  TIME: "h:mm a",

  */


  transform(data: any, type: string): any {
    if (data) {
      try {
        switch (type) {
          case "DATE_TYPE1":
            return format(new Date(data), FNS_DATE_FORMATS.DATE_TYPE1);
          case "DATE_TYPE2":
            return format(new Date(data), FNS_DATE_FORMATS.DATE_TYPE2);
          case "DATE_TIME_TYPE1":
            return format(new Date(data), FNS_DATE_FORMATS.DATE_TIME_TYPE1);
          case "DATE_TIME_TYPE2":
            return format(new Date(data), FNS_DATE_FORMATS.DATE_TIME_TYPE2);
          case "DATE_TIME_TYPE3":
            return format(new Date(data), FNS_DATE_FORMATS.DATE_TIME_TYPE3);
          case "TIME":
            return format(new Date(data), FNS_DATE_FORMATS.TIME);
          default:
            return data;
        }
      } catch (error) {
        console.log(error);
        return data;
      }
    }
  }

}

