import { JOB_ROLE, ATTENDANCE_STATUS, NOTIFICATION_TYPE } from "src/app/constants/enums";
import { TranslateService } from "../services/translate.service";
import { environment } from "src/environments/environment";

export const PAGE_OPTION = {
  page: 1,
  limit: 10,
};

export const PAGE_OPTION_LIMIT = (limit) => ({
  page: 1,
  limit: limit,
});

export const PAGE_ONLY_OPTION = {
  page: 1,
};

export const CONDITION_LINKS = {
  TERMSANDCONDITIONSURL :'https://www.pivvot.jobs/terms-conditions/',
  PRIVACYPOLICYURL:"https://www.pivvot.jobs/privacy-policy/"
};


// console.log('aaaao',TranslateService.data)

export const DOCUMENT_FORMAT =
  "image/jpeg,image/png,image/jpg,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,.docx,.doc";

export const DOCUMENT_FORMAT_ERROR = (
  format = ".png/.jpg/.jpeg/.pdf/.doc/.docx"
) =>
  `${TranslateService.data.INVALID_DOCUMENT_FORMAT}`.replace(
    "$format$",
    format
  );
export const IMAGE_VIDEO_FORMAT = "image/jpeg,image/png,image/jpg,video/mp4";

export const IMAGE_FORMAT = "image/jpeg,image/png,image/jpg";

export const MAX_SIZE_ERROR = (size = MAX_IMAGE_SIZE) =>
  TranslateService.data.MAX_SIZE_ERROR.replace("$size$", size);

export const MAX_IMAGE_SIZE = 10;

export const MAX_DOCUMENT_SIZE = 5;

export const ALL = "all";
export const RANDOM = "random";
export const PAGE_KEY = "page";
export const LIMIT_KEY = "limit";

export const RANGE_UPDATE_TIME = 100; // in ms

export const DAY_NAME = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"];
export const DAY_DATA = [
  {
    name: "SUN",
    value: "sun",
    checked: false,
  },
  {
    name: "MUN",
    value: "mon",
    checked: false,
  },
  {
    name: "TUE",
    value: "tue",
    checked: false,
  },
  {
    name: "WED",
    value: "wed",
    checked: false,
  },
  {
    name: "THU",
    value: "thu",
    checked: false,
  },
  {
    name: "FRI",
    value: "fri",
    checked: false,
  },
  {
    name: "SAT",
    value: "sat",
    checked: false,
  },
];

export const JOB_TYPE_LIST = [
  {
    name: "Short Term or part-time work",
    value: 1,
    isChecked: false,
  },
  {
    name: "Longer term work, Designated",
    value: 2,
    isChecked: false,
  },
];

export const APPLIED_ON_LIST = [
  {
    name: "Any time",
    value: "ANY_TIME",
    isChecked: false,
  },
  {
    name: "Past 24 hours",
    value: "PAST_DAY",
    isChecked: false,
  },
  {
    name: "Last 7 days",
    value: "PAST_WEEK",
    isChecked: false,
  },
  {
    name: "Last 30 days",
    value: "PAST_MONTH",
    isChecked: false,
  },
];

export const RATING_LIST = [
  {
    name: "4",
    value: 1,
    isChecked: false,
  },
  {
    name: "3",
    value: 2,
    isChecked: false,
  },
  {
    name: "2",
    value: 3,
    isChecked: false,
  },
  // { name: '1', value: 4, isChecked: false },
];

export const EXPERIENCE_LIST = [
  {
    name: "Fresh Grad",
    value: "FRESHER",
    subValue: 0,
    isChecked: false,
  },
  {
    name: "Upto 2 years",
    value: "UPTO_TWO",
    subValue: 2,
    isChecked: false,
  },
  {
    name: "Upto 4 years",
    value: "UPTO_FOUR",
    subValue: 4,
    isChecked: false,
  },
  {
    name: "Upto 6 years",
    value: "UPTO_SIX",
    subValue: 6,
    isChecked: false,
  },
  {
    name: "Above 6 years",
    value: "ABOVE_SIX",
    subValue: 6,
    isChecked: false,
  },
];

