import { JOB_STATUS } from "./constant";
import { CANDIDATE_STATUS, JOBS_LIST_STATUS, TIMESHEET_STATUS } from "./enums";

export const VALIDATION_MESSAGES = {
  END_SCHEDULE: 'Cannot send the notification as delivery time has already passed. Please edit it.',
};
export const POPUP_MESSAGES = {
  SELECT_IMAGE_SCENE: "Please select at least one image or a pano image file to continue",
  SELECT_VIDEO_SCENE: "Please select at least one video file to continue",
  ok: "Ok",
  close: "Close",
  confrim: "Confirmation",
  no: "No",
  yes: "Yes",
  cancel: "Cancel",
  save: "Save",
  sendNow: "Send Now",
  deleteNow: "Delete Now",
  passwordResetTitle: "Reset Password",
  passwordResetLink:
    "Password reset link has been sent to registered email id . Please follow the link to reset password .",
  passwordChanged: "Password has been changed successfully.",
  logout: "Confirmation",
  deleteUserTitle: "Delete User",
  unblockTitle: "Active User",
  unblockMessage: "Are you sure you want to Activate this user?",
  unblockButton: "Activate",
  blockTitle: "Deactivated User",
  blockMessage: "Are you sure you want to Deactivate this user?",
  activeTitle: "Active User Authentication",
  activeButton: "Continue",
  activeMessage: "This user's profile will be activated and access will be provided, Are you sure you want to continue ?",
  inActiveTitle: "In-Active User Authentication",
  inActiveButton: "Continue",
  inActiveMessage: "This user's profile will be in-activated and access will be revoked, Are you sure you want to continue ?",
  blockButton: "Deactivate",
  deleteCommonMessage: "Are you sure you want to delete?",
  payAsYouConfirmMessage: "Are you sure you want to pay for this?",
  muteNotification: "Are you sure you want to mute notification?",
  deleteAllScenes: "All your saved screens will be removed, do you wish to continue?",
  deleteConfirmation: "Are you sure you want to delete?",
  makeCardDefault: "Are you sure you want to make this card as default card?",
  downgradePlan: "Are you sure? If you unsubscribe all of your current tours/showcases will be lost",
  upgradePlan: "Are you sure you want to upgrade your plan?",
  deleteNotification: "Are you sure you want to delete this notification? Once deleted you will not be able to recover it.",
  deleteUser: "Are you sure you want to delete this user?",
  resolveMessage: "Are you sure you want to resolve this?",
  payoutMessage: "Are you sure you want to complete this?",
  resendMessage: "Are you sure you want to resend?",
  logoutConfirmation: "Are you sure you want to logout?",
  micPremission: "Kindly provide the access to record audio",
  sendNowMessage: "This notification will be sent immediately to selected audience. You will not be able to edit this notification once sent.",
  forgotPasswordTitle:
    "Forgot Your Password? Don't worry send us your registered email address and we will send yousteps to reset your password.",
    jobCopied: 'Job copied successfully.',
  scheduleConfirm:"Are you sure you want to send schedule?",
  timesheetStatusConfirm:"Are you sure you want to update status?"
};

export const invalidImageError = (format = "jpeg/png") => `Only ${format} images are allowed`;
export const xlsx_file_format = `Only .xlsx files are allowed`;
export const invalidFileSize = (size = 5) => `File size can not be more than ${size} MB`;
export const actionMessage = (action = 'delete') => `Are you sure you want to ${action} this?`;

export const COMPANY_IMG_FORMAT = {
  accept: "image/jpeg,image/png",
  maxSize: 10,
  typeError: `Only jpeg, png files are allowed`,
  sizeError: `File size can not be more than 10 MB`,
}

export const COMPANY_DOC_FORMAT = {
  accept: "image/jpeg,image/png,application/pdf",
  maxSize: 5,
  typeError: `Only jpeg, png and pdf files are allowed`,
  sizeError: `File size can not be more than 5 MB`,
}

