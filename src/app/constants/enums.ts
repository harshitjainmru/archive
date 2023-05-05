export enum PROFILE_STEPS {
  FIRST_STEP = 1,
  SECOND_STEP = 2,
  THIRD_STEP = 3,
  FOUTH_STEP = 4,
}

export enum DOC_TYPE {
  LOGO = 1,
  CERTY = 2,
  DOC = 3,
}

export enum DATETIME_TYPE {
  DATE_TO_TIME = 1,
  TIME_TO_DATE = 2,
}

export enum PROFILE_STEPS_NAME {
  COMPANY_DETAILS = "Company Details",
  BUSINESS_CATEGORY = "Business Category",
  DOCUMENT = "Document",
}

export enum JOB_STEPS_NAME {
  JOB_DETAILS = "Job Details",
  JOB_INFORMATION = "Job Information",
  SHIFTS_PATROLL = "Shifts & Payroll",
  JOB_PREVIEW = "Job Preview",
}

export enum JOB_STEP_NUMBER {
  STEP_1 = 1,
  STEP_2 = 2,
  STEP_3 = 3,
  STEP_4 = 4,
}
export enum EXPERIENCE_TYPE {
  NO_EXP = "1",
  EXP = "2",
}
export enum CheckBoxType {
  parent = 1,
  child = 2,
}

export enum USER_TYPE {
  BUSINESS_CLIENT = 1,
  STAFF_WORKER = 2,
}

export enum DOC_TYPE_NAME {
  APPLICATION = "application",
  PDF = "pdf",
  IMAGE = "image",
}

export enum JOB_TYPE {
  SORT_TIME = "Part/Short Time",
  LONG_TIME = "Longer Term/Designated",
}

export enum JOB_LOCATION_TYPE {
  SINGLE = "single",
  MULTI = "multi",
}

export enum INFORMATION_TYPE {
  COMPANY_NAME = "Company Name (Legal Entity Name) is the name that appears on the formation document of a corporation or other statutory business entity.",
  TRADE_NAME = "Trade Name does not need to include additional words or legal phrases (e.g., Corp, Pte. Ltd, etc.). It’s the name the public sees. Think of it as your business’s nickname.",
}

export enum SOCIAL_TYPE {
  facebook = "facebook",
  linkedin = "linkedin",
  apple = "apple",
}

export enum DAY_TYPE {
  SUN = "sun",
  MUN = "mon",
  TUE = "tue",
  WED = "wed",
  THU = "thu",
  FRI = "fri",
  SAT = "sat",
}

export enum FIREBASE_NODES {
  user = "user",
  messages = "messages",
  inbox = "inbox",
  notification = "notification",
  blockList = "blockList",
}

export enum PLATFORM_USER_TYPE {
  user = 1,
  host = 2,
}

export enum CHAT_USER_STATUS {
  active = 0,
  blocked = 1,
}

export enum MESSAGE_READ_STATUS {
  sent = 0,
  read = 1,
}
export enum CHAT_MESSAGE_TYPE {
  text = 1,
  video = 2,
  audio = 3,
  doc = 4,
  image = 5,
  demo = 6,
}

export enum DEMO_STATUS {
  accept = 1,
  reject = 2,
  pending = 3,
}

export enum CHAT_ACTION_TYPE {
  viewProfile = "viewProfile",
  deleteChat = "deleteChat",
  blockUser = "blockUser",
  unblockUser = "unblockUser",
}
export enum DEVICE_TYPE {
  // androi = 1,
  // ios = 2,
  // web = 3,
  androi = 0,
  ios = 1,
  web = 2,
}
export enum USER_COMPANY_TYPE {
  company = "company",
  individual = "individual",
}

export enum FAVOURITE_ACTION_TYPE {
  add = 1,
  remove = 0,
}

export enum BOOKING_STATUS {
  previouslyBooked = 0,
  neverBooked = 1,
}

export enum PAYMENT_PLAN {
  DAILY = 0,
  MONTHLY = 1,
  YEARLY = 2,
  COMPLETE = 3,
}

