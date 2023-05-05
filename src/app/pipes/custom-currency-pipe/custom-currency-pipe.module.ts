import { NgModule, LOCALE_ID } from "@angular/core";
import { CommonModule, CurrencyPipe } from "@angular/common";
import { CustomCurrencyPipe } from "./custom-currency.pipe";
import { registerLocaleData } from '@angular/common';

// import localeFr from '@angular/common/locales/fr';
import localeFr from '@angular/common/locales/zh'
registerLocaleData(localeFr);

@NgModule({
  declarations: [CustomCurrencyPipe],
  exports: [CustomCurrencyPipe],
  providers: [CurrencyPipe,CustomCurrencyPipe,  {
    provide: LOCALE_ID,
    useValue: 'zh' // 'de' for Germany, 'fr' for France ...
   }],
})
export class CustomCurrencyPipeModule {}