export const JOB_LIST_SORTING = [
  {
    name: "Newest first",
    sortKey: "createdAt",
    sortOrder: -1,
  },
  {
    name: "By A-Z",
    sortKey: "title",
    sortOrder: 1,
  },
  {
    name: "Reset",
    sortKey: "",
    sortOrder: "",
  },
];

export const APPLICANT_LIST_SORTING = [
  {
    name: "Newest first",
    sortKey: "createdAt",
    sortOrder: -1,
  },
  {
    name: "Rating - high to low",
    sortKey: "rating",
    sortOrder: -1,
  },
  {
    name: "Rating - low to high",
    sortKey: "rating",
    sortOrder: 1,
  },
  {
    name: "Previously hired",
    sortKey: "hired",
    sortOrder: -1,
  },
  {
    name: "Reset",
    sortKey: null,
    sortOrder: null,
  },
];

export const SEARCH_APPLICANT_LIST_SORTING = [
  {
    name: "By A-Z",
    sortKey: "name",
    sortOrder: 1,
  },
  {
    name: "Rating - high to low",
    sortKey: "rating",
    sortOrder: -1,
  },
  {
    name: "Rating - low to high",
    sortKey: "rating",
    sortOrder: 1,
  },
  {
    name: "Previously hired",
    sortKey: "hired",
    sortOrder: -1,
  },
  {
    name: "Reset",
    sortKey: null,
    sortOrder: null,
  },
];

export const SCHEDULE_SHIFT_SORTING = [
  {
    name: "Newest first",
    sortKey: "newest",
    sortOrder: -1,
  },
  {
    name: "By A-Z",
    sortKey: "fullName",
    sortOrder: 1,
  },
  {
    name: "Reset",
    sortKey: "",
    sortOrder: "",
  },
];

export const TIMESHEET_LIST_SORTING = [
  {
    name: "Newest first",
    sortKey: "newest",
    sortOrder: -1,
  },
  {
    name: "By A-Z",
    sortKey: "fullName",
    sortOrder: 1,
  },
  {
    name: "Reset",
    sortKey: "",
    sortOrder: "",
  },
];

export const ACTION_SELECTION = [
  {
    name: "Select All",
    value: "all",
    completed: false,
  },
  {
    name: "Select Individually",
    value: "random",
    completed: false,
  },
];


export const MY_FORMATS = {
  parse: {
    dateInput: "ll",
  },
  display: {
    dateInput: "ll",
    monthYearLabel: "MMM YYYY",
    dateA11yLabel: "ll",
    monthYearA11yLabel: "MMMM YYYY",
  },
};

export const DATE_FORMATS = {
  DATE_WITH_TIME: "dd MMMM y h:mm a",
  NOTIFY_DATE: "dd MMMM y h:mm",
  ONLY_DATE: "dd MMM y",
  ONLY_TIME: "h:mm a",
  DD_MM_YYYY: "dd/MM/yyyy",
};

export const FNS_DATE_FORMATS = {
  DATE_TIME_TYPE1: "dd MMM y h:mm a",
  DATE_TIME_TYPE2: "dd MMMM y | h:mm a",
  DATE_TIME_TYPE3: "h:mm a dd MMM y",
  DATE_TYPE1: "dd MMM y",
  DATE_TYPE2: "dd MMMM y",
  TIME: "h:mm a",
};

export const USER_STATUS = {
  ACTIVE: "active",
  BLOCK: "block",
};

export const USER_STATUS_LIST = [
  {
    value: USER_STATUS.ACTIVE,
    viewValue: "Active",
  },
  {
    value: USER_STATUS.BLOCK,
    viewValue: "Block",
  },
];

export const SHIFT_STATUS_LIST = [
  {
    value: USER_STATUS.ACTIVE,
    viewValue: "Active",
    checked: false,
  },
  {
    value: USER_STATUS.BLOCK,
    viewValue: "Inactive",
    checked: false,
  },
];

