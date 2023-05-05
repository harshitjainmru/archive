export interface IValidation {
  emailMaxLength: number;
  passwordMinLength: number;
  passwordMaxLength: number;
  nameMinLength: number;
  nameMaxLength: number;
  phoneMinLength: number;
  phoneMaxLength: number;
  descriptionMinLength: number;
  descriptionMaxLength: number;
  descriptionMaxLength400: number;
  descriptionMaxLength1200:number;
  priceMinLength: number;
  priceMaxLength: number;
  minFloor: number;
  maxFloor: number;
  minArea: number;
  maxArea: number;
  houseNumberMinLength: number;
  houseNumberMaxLength: number;
  streetMinLength: number;
  streetMaxLength: number;
  zipcodeMinLength: number;
  zipcodeMaxLength: number;
  taxNumberMinLength: number;
  taxNumberMaxLength: number;
  regNumberMinLength: number;
  regNumberMaxLength: number;
  landmarkMinLength: number;
  landmarkMaxLength: number;
  bioMinLength: number;
  bioMaxLength: number;
  addressMinLength: number;
  addressMaxLength: number;
  phoneNumber:number,
  subjectMaxLength:number,
  maxvacancies: number,
  uenMinLength:number,
  uenMaxLength:number,
  maxinviteTitleLength:number,
  mininviteTitleLength:number,
  maxinviteMsgLength:number,
  mininviteMsgLength:number,
}
