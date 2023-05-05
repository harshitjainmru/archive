import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'selectFilter'
})
export class SelectFilterPipe implements PipeTransform {

  public transform(value, keys: string, term: string) {
    if (!term || !keys) {
      return value;
    } else {
      term = term.toString().replace('+', '');
    }
    const resultArray = (value || []).filter(item => keys.split(',').some(
      key => item.hasOwnProperty(key) && new RegExp(term, 'gi').test(item[key])));

    if (resultArray.length === 0) {
      const conditionalArr = [{ found: true, message: 'Not Found' }];
      return conditionalArr;
    }
    return resultArray;
  }

}