export enum CANCELLATION_DURATION_TYPE {
  DAYS = 0,
  HOURS = 1,
}

export enum COMPANY_AGNECY_TYPE {
  COMPANY = 0,
  FREELANCER = 1,
}
export enum BOOKING_PAYMENT_STATUS {
  PENDING = 0,
  SUCCESS = 1,
  FAILURE = 2,
}

export enum NOTIFICATION_STATUS {
  ENABLE = 1,
  DISABLE = 2,
}
export enum PAYMENT_STATUS {
  PENDING = 0,
  SUCCESS = 1,
  FAILURE = 2,
  CANCELLED = 4,
}

export enum LOCAL_REASON {
  others = "Others",
}

export enum RATING_SORT {
  ASC = 1,
  DSC = -1,
}

export enum PAYMENT_LIST_STATUS {
  completed = "completed",
  cancelled = "cancelled",
}

export enum STATIC_PAGES_TYPE {
  TERMS = 1,
  PRIVACY = 2,
  ABOUT = 3,
  FAQ = 4,
  STORY = 5,
  TEAM = 6,
  REFUND = 8,
  PAYMENT = 9,
}

export enum PROPERTY_SORT_TYPE {
  price = "price",
  avgRating = "avgRating",
}

export enum SOCIAL_LOGIN_TYPE {
  LINKEDIN = "linkedin",
  FACEBOOK = "facebook",
}

export enum SUB_COMPANY_TYPE {
  AGENCY = 0,
  INDIVIDUAL = 1,
}

export enum PROFILE_LEVEL {
  BEGINNER = 1,
  INTERMEDIATE = 2,
}

export enum FILER_POPUP {
  APPLY = 1,
  RESET = 2,
}

export enum COMMON_STATUS {
  ACTIVE = "active",
  BLOCKED = "blocked",
  DELETED = "deleted",
}

export enum SUCCESS_PARENT_TYPE {
  REGISTRATION = "registration",
  RESET_PASSWORD = "resetPassword",
  COMPANY_PROFILE = "companyProfile",
  USER_PROFILE = "userProfile",
}

export enum DROPDOWN_TYPE {
  STATE = 1,
  CITY = 2,
  JOBAREA = 3,
  BUSINESS_CATEGORY = 4,
  JOBNAME = 5,
}
export enum CLIENT_PROFILE_STATUS {
  VERIFIED = "Verified",
  UN_VERIFIED = "Unverified",
  REJECTED = "Rejected",
}
export enum CUSTOM_HANDLE_ERROR {
  MISSING_LOCAL_COUNTRY = 1,
  DROPDOWN_LIMIT = "limit-error",
  CUSTOM_MESSAGE_ERROR = 407,
  RETURN_STATE = "return-state",
  DUBLICATE_USERS = 411,
  FILE_SIZE = 1,
  FILE_TYPE = 2,
  PHONE_NOT_VERIFIED = 411,
  MISSING_DATE = "missing-date",
  CONTINUE = "continue",
}

export enum JOBS_LIST_STATUS {
  MY_POSTING = 1,
  COMPLETED_JOBS = 2,
  DRAFT = 3,
  ONGOING = 4,
}

export enum JOB_ROLE {
  EXPIERENCE = 1,
  NON_EXPIERENCE = 2,
}

export enum DIALOG_RESPONSE {
  APPLY = 1,
  CANCEL = 2,
  DISMISS = 3,
}

export enum CURRENCY_TYPE {
  MALAYSIA = "MYR",
  SINGAPORE = "SGD",
}

export enum CURRENCY_TYPE_NUMBER {
  MALAYSIA = 1,
  SINGAPORE = 2,
}

export enum COUNTRY_LOCALE {
  MALAYSIA = "ms-SG",
  SINGAPORE = "zh",
}

export enum WEEK_UPDATE {
  INCREEMENT = 1,
  DECREEMENT = 2,
}

export enum MONTH_UPDATE {
  INCREEMENT = 1,
  DECREEMENT = 2,
}

