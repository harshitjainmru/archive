import { IRoute } from '../models/route.interface';

export const HOME: IRoute = {
  path: '',
  get fullUrl(): string {
    return `/`;
  },
};

export const ACCOUNT: IRoute = {
  path: 'account',
  get fullUrl(): string {
    return `/${this.path}`;
  },
};

export const LOGIN: IRoute = {
  path: 'login',
  get fullUrl(): string {
    return `${ACCOUNT.fullUrl}/${this.path}`;
  },
};

export const PROFILE_SETUP: IRoute = {
  path: 'profile-setup',
  get fullUrl(): string {
    return `${ACCOUNT.fullUrl}/${this.path}`;
  },
};

export const SIGNUP: IRoute = {
  path: 'signup',
  get fullUrl(): string {
    return `${ACCOUNT.fullUrl}/${this.path}`;
  },
};

export const FORGOT_PASSWORD: IRoute = {
  path: 'forgot-password',
  get fullUrl(): string {
    return `${ACCOUNT.fullUrl}/${this.path}`;
  },
};

export const RESET_PASSWORD: IRoute = {
  path: 'reset-password',
  get fullUrl(): string {
    return `${ACCOUNT.fullUrl}/${this.path}`;
  },
};

export const RESET_WITH_MOBILE: IRoute = {
  path: 'reset-pawd-mobile',
  get fullUrl(): string {
    return `${ACCOUNT.fullUrl}/${this.path}`;
  },
};

export const PROFILE: IRoute = {
  path: 'profile',
  get fullUrl(): string {
    return `/${this.path}`;
  },
};

export const CHANGE_PASSWORD: IRoute = {
  path: 'change-password',
  get fullUrl(): string {
    return `/${this.path}`;
  },
};

export const LINK_EXPIRED: IRoute = {
  path: 'link-expired',
    get fullUrl(): string {
    return `/${this.path}`;
  },
};

export const CONTENT = {
  path: 'content',
  get fullUrl(): string {
    return `/${this.path}`;
  },
};
export const NO_INTERNET_CONNECTION: IRoute = {
  path: 'no-internet-connection',
  get fullUrl(): string {
    return `/${this.path}`;
  },
};

export const NOTIFICATION: IRoute = {
  path: 'notification',
  get fullUrl(): string {
    return `/${this.path}`;
  },
};

export const DASHBOARD: IRoute = {
  path: 'home',
  get fullUrl(): string {
    return `/${this.path}`;
  },
};

export const STAFFING: IRoute = {
  path: 'staffing',
  get fullUrl(): string {
    return `/${this.path}`;
  },
};

export const SCHEDULE: IRoute = {
  path: 'schedule',
  get fullUrl(): string {
    return `/${this.path}`;
  },
};

export const SCHEDULE_SIFT: IRoute = {
  path: 'schedule-shift',
  get fullUrl(): string {
    return `${SCHEDULE.fullUrl}/${this.path}`;
  },
};

export const CALENDAR: IRoute = {
  path: 'calendar',
  get fullUrl(): string {
    return `${this.path}`;
  },
};

export const USER: IRoute = {
  path: 'user',
  get fullUrl(): string {
    return `/${this.path}`;
  },
};

export const USER_JOB: IRoute = {
  path: 'job',
  get fullUrl(): string {
    return `/${this.path}`;
  },
};

export const USER_JOB_LIST: IRoute = {
  path: 'list',
  get fullUrl(): string {
    return `${USER_JOB.fullUrl}/${this.path}`;
  },
};

export const JOB_PREVIEW: IRoute = {
  path: 'preview',
  get fullUrl(): string {
    return `${USER_JOB.fullUrl}/${this.path}`;
  },
};

// export const SEARCH_CANDIDATE: IRoute = {
//   path: 'candidate-list',
//   get fullUrl(): string {
//     return `${USER_JOB.fullUrl}/${this.path}`;
//   },
// };

// export const SEARCH_CANDIDATE_LIST: IRoute = {
//   path: 'list',
//   get fullUrl(): string {
//     return `${SEARCH_CANDIDATE.fullUrl}/${this.path}`;
//   },
// };

