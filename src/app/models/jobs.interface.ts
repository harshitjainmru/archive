export interface BusinessCategory {
  status: string;
  _id: string;
  name: string;
}

export interface JobCategory {
  status: string;
  name: string;
  jobCategoryId: string;
}

export interface JobRole {
  status: string;
  _id: string;
  name: string;
  jobCategory: JobCategory;
}

export interface Skill {
  name: string;
  _id: string;
}

export interface Experience {
  type: string[];
  year: number;
}

export interface CompanyDetails {
  companyName: string;
}

export interface User {
  _id: string;
  profilePicture: string;
  fullName: string;
  companyDetails: CompanyDetails;
}

export interface AdditionalAllowance {
  salary: number;
  currency: number;
}

export interface TimeSlot {
  title: string;
  startTime: Date;
  endTime: Date;
  additionalAllowance: AdditionalAllowance;
}

export interface Country {
  _id: string;
  name: string;
  countryCode: string;
}

export interface JobArea {
  _id: string;
  name: string;
}

export interface Address {
  _id: string;
  country: Country;
  jobArea: JobArea;
  title: string;
  cityName: string;
  addressLine: string;
}

export interface JobSite {
  noOfWorkers: number;
  noOfWorkersHired: number;
  _id: string;
  addressId: string;
  timeSlots: TimeSlot[];
  address: Address;
}

export interface BaseSalary {
  salary: number;
  currency: number;
}

export interface Timeline {
  startDate: Date;
  endDate: Date;
}

export interface WorkingHours {
  hours: number;
  days: number;
}

export interface PostedBy {
  addedBy: string;
  _id: string;
}

export interface JobItem {
  _id: string;
  vacancies: number;
  jobStep: number;
  jobStatus: string;
  status: string;
  postedOn: Date;
  businessCategory: BusinessCategory;
  countryId: string;
  jobRole: JobRole;
  description: string;
  requirment: string;
  title: string;
  skills: Skill[];
  experience: Experience;
  user: User;
  jobSite: JobSite[];
  createdAt: Date;
  updatedAt: Date;
  jobId: string;
  baseSalary: BaseSalary;
  timeline: Timeline;
  workingHours: WorkingHours;
  postedBy?: PostedBy;
  totalAppliedCount: number;
}
