import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "skillsTooltip",
})
export class SkillsTooltipPipe implements PipeTransform {
  transform(value: Array<any>, ...args: unknown[]): unknown {
    let arr = value.slice(2, value.length);
    arr = arr.map((item) => item.name);
    // console.log(arr);

    return arr.join(" , ");
  }
}
