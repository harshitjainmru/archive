import { Pipe, PipeTransform } from "@angular/core";
import * as moment from "moment";

@Pipe({
  name: "displayMonth",
})
export class DisplayMonthPipe implements PipeTransform {

  /*
    Returns differnce of month depending upon the value of startDate month / endDate Month 
    and startDate year and endDate year by subtracting the values using MomentJS
    also whether there exists forGraph or not
     
  */




  transform(value: { fromDate: Date; toDate: Date }, forGraph?): unknown {
    if (!value || !value.fromDate || !value.toDate) {
      return " - ";
    }

    if (forGraph) {
      const fromDateMonth = moment(value.fromDate).month();
      const endDateMonth = moment(value.toDate).month();
      const fromDateYear = moment(value.fromDate).year();
      const endDateYear = moment(value.toDate).year();
      if (fromDateMonth != endDateMonth && fromDateYear != endDateYear) {
        return `${moment(value.fromDate).format("MMM")} ${moment(
          value.fromDate
        ).format("YY")}  - ${moment(value.toDate).format("MMM")} ${moment(
          value.toDate
        ).format("YY")}`;
      } else if (fromDateMonth != endDateMonth) {
        return `${moment(value.fromDate).format("MMM")} - ${moment(
          value.toDate
        ).format("MMM")} ${moment(value.fromDate).format("YYYY")}`;
      } else {
        return `${moment(value.toDate).format("MMM")} ${moment(
          value.fromDate
        ).format("YYYY")}`;
      }
    } else {
      const fromDateMonth = moment(value.fromDate).month();
      const endDateMonth = moment(value.toDate).month();

      if (fromDateMonth != endDateMonth) {
        return `${moment(value.fromDate).format("MMM")} - ${moment(
          value.toDate
        ).format("MMM")} ${moment(value.fromDate).format("YYYY")}`;
      } else {
        return `${moment(value.toDate).format("MMM")} ${moment(
          value.fromDate
        ).format("YYYY")}`;
      }
    }
    return null;
  }
}
