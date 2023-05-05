import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { QrCodeComponent } from "./qr-code.component";
import { MatDialogModule } from "@angular/material/dialog";

@NgModule({
  declarations: [QrCodeComponent],
  imports: [CommonModule,MatDialogModule],
  exports: [QrCodeComponent],
})
export class QrCodeModule {}
