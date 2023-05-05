import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'countryFilter'
})
export class CountryFilterPipe implements PipeTransform {

  
  public transform(value, keys: string, term: string) {
    if (!term) {
      return value;
    } else {
      term = term.replace('+', '');
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