export const FULLDAY_DATA = [
  {
    viewValue: "Sunday",
    value: "sun",
    checked: false,
  },
  {
    viewValue: "Monday",
    value: "mon",
    checked: false,
  },
  {
    viewValue: "Tuesday",
    value: "tue",
    checked: false,
  },
  {
    viewValue: "Wednesday",
    value: "wed",
    checked: false,
  },
  {
    viewValue: "Thuirsday",
    value: "thu",
    checked: false,
  },
  {
    viewValue: "Friday",
    value: "fri",
    checked: false,
  },
  {
    viewValue: "Saturday",
    value: "sat",
    checked: false,
  },
];

export const SHIFT_FULLDAY_DATA = [
  {
    viewValue: "All",
    value: "all",
    checked: false,
  },
  {
    viewValue: "Sunday",
    value: "sun",
    checked: false,
  },
  {
    viewValue: "Monday",
    value: "mon",
    checked: false,
  },
  {
    viewValue: "Tuesday",
    value: "tue",
    checked: false,
  },
  {
    viewValue: "Wednesday",
    value: "wed",
    checked: false,
  },
  {
    viewValue: "Thuirsday",
    value: "thu",
    checked: false,
  },
  {
    viewValue: "Friday",
    value: "fri",
    checked: false,
  },
  {
    viewValue: "Saturday",
    value: "sat",
    checked: false,
  },
];

export const JOB_PORTAL_TYPE = {
  PUBLISHED: "PUBLISHED",
  ONGOING: "ONGOING",
  COMPLETED: "COMPLETED",
  DRAFT: "DRAFT",
};

export const APPLICANT_TYPE = {
  APPLIED: "APPLIED",
  SHORLISTING: "SHORTLISTED",
  INTERVIEW_SCHEDULED: "INTERVIEW_SCHEDULED",
  HIRED: "HIRED",
  NOT_SUITABLE: "NOT_SUITABLE",
};



export const LIST_PAGINATION = [5, 10, 15, 20];

export const JOBS_EXPERIENCE_TYPE = [
  {
    name: "No experience",
    value: JOB_ROLE.NON_EXPIERENCE,
  },
  {
    name: "Experienced",
    value: JOB_ROLE.EXPIERENCE,
  },
];

export const SALARY_RANGE_FILTERS = {
  MALAYSIA: {
    MIN: 1,
    MAX: 100,
  },
  SINGAPORE: {
    MIN: 1,
    MAX: 100,
  },
};

export const SESSION_KEYS = {
  JOB_FILTER_JOB_AREA: "job-filter-job-area",
  BUSINESS_CATEGORIES: "business-categories",
  JOB_ROLE_FILTER: "job-filter-role",
  APPLICANT_FILTER_SKILLS: "applicant-filter-skills",
  JOB_SITE:"applicant-job-site",
  APPLYJOBID: "applyJobId",
};

export const TOAST_MESSAGE = {
  ADDRESS_CREATED: "New address added successfully",
};

export const ATTENDANCE_FILTER = [
  {
    name: "On time",
    value: ATTENDANCE_STATUS.ONTIME,
  },
  {
    name: "Late in",
    value: ATTENDANCE_STATUS.LATEIN,
  },
  {
    name: "Early out",
    value: ATTENDANCE_STATUS.EARLYOUT,
  },
  {
    name: "Leave",
    value: ATTENDANCE_STATUS.LEAVE,
  },
];

export const TIMESHEET_BULK_TYPE = [
  {
    type: 1,
    label: "clean",
  },
  {
    type: 2,
    label: "Late in",
  },
  {
    type: 3,
    label: "Early out",
  },
  {
    type: 4,
    label: "Missed",
  },
  {
    type: 5,
    label: "Overtime",
  },
];

export enum JOB_STATUS {
  DRAFT = "DRAFT",
  PUBLISHED = "PUBLISHED",
  ONGOING = "ONGOING",
  COMPLETED = "COMPLETED",
  CANCELED = "CANCELLED",
  PAUSED = "PAUSED",
}

