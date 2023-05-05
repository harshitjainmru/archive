export interface IPopupData {
  title?: string;
  message: string;
  cancelButtonText?: string;
  confirmButtonText?: string;
  showTextBox?: boolean;
  hideCancelButton?: boolean;
  hideConfirmButton?: boolean;
  prefillText?: string;
  textBoxType?:number;
  textBoxpara?:string;
}

export interface IPopupResponse {
  note?: string;
}
