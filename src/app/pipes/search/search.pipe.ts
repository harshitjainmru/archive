import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "search",
})
export class SearchPipe implements PipeTransform {

  // Transforms the search values by trimming the value and 
  // getting the value to lower case whether they are in array
  // or plain strings

  transform(list: any[], text: string, key?: string): any[] {
    
    const search = text && text.trim();

    // console.log({ search });

    return search && list
      ? list.filter((item) => {
          // console.log(item[key]);
          return (
            (key
              ? item[key].toLocaleLowerCase()
              : item.toLocaleLowerCase()
            ).indexOf(search.toLocaleLowerCase()) >= 0
          );
        })
      : list;
  }
}
