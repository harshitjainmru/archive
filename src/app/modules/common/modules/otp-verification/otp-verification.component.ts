import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  ViewChild,
} from '@angular/core';
import { HttpService } from '../../../../services/http.service';
import { ACCOUNT_API_GROUP } from '../../../../constants/urls';
import { UtilityService } from '../../../../services/utility.service';
import { OtpBoxComponent } from './otp-box/otp-box.component';
import { TranslateService } from 'src/app/services/translate.service';
import { AccountService } from 'src/app/modules/account/account.service';

@Component({
  selector: 'app-otp-verification',
  templateUrl: './otp-verification.component.html',
  styleUrls: ['./otp-verification.component.scss'],
})
export class OtpVerificationComponent implements OnInit {
  config = {
    allowNumbersOnly: true,
    length: 4,
    isPasswordInput: false,
    disableAutoFocus: false,
    placeholder: '',
    inputStyles: {
      width: '50px',
      height: '50px',
    },
  };
  otp: string;
  resending = false;
  interval: any;
  initialTime: number;
  timeDuration = 59;
  timeLimit: any;
  @ViewChild(OtpBoxComponent) otpBox: OtpBoxComponent;
  @Input() phoneData: any;
  @Input() viewType;
  @Input() showBackButton = true;
  @Output() verifyOtp = new EventEmitter();
  @Output() onBack = new EventEmitter();
  @Input() canResend: boolean = true;
  @Output() customResend = new EventEmitter();

  attemptsLeft;
  @Input() set otpAttemptLeft(data) {
    this.attemptsLeft = data;
  }
  constructor(
    private _http: HttpService,
    private accountService: AccountService,
    private _utility: UtilityService
  ) {}

  // On init life cycle hook
  ngOnInit(): void {
    this.startTimer();
  }

  // After View init life cycle hook
  ngAfterViewInit() {
    setTimeout(() => {
      document.getElementById('otp-box').scrollIntoView({
        behavior: 'smooth',
        block: 'end',
        inline: 'nearest',
      });
    });
  }

  get isReadyTosend() {
    return !(!this.otp || this.otp.length != this.config.length);
  }

  // This will Otp change
  onOtpChange(event: string) {
    if (this.otp !== event) {
      this.otp = event;
    } else {
      return;
    }
    if (this.isReadyTosend) {
      this.onVerifyOtp();
    }
  }

  // This will shoe resend option
  get showResendOption() {
    return this.initialTime + this.timeDuration * 1000 < new Date().getTime();
  }

  // This will start timer for otp
  startTimer() {
    if (this.interval) {
      clearInterval(this.interval);
    }
    this.timeLimit = this.timeDuration;
    this.initialTime = new Date().getTime();
    this.interval = setInterval(() => {
      this.timeLimit = +this.timeLimit - 1;
      if (this.timeLimit < 10) {
        this.timeLimit = `0${this.timeLimit}`;
      }
      if (this.timeLimit == '00') {
        clearInterval(this.interval);
      }
    }, 1000);
  }

  // This will resend opt
  async resendOtp() {
    if (!this.canResend) {
      this.customResend.emit(true);
      return;
    }
    try {
      if (this.resending) {
        return;
      }
      this.resending = true;
      const res = await this.accountService.reSendOpt(this.phoneData);
      this._utility.showAlert(TranslateService.data['OTP_RESENT']);
      this.resending = false;
      this.startTimer();
      this.otpBox.resetOtp();
    } catch (error) {
      this.resending = false;
    }
  }

  // This will on verify Otp
  async onVerifyOtp() {
    this.verifyOtp.emit(this.otp);
  }

  //This will resend custom otp
  afterCustomResend(flag) {
    if (flag) {
      this._utility.showAlert(TranslateService.data['OTP_RESENT']);
      this.resending = false;
      this.startTimer();
      this.otpBox.resetOtp();
    } else {
      this.resending = false;
    }
  }

  // On destroy life cycle hook
  ngOnDestroy() {
    if (this.interval) {
      clearInterval(this.interval);
    }
  }
}