export const JOB_LIST: IRoute = {
  path: 'list',
  get fullUrl(): string {
    return `${USER_JOB.fullUrl}/${this.path}`;
  },
};

// export const APPLICANT_LIST: IRoute = {
//   path: "applicant-list",
//   get fullUrl(): string {
//     return `${USER_JOB.fullUrl}/${this.path}`;
//   },
// };

export const JOB_ADD: IRoute = {
  path: 'add',
  get fullUrl(): string {
    return `${USER_JOB.fullUrl}/${this.path}`;
  },
};

export const JOB_EDIT: IRoute = {
  path: 'edit',
  get fullUrl(): string {
    return `${USER_JOB.fullUrl}/${this.path}`;
  },
};

export const USER_SETTING: IRoute = {
  path: 'setting',
  get fullUrl(): string {
    return `/${USER.fullUrl}/${this.path}`;
  },
};

export const USER_SETTING_CHANGE_PASSWORD: IRoute = {
  path: 'change-password',
  get fullUrl(): string {
    return `/${USER_SETTING.fullUrl}/${this.path}`;
  },
};

export const USER_SETTING_FAQ: IRoute = {
  path: 'faqs',
  get fullUrl(): string {
    return `/${USER_SETTING.fullUrl}/${this.path}`;
  },
};

export const USER_SETTING_TERMS_CONDITION: IRoute = {
  path: 'terms-and-conditions',
  get fullUrl(): string {
    return `/${USER_SETTING.fullUrl}/${this.path}`;
  },
};

export const USER_SETTING_PRIVACY_POLICY: IRoute = {
  path: 'privacy-policy',
  get fullUrl(): string {
    return `/${USER_SETTING.fullUrl}/${this.path}`;
  },
};

export const USER_SETTING_NOTIFICATION: IRoute = {
  path: 'notifications',
  get fullUrl(): string {
    return `/${USER_SETTING.fullUrl}/${this.path}`;
  },
};
export const USER_SETTING_DELETE_ACCOUNT: IRoute = {
  path: 'delete-account',
  get fullUrl(): string {
    return `/${USER_SETTING.fullUrl}/${this.path}`;
  },
};



export const USER_PROFILE: IRoute = {
  path: 'profile',
  get fullUrl(): string {
    return `/${USER.fullUrl}/${this.path}`;
  },
};

export const JOBS: IRoute = {
  path: 'jobs',
  get fullUrl(): string {
    return `/${STAFFING.fullUrl}/${this.path}`;
  },
};

export const JOBS_DETAILS: IRoute = {
  path: 'details',
  get fullUrl(): string {
    return `/${JOBS.fullUrl}/${this.path}`;
  },
};

export const PROPERTY: IRoute = {
  path: 'property',
  get fullUrl(): string {
    return `/${this.path}`;
  },
};

export const PAYMENT: IRoute = {
  path: 'payment',
  get fullUrl(): string {
    return `/${this.path}`;
  },
};

export const CHAT: IRoute = {
  path: 'chat',
  get fullUrl(): string {
    return `/${this.path}`;
  },
};

export const ACCOUNT_DETAILS: IRoute = {
  path: 'detail',
  get fullUrl(): string {
    return `${PROFILE.fullUrl}/${this.path}`;
  },
};
export const EDIT_PROFILE: IRoute = {
  path: 'edit-profile',
  get fullUrl(): string {
    return `${ACCOUNT_DETAILS.fullUrl}/${this.path}`;
  },
};

export const SETTING: IRoute = {
  path: 'setting',
  get fullUrl(): string {
    return `${PROFILE.fullUrl}/${this.path}`;
  },
};

export const STATIC: IRoute = {
  path: 'content',
  get fullUrl(): string {
    return `/${this.path}`;
  },
};

export const PRIVACY_POLICY: IRoute = {
  path: 'privacy-policy',
  get fullUrl(): string {
    return `${STATIC.fullUrl}/${this.path}`;
  },
};

export const TERM_CONDITION: IRoute = {
  path: 'term-condition',
  get fullUrl(): string {
    return `${STATIC.fullUrl}/${this.path}`;
  },
};
export const ABOUT_US: IRoute = {
  path: 'how-it-works',
  get fullUrl(): string {
    return `${STATIC.fullUrl}/${this.path}`;
  },
};

