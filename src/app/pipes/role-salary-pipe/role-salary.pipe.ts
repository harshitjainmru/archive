import { Pipe, PipeTransform } from "@angular/core";
import { UtilityService } from "src/app/services/utility.service";

@Pipe({
  name: "roleSalary",
})
export class RoleSalaryPipe implements PipeTransform {
  currency = this.utilService.currentCountry.currency;
  constructor(private utilService: UtilityService) {}

  // Depending upon role return minimum and maximum salary of a item

  transform(value: any, type: "min" | "max" | "suggested"): number {
    // console.log(value);



    let item = value.salary.find((item) => item.currency === this.currency);

    switch (type) {
      case "max":
        return item.maximum;

      case "min":
        return item.minimum;

      case "suggested":
        return item.suggested;

      default:
        return item.minimum;
    }
    return null;
  }
}
