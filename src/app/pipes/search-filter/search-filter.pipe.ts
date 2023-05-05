import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchFilter'
})
export class SearchFilterPipe implements PipeTransform {

  public transform(value, keys: string, term: string) {
    console.log("ayush");
    
    console.log(value);
    console.log(keys);
    console.log(term);
    
    
    if (!term) {
      return value;
    }
    const resultArray = (value || []).filter(item => keys.split(',').some(
      key => item.hasOwnProperty(key) && new RegExp(term, 'gi').test(item[key])));

    if (resultArray.length === 0) {
      const conditionalArr = [{ found: 'true', message: 'Not Found' }];
      return conditionalArr;
    }

    return resultArray;
  }

}
