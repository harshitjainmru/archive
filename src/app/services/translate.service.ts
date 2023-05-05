import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { environment } from '../../environments/environment';
import { LANGUAGES } from '../constants/languages';
import localeFr from '@angular/common/locales/fr';
import localeEn from '@angular/common/locales/en';
import localeCs from '@angular/common/locales/cs';
import localeNl from '@angular/common/locales/nl';
import localeDe from '@angular/common/locales/de';
import localeIt from '@angular/common/locales/it';
import localePl from '@angular/common/locales/pl';
import localeRo from '@angular/common/locales/ro';
import localeRu from '@angular/common/locales/ru';
import localeEs from '@angular/common/locales/es';
import localeTr from '@angular/common/locales/tr';
import { registerLocaleData } from '@angular/common';
import { STATIC_COUNTRY_ID } from '../constants/urls';
import { COUTRY_STATIC_FLAG } from '../constants/enums';

@Injectable({
  providedIn: 'root',
})
export class TranslateService {
  static data: any;
  static currentLanguage;

  static staticCountryIds;

  // This will get current language from local storage
  static getCurrentLanguage() {
    return localStorage.getItem(environment.languageKey);
  }

  // Get current local language and get language from local storage
  static getCurrentLocale() {
    const language = localStorage.getItem(environment.languageKey);
    for (const lang in LANGUAGES) {
      if (LANGUAGES[lang].value == language) {
        // console.log("LANGUAGES[lang].locale", LANGUAGES[lang].locale);

        return LANGUAGES[lang].locale;
      }
    }
    return LANGUAGES.ENGLISH.locale;
  }

  constructor(private _http: HttpService) {}

  // This will check languages validity
  checkLanguageValidity(language: string) {
    if (!language) {
      return false;
    }
    for (let lang in LANGUAGES) {
      if (LANGUAGES[lang].value == language) {
        TranslateService.currentLanguage = lang;
        return true;
      }
    }
    return false;
  }

  // This will fetch language data from http fetchlanguage
  async fetchLanguageData() {
    try {
      const language = localStorage.getItem(environment.languageKey);
      let langPath;
      if (this.checkLanguageValidity(language)) {
        langPath = `/assets/i18n/${language}.json`;
      } else {
        localStorage.setItem(environment.languageKey, LANGUAGES.ENGLISH.value);
        langPath = `/assets/i18n/en.json`;
      }
      const langData = await this._http.fetchLanguageData(langPath).toPromise();
      TranslateService.data = Object.assign({}, langData);

      const dataIds = await this._http
        .get(
          STATIC_COUNTRY_ID,
          {
            page: 1,
          },
          { skipDeviceDetail: true }
        )
        .toPromise();
      TranslateService.staticCountryIds = dataIds.data.result.map((items) => {
        if (items.flag === COUTRY_STATIC_FLAG.MALAYSIA) {
          return {
            ...items,
            currencyIcon: 'assets/icons/cur-2.svg',
            currency: 2,
          };
        } else {
          return {
            ...items,
            currencyIcon: 'assets/icons/cur-1.svg',
            currency: 1,
          };
        }
      });
      this.registerCountryLocally();
      this.registerLocale(language);
      return TranslateService.data;
    } catch (error) {
      return Promise.reject(error);
    }
  }

  //Register global data to be used internally by Angular.
  registerLocale(lang) {
    switch (lang) {
      case 'en':
        registerLocaleData(localeEn, TranslateService.getCurrentLocale());
        break;
      case 'cs':
        registerLocaleData(localeCs, TranslateService.getCurrentLocale());
        break;
      case 'nl':
        registerLocaleData(localeNl, TranslateService.getCurrentLocale());
        break;
      case 'fr':
        registerLocaleData(localeFr, TranslateService.getCurrentLocale());
        break;
      case 'de':
        registerLocaleData(localeDe, TranslateService.getCurrentLocale());
        break;
      case 'it':
        registerLocaleData(localeIt, TranslateService.getCurrentLocale());
        break;
      case 'pl':
        registerLocaleData(localePl, TranslateService.getCurrentLocale());
        break;
      case 'ro':
        registerLocaleData(localeRo, TranslateService.getCurrentLocale());
        break;
      case 'ru':
        registerLocaleData(localeRu, TranslateService.getCurrentLocale());
        break;
      case 'es':
        registerLocaleData(localeEs, TranslateService.getCurrentLocale());
        break;
      case 'tr':
        registerLocaleData(localeTr, TranslateService.getCurrentLocale());
        break;

      default:
        break;
    }
  }

  // This will set in localstorage countryKey of value
  registerCountryLocally() {
    const currentCountry = JSON.parse(
      localStorage.getItem(environment.countryKey)
    );
    if (currentCountry) {
      const updateCountry = TranslateService.staticCountryIds.find(
        (items) => items.flag === currentCountry.flag
      );
      localStorage.setItem(
        environment.countryKey,
        JSON.stringify(updateCountry)
      );
    }
  }

  // This will set language in lcoal storage
  setLanguage(lang: string) {
    localStorage.setItem(environment.languageKey, lang);
  }
}
