import { Injectable } from '@angular/core';
import { DateAdapter } from '@angular/material/core';
import {
  addDays,
  addMonths,
  addYears,
  format,
  getDate,
  getDaysInMonth,
  getMonth,
  getYear,
  parse,
  setDay,
  setMonth,
  toDate,
} from 'date-fns';

// CONFIG. Use environment or something for a dynamic locale and settings

import { enUS as locale } from 'date-fns/locale';
const WEEK_STARTS_ON = 1; // 0 sunday, 1 monday...

export const MAT_DATE_FNS_DATE_FORMATS = {
  parse: {
    dateInput: 'dd/MM/yyyy',
  },
  display: {
    dateInput: 'dd MMM yyyy',
    monthYearLabel: 'LLL y',
    dateA11yLabel: 'MMMM d, y',
    monthYearA11yLabel: 'MMMM y',
  },
};

// in app.module.ts:
/*
{
  provide: DateAdapter,
  useClass: DateFnsDateAdapter
},
{
  provide: MAT_DATE_FORMATS,
  useValue: MAT_DATE_FNS_DATE_FORMATS
},
 */

function range(start: number, end: number): number[] {
  let arr: number[] = [];
  for (let i = start; i <= end; i++) {
    arr.push(i);
  }

  return arr;
}

@Injectable({
  providedIn: 'root',
})
export class DateFnsDateAdapter extends DateAdapter<Date> {
  //Adds the given number of days to the date.
  addCalendarDays(date: Date, days: number): Date {
    return addDays(date, days);
  }

  // This will the number of months to add and date to add months.
  addCalendarMonths(date: Date, months: number): Date {
    return addMonths(date, months);
  }

  // This will Adds the given number of years to the date
  addCalendarYears(date: Date, years: number): Date {
    return addYears(date, years);
  }

  // This will clones the given date.
  clone(date: Date): Date {
    return toDate(date);
  }

  //Creates a date with the given year, month, and date.
  createDate(year: number, month: number, date: number): Date {
    return new Date(year, month, date);
  }

  // This will Formats a date as a string according to the given format.
  format(date: Date, displayFormat: any): string {
    return format(date, displayFormat, {
      locale,
    });
  }

  //Gets the date of the month component of the given date.
  //@param date — The date to extract the date of the month from.
  getDate(date: Date): number {
    return getDate(date);
  }

  //Gets a list of names for the dates of the month.
  //@returns — An ordered list of all date of the month names, starting with '1'
  getDateNames(): string[] {
    return range(1, 31).map((day) => String(day));
  }

  //Gets the day of the week component of the given date.
  //@param date — The date to extract the day of the week from.
  getDayOfWeek(date: Date): number {
    return parseInt(format(date, 'i'), 10);
  }

  //Gets a list of names for the days of the week.
  //@param style — The naming style (e.g. long = 'Sunday', short = 'Sun', narrow = 'S').
  getDayOfWeekNames(style: 'long' | 'short' | 'narrow'): string[] {
    const map = {
      long: 'EEEE',
      short: 'E..EEE',
      narrow: 'EEEEE',
    };

    let formatStr = map[style];
    let date = new Date();

    return range(0, 6).map((month) =>
      format(setDay(date, month), formatStr, {
        locale,
      })
    );
  }

  //Gets the first day of the week.
  getFirstDayOfWeek(): number {
    return WEEK_STARTS_ON;
  }

  //Gets the month component of the given date.
  getMonth(date: Date): number {
    return getMonth(date);
  }

  //This will gets a list of names for the months.
  //@param style — The naming style (e.g. long = 'January', short = 'Jan', narrow = 'J').
  getMonthNames(style: 'long' | 'short' | 'narrow'): string[] {
    const map = {
      long: 'LLLL',
      short: 'LLL',
      narrow: 'LLLLL',
    };

    let formatStr = map[style];
    let date = new Date();

    return range(0, 11).map((month) =>
      format(setMonth(date, month), formatStr, {
        locale,
      })
    );
  }

  // This will gets the number of days in the month of the given date.
  getNumDaysInMonth(date: Date): number {
    return getDaysInMonth(date);
  }

  // This will gets the year component of the given date.
  getYear(date: Date): number {
    return getYear(date);
  }

  // This will gets the name for the year of the given date.
  getYearName(date: Date): string {
    return format(date, 'yyyy', {
      locale,
    });
  }

  // This will gets date instance that is not valid.
  invalid(): Date {
    return new Date(NaN);
  }

  // This will Checks whether the given object is considered a date instance by this DateAdapter.
  isDateInstance(obj: any): boolean {
    return obj instanceof Date;
  }

  // This will Checks whether the given date is valid.
  isValid(date: Date): boolean {
    return date instanceof Date && !isNaN(date.getTime());
  }

  // This will Parses a date from a user-provided value.
  parse(value: any, parseFormat: any): Date | null {
    return parse(value, parseFormat, new Date(), {
      locale,
    });
  }

  //This will The date to get the ISO date string .
  toIso8601(date: Date): string {
    return date.toISOString();
  }

  //Gets today's date.
  today(): Date {
    return new Date();
  }
}
