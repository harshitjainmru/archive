import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "dateAgo",
})
export class DateAgoPipe implements PipeTransform {
  
  
  /* time lapse betweeen current date and the date at which 
  notification has been created */
  
  transform(value: any, ...args: unknown[]): unknown {
    if (value) {
      const seconds = Math.floor((+new Date() - +new Date(value)) / 1000);
      if (seconds < 29)
        // less than 30 seconds ago will show as 'Just now'
        return "Just now";
      const intervals = {
        year: 31536000,
        month: 2592000,
        week: 604800,
        day: 86400,
        hr: 3600,
        m: 60,
        second: 1,
      };
      let counter;
      for (const i in intervals) {
        counter = Math.floor(seconds / intervals[i]);
        if (counter > 0)
          if (counter === 1) {
            return counter + " " + i + " ago"; // singular (1 day ago)
          } else {
            console.log(i == "m");

            return counter + " " + (i == "m" ? i + " ago" : i + "s ago"); // plural (2 days ago)
          }
      }
    }
    return value;
  }
}
