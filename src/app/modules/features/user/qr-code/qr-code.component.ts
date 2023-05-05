import {
  AfterViewInit,
  Component,
  ElementRef,
  Inject,
  OnInit,
  ViewChild,
} from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import QrCodeWithLogo from "qrcode-with-logos";
import { UserProfileService } from "src/app/services/user-profile.service";

@Component({
  selector: "app-qr-code",
  templateUrl: "./qr-code.component.html",
  styleUrls: ["./qr-code.component.scss"],
})
export class QrCodeComponent implements OnInit, AfterViewInit {
  @ViewChild("qr") image: ElementRef<HTMLImageElement>;

  profile: any = null;
  exeAtInterval:number=3600*1000;  //in miliseconds
  constructor(private userProfile: UserProfileService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<any>
    ) {
    this.profile = this.userProfile.profileData;
  }
  ngAfterViewInit(): void {
    this.generateQr();
    setInterval(()=>{
      this.generateQr();
    },this.exeAtInterval)
  }

  ngOnInit(): void {}
  generateQr() {
    let qrcode = new QrCodeWithLogo({
      content: `${this.profile._id}-${new Date().getTime()}`,
      width: 380,
      //   download: true,
      image: this.image.nativeElement,
      logo: {
        src: "assets/images/qr_logo-01.svg", 
      },
    });
    qrcode.toImage().then(() => {});
  }

  closeDialog(){
    this.dialogRef.close();
  }
}
