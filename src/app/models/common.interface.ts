import { FormControl, Form } from "@angular/forms";

export interface ICountry {
  countryCode: string;
  image: string;
  name: string;
  _id: string;
  currency: number;
  currencyIcon: string;
}

export interface UserLocation {
  name: string;
  street: string;
  city: string;
  postalCode: string;
  country: string;
  type: string;
  coordinates: number[];
  stateId: string;
  cityId: string;
}

export interface UserProfile {
  _id: string;
  location: UserLocation;
  isProfileCompleted: boolean;
  status: string;
  profilePicture: string;
  accountType: number;
  firstName: string;
  middleName: string;
  lastName: string;
  email: string;
  countryCode: string;
  phoneNo: string;
  countryName: string;
  countryId: string;
  businessCategories: any[];
  createdAt: Date;
  updatedAt: Date;
  profileSteps: number;
  companyDetails: ICompanyDetails;
  verifiedDocumentUrl: Array<any>;
}
export interface ICompanyDetails {
  companyDescription: string;
  companyLogo: string;
  companyName: string;
  companyPhoto: string;
  companyWebsite: string;
  tradingName: string;
  uenNumber: string;
}
export interface UserCountry {
  countryCode: string;
  currency: Number;
  currencyIcon: String;
  image: String;
  name: String;
  _id: String;
}

export interface PageConfig {
  total: number;
  currentPage: number;
  pageSize?: number;
  isNext?: boolean;
}

export interface ISearchAutocomplete {
  control?: FormControl;
  selectedControl?: FormControl;
  url: string;
  viewKey: string;
  valueKey: string;
  placeholder: string;
  selectedValue?: any;
  selectedViewValue?: any;
  prefilledList?: any;
  controlValidator?: any;
  isNavigation?: boolean;
  isPagination?: boolean;
  showError?: boolean;
  searchQuery?: any;
  localSave?: boolean;
  localSaveKey?: string;
  limit?: number;
  queryParams?:any;
}

export interface IGoogleAnalyticsEvent {
  eventName: string;
  eventCategory: string;
  eventAction: string;
  eventLabel: string;
  eventValue?: number;
}

export interface ICheckBox {
  list: any[];
  label: string;
  selectedList?: any[];
  viewKey: string;
  valueKey: string;
  control: FormControl;
  type?: string;
  secondaryLabel?: any;
}
export interface IRange {
  label: string;
  text: string;
  unit?: string;
  config:{
    step:number;
    connect?:boolean;
    behaviour:string;
    range?:{
      min: number;
      max: number;
    };
    pips?:any,
    tooltips:[boolean,boolean]
  };
  selectedMin:FormControl;
  selectedMax:FormControl
  selectedRangeDefault:any[];
}

export interface ITime{
  label?:{
    startTime:string;
    endTime:string;
  };
  labelKeys?:{
    startTime:string;
    endTime:string;
  }
  startTime:FormControl;
  endTime:FormControl;
  placeholder?:{
    startTime:string;
    endTime:string;
  };
  maxLimtTime?:Date,
  minLimitTime?:Date,
  title?:string;
  stepMinute:number;
  startAt?:string;
  
}

export interface ISingleDropdown {
  label: string;
  placeholder: string;
  control: FormControl;
  list: any[];
  viewKey: string;
  valueKey: string;
}

export interface IDateRange {
  label?: {
    startDate: string;
    endDate: string;
  };
  startDate: FormControl;
  endDate: FormControl;
  iSaveAllowed?: FormControl;
  maxDateRange?:Date,
  maxRange?:number
}

export interface IDate {
  label?: string;
  date: FormControl;
  iSaveAllowed?: FormControl;
}

export interface Job_List {
  name: string;
  position: number;
  status: string;
  action: any;
}

export interface Schedule_List {
  name: string;
  position: number;
  status: string;
  action: any;
}

export interface Calendar_List {
  name: string;
  position: number;
  status: string;
  action: any;
}

export interface Timehseet_List {
    "userData":any,
    "jobData":any,
    "shiftDate":any,
    "clockIn":any,
    "clockOut":any,
    "totalShiftHours":any,
    "action":any,
    "multiAction":any
}

export interface ScheduleDropdown {
  _id: string;
  title: string;
  startTime: Date;
  endTime: Date;
  status: number;
  shiftDate: Date;
  totalHours: number;
  control: string;
  list: any[];
  isEdit: boolean;
}

export interface IQuildConfig {
  control: FormControl;
  label: string;
  editControl?: FormControl;
  htmlcontrol?: FormControl;
}