export const COMMON_MESSAGES = {
  ADDED: (type) => toTitleCase(type) + " has been added successfully",
  UPDATED: (type) => toTitleCase(type) + " has been updated successfully",
  BLOCKED: {
    confirm: (type) => `Do you want to block this ${type.toLowerCase()}?`,
    success: (type) => `${toTitleCase(type)} has been blocked successfully`,
  },

  ACTIVE: {
    confirm: (type) => `Do you want to unblock this ${type.toLowerCase()}?`,
    success: (type) => `${toTitleCase(type)} has been unblocked successfully`,
  },
  INACTIVE: {
    confirm: (type) => `Do you want to inactivate this ${type.toLowerCase()}?`,
    success: (type) => `${toTitleCase(type)} has been inactivated successfully`,
  },
  ACTIVATED: {
    confirm: (type) => `Do you want to activate this ${type.toLowerCase()}?`,
    success: (type) => `${toTitleCase(type)} has been activated successfully`,
  },

  DEACTIVE: {
    confirm: (type) => `Do you want to deactivate this ${type.toLowerCase()}?`,
    success: (type) => `${toTitleCase(type)} has been deactivated successfully`,
  },
  DELETED: {
    confirm: (type) => `Do you want to delete this ${type.toLowerCase()}?`,
    success: (type) => `${toTitleCase(type)} has been deleted successfully`,
  },
  VERIFY: {
    confirm: (type) => `Do you want to verify this ${type.toLowerCase()}?`,
    success: (type) => `${toTitleCase(type)} has been verified successfully`,
  },
};

export const SOMETHING_WENT_WRONG = "Something went wrong , Please try again later.";
export const IS_AGREE = "Please agree before you proceed.";
export const IMAGE_REQUIRED = "Please select an image.";
export const RECIPIENR_REQUIRED = "Please select a recipient.";
export const NO_INTERNET_CONNECTION = "Please check your internet connection and try again later.";
export const SERVER_NOT_RESPONDING = "API Server not working!";
export const INTERNAL_SERVER_ERROR = "Internal server error.";
export const TIME_OUT = "Server time out.";


export const toTitleCase = (str) => {
  return str.replace(/\w\S*/g, function (txt) {
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
  });
};

export const JOB_EMPTY_STATE_MESSAGE={
  [JOBS_LIST_STATUS.ONGOING]:"No Ongoing Jobs.",
  [JOBS_LIST_STATUS.MY_POSTING]:"No Jobs Under Hiring Status.",
  [JOBS_LIST_STATUS.COMPLETED_JOBS]:"No Jobs Completed Yet.",
  [JOBS_LIST_STATUS.DRAFT]:"No Drafts Created.",
}

export const APPLICANT_EMPTY_STATES={
  [CANDIDATE_STATUS.APPLIED]:"No Unprocessed Applications For This Job.",
  [CANDIDATE_STATUS.SHORTLISTED]:"No Candidates Shortlisted For This Job.",
  [CANDIDATE_STATUS.CONTRACT_SEND]:"No Job Offers Sent For This Job.",
  [CANDIDATE_STATUS.CONTRACT_SIGNED]:"No Candidates Hired For This Job.",
  [CANDIDATE_STATUS.NOT_SUITABLE]:"No Candidates Marked As Not Suitable For This Job.",
  [CANDIDATE_STATUS.INVITATION]:"No Candidates Invited To This Job."
}

export const TIMESHEET_EMPTY_STATES={
  [TIMESHEET_STATUS.UNAPPROVED]:"No Unapproved Timesheets To Show For This Time Frame.",
  [TIMESHEET_STATUS.APPROVED]:"No Approved Timesheets To Show For This Time Frame.",
  [TIMESHEET_STATUS.REJECTED]:"No Rejected Timesheets To Show For This Time Frame.",
  [TIMESHEET_STATUS.LEAVE]:"No Timesheets Expected To Show For This Time Frame."
}