export const JOB_STATUS_COLORS = {
  DRAFT: { background: "#FCF4FF", color: "#C168E0" },
  PUBLISHED: { background: "#EDF4FF", color: "#14B1BD" },
  ONGOING: { background: "#FFFAF2", color: "#FF9800" },
  COMPLETED: { background: "#E9FFEA", color: "#4CAF50" },
  CANCELED: { background: "#FDF5F7", color: "#EF5279" },
  CANCELLED: { background: "#FDF5F7", color: "#EF5279" },
  PAUSED: { background: "#F1F1F1", color: "#231E1E" },
};

export const JOB_ACTION_NOTIFICATION=[
  NOTIFICATION_TYPE.JOB_ACTION_APPLIED,
  NOTIFICATION_TYPE.JOB_ACTION_HIRED,
  NOTIFICATION_TYPE.JOB_ACTION_NOT_SUITABLE,
  NOTIFICATION_TYPE.JOB_ACTION_REJECTED,
  NOTIFICATION_TYPE.JOB_ACTION_REVIEWED,
  NOTIFICATION_TYPE.JOB_ACTION_SHORTLIST,
  NOTIFICATION_TYPE.JOB_OFFER_REJECTED,
  NOTIFICATION_TYPE.JOB_OFFER_SEND,
  NOTIFICATION_TYPE.JOB_OFFER_SIGNED
]


export const MEDIAFORMATS = [
  { "type": "Flash", "extension": ".flv", "mimetype": "video/x-flv" },
  { "type": "MPEG-4", "extension": ".mp4", "mimetype": "video/mp4" },
  { "type": "iPhone Index", "extension": ".m3u8", "mimetype": "application/x-mpegURL" },
  { "type": "iPhone Segment", "extension": ".ts", "mimetype": "video/MP2T" },
  { "type": "3GP Mobile", "extension": ".3gp", "mimetype": "video/3gpp" },
  { "type": "QuickTime", "extension": ".mov", "mimetype": "video/quicktime" },
  { "type": "A/V Interleave", "extension": ".avi", "mimetype": "video/x-msvideo" },
  { "type": "Windows Media", "extension": ".wmv", "mimetype": "video/x-ms-wmv" },
  { "type": "JPEG image", "extension": ".jpeg", "mimetype": "image/jpeg" },
  { "type": "JPEG image", "extension": ".jpe", "mimetype": "image/jpeg" },
  { "type": "JPEG file interchange format", "extension": ".jpe", "mimetype": "image/pipeg" },
  { "type": "JPG image", "extension": ".jpg", "mimetype": "image/jpeg" },
  { "type": "PNG image", "extension": ".png", "mimetype": "image/png" },
  { "type": "xls file", "extension": ".xls", "mimetype": "application/vnd.ms-excel" },
  { "type": "xlsx file", "extension": ".xlsx", "mimetype": "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" },
  { "type":"doc" , "extension":".docx", "mimetype": "application/vnd.openxmlformats-officedocument.wordprocessingml.document"},
  { "type":"docx" , "extension":".doc", "mimetype": "application/msword"},
  { "type":"pdf" , "extension":".pdf", "mimetype": "application/pdf"}

]

export const quillConfigConst = {
  "emoji-toolbar": true,
  "emoji-shortname": true,
  "emoji-textarea": true,
  toolbar: [
    ["bold", "italic", "underline", "strike"], // toggled buttons
    ["blockquote", "code-block"],
    // ["emoji"],

    [{ header: 1 }, { header: 2 }], // custom button values
    [{ list: "ordered" }, { list: "bullet" }],
    // [{ script: 'sub' }, { script: 'super' }], // superscript/subscript
    [{ indent: "-1" }, { indent: "+1" }], // outdent/indent
    [{ direction: "rtl" }], // text direction

    [{ size: ["small", false, "large", "huge"] }], // custom dropdown
    [{ header: [1, 2, 3, 4, 5, 6, false] }],

    [{ color: [] }, { background: [] }], // dropdown with defaults from theme
    [{ font: [] }],
    [{ align: [] }],

    ["clean"], // remove formatting button
    ['emoji'],
    // ["link", "image"], // link and image, video
    ["link"]
  ],
};