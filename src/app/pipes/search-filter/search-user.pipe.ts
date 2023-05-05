import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchUser'
})
export class SearchUserPipe implements PipeTransform {

  public transform(value, keys: string, term: string) {
    try {
      term=term.trim();
      if (!term) {return value;}
    
      const resultArray = (value || []).filter(item => keys.split(',').some(
        key => item.hasOwnProperty(key) && new RegExp(term, 'gi').test(item[key])));
        
      return resultArray;
    } catch (error) {
      return value;
    }
  }

}
