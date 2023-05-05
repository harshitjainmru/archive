export enum ACCOUNT_API_GROUP {
  VERIFY_RESET_OTP = "user/verifyResetOtp",
  CHECK_COWERKER_EMAIL = "user/coworker/checkCoworkerEmailExists",
  SEND_OTP = "user/forgot-password-phone",
  FORGOT_WITH_EMAIL = "user/forgot-password-email",
  VERIFY_OTP = "user/verify-otp",
  UPDATE_VERIFY_OTP = "user/update-verify-otp",
  RESET_PASSWORD = "user/reset-password",
  LOGIN = "user/login",
  LOGOUT = "user/logout",
  SIGNUP = "user/signup",
  RESEND = "user/resendOtp",
  RESEND_OTP = "user/change-phone-number/resend-otp",
  RESEND_OTP_OUT = "user/resend-otp",
  RESEND_EMAIL = "user/verificationEmailLink",
  EDIT_PHONE_RESEND_OTP = "user/changePhoneNo",
  VERIFY_EDIT_PHONE_OTP = "user/verifyChangePhoneOtp",
  CHANGE_PASSWORD = "user/changePassword",
  PROFILE_SETUP = `user/profile-setup-client`,
  PROFILE_UPDATE = `user/edit-profile-client-info`,
  COMPANY_UPDATE = `user/edit-profile-client-business`,

  BUSINESS_CATEGORY = `business-categories`,
  JOB_AREA = `user/job-area`,
  // VALIDATE_TOKEN = "user/verify-reset-token",
  VALIDATE_TOKEN ="user/verifyResetToken",
  DROPDWON_COUNTRY = "dropdown/country",
  DROPDWON_STATE = "dropdown/state",
  DROPDWON_ZIPCODE = "dropdown/zip-code",
  DROPDWON_CITY = "dropdown/city",
  DROPDWON_COMMON = "user/dropdown",
  DROPDWON_SKILL = "skills",
  DROPDWON_JOB_ROLE = "job-roles",
  DROPDWON_SHIFT = "shifts",
  HIRING = "hiring",
}

export enum USER_API_GROUP {
  PROFILE_DETAIL = "user/details",
  USERS_CATEGORY = "business-categories",
  USERS_ROLE = "job-roles",
}
export enum SHIFT_API_GROUP {
  SHIFT = "shifts",
  SHIFT_LISTING = "shifts",
  SHIFT_STATUS = "shift/change-status",
}

export enum WORKER_API_GROUP {
  WORKER_LISTING = "worker/listing",
  WORKER_DETAILS = "worker/details",
}

export enum DROPDOWN_API {
  DROPDWON_COUNTRY = "dropdown/country",
  DROPDWON_STATE = "dropdown/state",
  DROPDWON_ZIPCODE = "dropdown/zip-code",
  DROPDWON_CITY = "dropdown/city",
  DROPDWON_SHIFT = "dropdown/shifts",
  DROPDWON_JOBAREA = "user/state-city",
  DROPDWON_META = "dropdown",
}

export const JOBS_API = "jobs";
export const JOB_AREA = "job-area";
export const JOB_ROLES = "job-roles";
export const JOB_ADDRESS = "job/address";
export const JOB_SKILL = "skills";
export const CANDIDATE_LISTING = "hiring/candidate-listing";
export const SEARCH_CANDIDATE_LISTING = "job/search-candidate";
export const CITY_SEARCH = "city";
export const CANCEL_PAUSE_JOB = `apply-jobs/cancel-job`;
export const GET_JOB_SITES=`jobs/jobSite`

//SCHEDULE SHIFT APIS
export const SCHEDULE_SHIFT_LIST = "shift/list";
export const ADD_SCHEDULE = "shift/add";

//APPLICANTS APIS
export const APPLICANT_LIST_GET = `apply-jobs/applicants`;
export const APPLICANT_DETAILS_GET = `apply-jobs/applicant/details`;
export const APPLICANT_STATUS_POST = `apply-jobs/status`;
export const APPLICANT_SEND_CONTRACT_POST = `contract/send`;
export const APPLICANT_SEND_OFFER_POST = `jobs/offer`;
export const APPLICANT_CONTRACT_URL_POST = `contract/signUrl`;
export const STATIC_COUNTRY_ID = `country`;

//SEARCH APPLICANT API's
export const SEARCH_APPLICANT_LIST = `jobs/search-worker`;
export const SEARCH_APPLICANT_DETAIL = `apply-jobs/worker/details`;
export const SEARCH_CANDIDATE_INVITE = `jobs/invite-applicants`;
export const SEARCH_APPLICANT_SEND_CONTRACT_POST = `contract/send-offer`;
export const CHECK_OFFER='candidate';

//CALENDAR APIS
export const GET_MONTHLY_CALENDAR_SCHEDULE = `calendar/shifts`;
export const GET_SHIFTS = `calendar/job-shifts`;

//TIMESHEET APIS
export const GET_PUT_TIMESHEET = `timesheet`;
export const UPDATE_CLOCK_TIME = `timesheet/editTimesheet`;
export const ATTENDANCE_STATUS_COUNT = `timesheet/count`;
//NOTIFICATION URLS
export const FCM_TOKEN_UPDATE = `user/device-details`;
export const NOTIFICATION_LIST_GET = `user/notification`;
export const NOTIFICATION_READ_STATUS_PUT = `user/notification/read-status`;
export const NOTIFICATION_ENABLE_DESABLE = `user/notification`;
export const CONFIRM_PASSWORD = `/user/confirm-password`;
export const DELETE_ACCOUNT = `/user/remove-user-account`
// REQUEST MODULE

export const REQUEST_CREATE_POST = "user/request";
export const REQUEST_CREATE_GET = "user/request";

export const TOTAL_JOBS_GET = `jobsCount`;

export const UPDATE_CONTRACT_STATUS = "contract/update-status";

export const RATE_CANDIDATE = "user/rating";
export const GET_RATINGS_CANDIDATE = (userId) =>
  `user/rating-user?userId=${userId}`;

export const DASHBOARD_GET = `clientDashboard`;
export const DASHBOARD_SHIFT_GET = `/calendar/app-shifts`;

export const DOWNLOAD_TIMESHEET_GET = `timesheet/timesheet-download`;

// tnc-1,faq-2,privacy-0
export const CMS_GET = (type) => `cms/${type}/false`;

//INVOICE API's
export const INVOICE_LIST_GET='pay/list';
export const INVOICE_DOWNLOAD='pay/invoice-download'
