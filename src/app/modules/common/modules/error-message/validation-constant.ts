// This const will define the input range
export const NUMERIC_CONSTANTS = {
  emailMaxLength: 100,
  passwordMinLength: 8,
  passwordMaxLength: 22,
  nameMinLength: 3,
  nameMaxLength: 40,
  addressMinLength: 3,
  addressMaxLength: 100,
  postCodeMinLength: 3,
  postCodeMaxLength: 10,
  subTitleMinLength: 2,
  subTitleMaxLength: 150,
  titleMinLength: 2,
  titleMaxLength: 60,
  phoneMinLength: 8,
  phoneMaxLength: 14,
  locationMinLength: 2,
  locationMaxLength: 250,
  headingMaxLength: 50,
  userNameMaxLength: 50,
  priceMinLength: 0,
  priceMaxLength: 5,
  yearMin: 1990,
  yearMax: new Date().getFullYear(),
};

//This const will define Input pattern
export const PATTERN = {
  email:
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
  PASSWORD:
    /^(?=(.*[a-z]){1,})(?=(.*[A-Z]){1,})(?=(.*[\d]){1,})(?=(.*[\W]){1,})(?!.*\s).{8,20}$/,
  // PASSWORD: /^(?=.*?[A-Z])(?=.*?[0-9]).*$/,
  nameSpace: /^[^-\s][a-zA-Z0-9\s-]+$/,
  name: /^[^-`@~\s][a-zA-Z0-9\s-]+$/,
  // url: /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/,
  url: /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/,
  phone: '^[0-9]+$',
  price: /(^[0][1-9]+)|([1-9]\d*)+$/,
};

// This const will define pattern error message
export const PATTERN_ERRORS = {
  blankSpace: `Can not contain blank spaces & special character`,
  onlyNumber: `Only digits are allowed`,
  PASSWORD_PATTERN: `Password must contain at least  1 number, 1 special, 1 lowercase, 1 uppercase character and no space.`,
  // PASSWORD_PATTERN: `Password must contain at least  1 number, 1 uppercase character.`,
  MATCH_PASSWORD: 'New Password and Confirm New Password do not match.',
  EMAIL_PATTERN: 'Please enter a valid email.',
};
