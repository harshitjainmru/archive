import { Component, Inject } from '@angular/core';
import {
  MatDialogRef,
  MAT_DIALOG_DATA,
  MatDialog,
} from '@angular/material/dialog';
import { IPopupData, IPopupResponse } from 'src/app/models/popup';
import { CONFIRM_MODAL_TYPE } from 'src/app/constants/enums';

@Component({
  selector: 'app-confirmation-modal',
  templateUrl: './confirmation-modal.component.html',
  styleUrls: ['./confirmation-modal.component.scss'],
})
export class ConfirmationModalComponent {
  modalData: IPopupData = {
    message: '',
    confirmButtonText: 'Yes',
    cancelButtonText: 'No',
    title: '',
  };
  reason: string;
  responseData: IPopupResponse = {
    note: '',
  };
  modalType = CONFIRM_MODAL_TYPE;

  constructor(
    private dialogRef: MatDialogRef<ConfirmationModalComponent>,
    @Inject(MAT_DIALOG_DATA) private data: IPopupData,
    private dialog: MatDialog
  ) {
    this.modalData = { ...this.modalData, ...this.data };
  }

  // This will close modal
  onNoClick(): void {
    this.dialogRef.close();
  }

  // This will confirm modal
  confirm() {
    if (this.modalData && this.reason && this.reason.trim() == '') return;
  }
}
