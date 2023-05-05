import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import HelloSign from "hellosign-embedded";
import { environment } from "src/environments/environment";

@Component({
  selector: "app-sign-contract",
  templateUrl: "./sign-contract.component.html",
  styleUrls: ["./sign-contract.component.scss"],
})
export class SignContractComponent implements OnInit, AfterViewInit {
  @ViewChild("signhere") signhere: ElementRef<any>;
  error = false;
  status = {
    SIGN_SUCCESS: "SUCCESS",
    CANCELLED: "CANCELLED",
    ERROR: "ERROR",
  };

  constructor(private activatedRoute: ActivatedRoute, private router: Router) {
    console.log("came");
  }
  client = new HelloSign();
  signature_id = "";
  token = "";

  ngOnInit(): void {
    this.signature_id = this.activatedRoute.snapshot.queryParams.signature_id;
    this.token = this.activatedRoute.snapshot.queryParams.token;
    if (!this.signature_id || !this.token) {
      // handle
    }
    console.log(this.token, this.signature_id);
  }
  ngAfterViewInit(): void {
    this.listenToChanges();
    this.signContract(this.signature_id, this.token);
  }

  afterSign() {
    // this.router.navigate([], {
    //   relativeTo: this.activatedRoute,
    //   queryParams: {
    //     signature_id: this.signature_id,
    //     token: this.token,
    //     status: this.status.SIGN_SUCCESS,
    //   },
    //   // queryParamsHandling: 'merge',
    // });

    if (window["ReactNativeWebView"]) {
      window["ReactNativeWebView"].postMessage(
        "helloSignin",
        `${window.location.href}?signature=${this.signature_id}&token=${this.token}&status=${this.status.SIGN_SUCCESS}`
      );
    } else {
      alert("RN web view not found.");
    }
    // window.postMessage(
    //   "helloSignin",
    //   `${window.location.href}?signature=${this.signature_id}&token=${this.token}&status=${this.status.SIGN_SUCCESS}`
    // );
  }

  afterCancel() {
    // this.router.navigate([], {
    //   relativeTo: this.activatedRoute,
    //   queryParams: {
    //     signature_id: this.signature_id,
    //     token: this.token,
    //     status: this.status.CANCELLED,
    //   },
    //   // queryParamsHandling: 'merge',
    // });
    if (window["ReactNativeWebView"]) {
      window["ReactNativeWebView"].postMessage(
        "helloSignin",
        `${window.location.href}?signature=${this.signature_id}&token=${this.token}&status=${this.status.CANCELLED}`
      );
    } else {
      alert("RN web view not found.");
    }
    // window.postMessage(
    //   "helloSignin",
    //   `${window.location.href}?signature=${this.signature_id}&token=${this.token}&status=${this.status.CANCELLED}`
    // );
  }

  afterError() {
    // this.router.navigate([], {
    //   relativeTo: this.activatedRoute,
    //   queryParams: {
    //     signature_id: this.signature_id,
    //     token: this.token,
    //     status: this.status.ERROR,
    //   },
    //   // queryParamsHandling: 'merge',
    // });

    if (window["ReactNativeWebView"]) {
      window["ReactNativeWebView"].postMessage(
        "helloSignin",
        `${window.location.href}?signature=${this.signature_id}&token=${this.token}&status=${this.status.ERROR}`
      );
    } else {
      alert("RN web view not found.");
    }
    // window.postMessage(
    //   "helloSignin",
    //   `${window.location.href}?signature=${this.signature_id}&token=${this.token}&status=${this.status.ERROR}`
    // );
  }

  listenToChanges() {
    this.client.on("sign", (data) => {
      console.log("The document has been signed!");
      console.log("Signature ID: " + data.signatureId);
      this.afterSign();
    });

    this.client.on("cancel", (data) => {
      console.log("The document has been canceled!");
      this.afterCancel();
    });

    this.client.on("close", (data) => {
      console.log("The document has been closed!");
    });
    this.client.on("error", (data) => {
      console.log("The document has been error!");
      console.log("data" + data);
      this.error = true;
      setTimeout(() => {
        this.afterError();
      }, 4000);
    });
  }

  signContract(signature_id, token) {
    console.log({clientId: environment.helloSignClientId})
    this.client.open(this.createSignUrl(signature_id, token), {
      // clientId: "0d2e0416e7dc8bce134781d11f9d2ab9",
      clientId: environment.helloSignClientId,
      skipDomainVerification: true,
      container: document.getElementById("sign-here"),
    });
  }

  createSignUrl(signature_id, token): string {
    // return "https://app.hellosign.com/editor/embeddedSign?signature_id=e3a247c43f3c05c2a539a28d3b4bf476&token=21fdbfab806cf5f77b63bfaa52cd7736";
    return `https://app.hellosign.com/editor/embeddedSign?signature_id=${signature_id}&token=${token}`;
  }
}