export const PAYMENT_POLICY: IRoute = {
  path: 'payment-policy',
  get fullUrl(): string {
    return `${STATIC.fullUrl}/${this.path}`;
  },
};

export const REFUND_POLICY: IRoute = {
  path: 'refund-policy',
  get fullUrl(): string {
    return `${STATIC.fullUrl}/${this.path}`;
  },
};

export const FAQ: IRoute = {
  path: 'faq',
  get fullUrl(): string {
    return `${STATIC.fullUrl}/${this.path}`;
  },
};

export const OUR_TEAM: IRoute = {
  path: 'our-team',
  get fullUrl(): string {
    return `${STATIC.fullUrl}/${this.path}`;
  },
};

export const CONTACT_US: IRoute = {
  path: 'contact-us',
  get fullUrl(): string {
    return `${STATIC.fullUrl}/${this.path}`;
  },
};
export const COMPLETE_PROFILE: IRoute = {
  path: 'complete-profile',
  get fullUrl(): string {
    return `/${this.path}`;
  },
};

// worker routs

export const WORKER: IRoute = {
  path: 'worker',
  get fullUrl(): string {
    return `/${this.path}`;
  },
};

export const WORKER_LIST: IRoute = {
  path: 'list',
  get fullUrl(): string {
    return `${WORKER.fullUrl}/${this.path}`;
  },
};

export const WORKER_DETAILS: IRoute = {
  path: 'detail',
  get fullUrl(): string {
    return `${WORKER.fullUrl}/${this.path}`;
  },
};

export const SEARCH_WORKER: IRoute = {
  path: 'search-worker',
  get fullUrl(): string {
    return `${WORKER.fullUrl}/${this.path}`;
  },
};

// new routs

export const SHIFT: IRoute = {
  path: 'shift',
  get fullUrl(): string {
    return `/${this.path}`;
  },
};

export const SHIFT_LIST: IRoute = {
  path: 'list',
  get fullUrl(): string {
    return `${SHIFT.fullUrl}/${this.path}`;
  },
};

export const ADD_SHIFT: IRoute = {
  path: 'add',
  get fullUrl(): string {
    return `${SHIFT.fullUrl}/${this.path}`;
  },
};

// landing rout

export const WELCOME: IRoute = {
  path: 'welcome',
  get fullUrl(): string {
    return `/${this.path}`;
  },
};
export const APPLICANT = {
  path: 'applicants',
  get fullUrl(): string {
    return `${USER_JOB.fullUrl}/${this.path}`;
  },
};
export const APPLICANT_LIST = {
  path: 'list',
  fullUrl(jobId): string {
    return `${APPLICANT.fullUrl}/${jobId}/${this.path}`;
  },
};

export const APPLICANT_DETAILS = {
  path: 'applicant-details',
  fullUrl(jobId): string {
    return `${APPLICANT.fullUrl}/${jobId}/${this.path}`;
  },
};

export const TIMESHEET: IRoute = {
  path: 'timesheet',
  get fullUrl(): string {
    return `/${this.path}`;
  },
};

export const TIMESHEET_LIST: IRoute = {
  path: 'list',
  get fullUrl(): string {
    return `${TIMESHEET.fullUrl}/${this.path}`;
  },
};

export const SEARCH_APPLICANT: IRoute = {
  path: 'search-candidate',
  get fullUrl(): string {
    return `${USER_JOB.fullUrl}/${this.path}`;
  },
};

export const SEARCH_APPLICANT_LIST = {
  path: 'search-candidate-list',
  fullUrl(jobId): string {
    return `${USER_JOB.fullUrl}/${jobId}/${this.path}`;
  },
};

export const SEARCH_APPLICANT_DETAILS = {
  path: 'candidate-details',
  fullUrl(jobId): string {
    return `${SEARCH_APPLICANT.fullUrl}/${jobId}/${this.path}`;
  },
};

//INVOICE ROUTING

export const INVOICE: IRoute = {
  path: 'invoice',
  get fullUrl(): string {
    return `/${this.path}`;
  },
};

export const INVOICE_LIST: IRoute = {
  path: 'list',
  get fullUrl(): string {
    return `${INVOICE.fullUrl}/${this.path}`;
  },
};