export enum SCHEDULE_JOB_STATUS {
  WORKING = 1,
  NON_WORKING = 2,
  REST = 3,
}

export enum CANDIDATE_STATUS {
  APPLIED = "APPLIED",
  REVIEWED = "REVIEWED",
  SHORTLISTED = "SHORTLISTED",
  REJECTED = "REJECTED",
  HIRED = "HIRED",
  INVITATION = "INVITATION",
  CONTRACT_SEND = "CONTRACT_SEND",
  CONTRACT_SIGNED = "CONTRACT_SIGNED",
  NOT_SUITABLE = "NOT_SUITABLE",
  CANCELED = "CANCELED",
  CANCELLED = "CANCELLED",
  CONTRACT_WITHDRAW = "CONTRACT_WITHDRAW",
  JOB_OFFER_ACCEPTED="JOB_OFFER_ACCEPTED"
  // REJECTED="REJECTED"
}

export enum COUTRY_STATIC_FLAG {
  MALAYSIA = 1,
  SINGAPORE = 2,
}

export enum SWITCH_CUSTOM_CHECKBOX {
  CALENDAR_CHECKBOX = "calendar",
  TIMESHEET_SELECTION = "timesheet_list",
}
export enum CUSTOM_CURRENCY_IMAGE {
  MALAYSIA = "cur-2.svg",
  SINGAPORE = "cur-1.svg",
}

export enum CUSTOM_DATE_FORMATS {
  ONLY_DAY = "dd",
  DAY_OF_MONTH = "EEE",
  shortTime = "shortTime",
}

export enum TIMESHEET_STATUS {
  UNAPPROVED = 1,
  APPROVED = 2,
  REJECTED = 3,
  LEAVE = 4,
  EDIT = 6,
  WORKERUNAPPROVED = 5,
}
export enum ATTENDANCE_STATUS {
  ONTIME = 1,
  LATEIN = 2,
  EARLYOUT = 3,
  LEAVE = 4,
}

export enum BULK_SELECTION_TIMESHEET {
  CLEAN = 1,
  LATEIN = 2,
  EARLYOUT = 3,
  MISSED = 4,
  OVERTIME = 5,
}

export enum TIMESHEET_TYPE {
  EVENT = 1,
  NONEVENT = 2,
}
export enum TIME_DIFFERENCE {
  HOURS = 1,
  MINUTES = 2,
  HOURS_MINUTES = 3,
}

export enum NOTIFICATION_TYPE {
  ADMIN_NOTIFICATION = "ADMIN_NOTIFICATION",
  // JOB_ACTION= 'JOB_ACTION',
  TIMESHEET_ACTION = "TIMESHEET_ACTION",
  JOB_ACTION_APPLIED = "JOB_ACTION_APPLIED",
  JOB_ACTION_SHORTLIST = "JOB_ACTION_SHORTLIST",
  JOB_ACTION_REVIEWED = "JOB_ACTION_REVIEWED",
  JOB_ACTION_REJECTED = "JOB_ACTION_REJECTED",
  JOB_ACTION_HIRED = "JOB_ACTION_HIRED",
  JOB_ACTION_NOT_SUITABLE = "JOB_ACTION_NOT_SUITABLE",
  JOB_OFFER_SEND = "JOB_OFFER_SEND",
  JOB_OFFER_SIGNED = "JOB_OFFER_SIGNED",
  JOB_OFFER_REJECTED = "JOB_OFFER_REJECTED",
  SHIFT_ACTION_WORKER = "SHIFT_ACTION_WORKER",
}

export enum JOB_CANCEL_PAUSE {
  CANCEL = 1,
  PAUSE = 2,
}

export enum CONFIRM_MODAL_TYPE {
  PARAGRAPH = 1,
  ACTION = 2,
}

export enum PROFILE_STATUS {
  VERIFIED = "Verified",
  UNVERIFIED = "Unverified",
  REJECTED="Rejected"
}
export enum APPLY_TYPE {
  APPLIED = 1,
  INVITATION = 2,
  JOB_OFFER = 3,
}
