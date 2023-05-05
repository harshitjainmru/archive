import { Pipe, PipeTransform } from '@angular/core';
import { CUSTOM_CURRENCY_IMAGE } from 'src/app/constants/enums';
import { UtilityService } from 'src/app/services/utility.service';

@Pipe({
  name: 'currencyImage'
})
export class CurrencyImagePipe implements PipeTransform {

  customCurrencyImage = CUSTOM_CURRENCY_IMAGE;

  constructor(
    private utilService:UtilityService
  ){}

  // Get currency image for the respective currency Icon from CountryData.currencyIcon 
  // inside job step 3

  transform(value: unknown, ...args: unknown[]): unknown {
    let country = this.utilService.currentCountry.name.toUpperCase();

    return `assets/icons/${this.customCurrencyImage[country]}`;
  }

}
