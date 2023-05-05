import { Injectable } from "@angular/core";
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
  HttpResponse,
} from "@angular/common/http";
import { Router } from "@angular/router";
import { Observable, throwError } from "rxjs";
import { tap } from "rxjs/operators";
import { UtilityService } from "../services/utility.service";
import { LoaderService } from "../services/loader.service";
import { LOGIN } from "../constants/routes";
import { ApiConfig } from "../models/api.interface";
import { environment } from "src/environments/environment";
import { SOMETHING_WENT_WRONG } from "../constants/messages";
import { MatDialog } from "@angular/material/dialog";

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  unAuthorisedCodes = [401, 403, 440, 498,411];
  constructor(
    private router: Router,
    private _utilityService: UtilityService,
    private _loaderService: LoaderService,
    private _dialog: MatDialog
  ) {}
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    let headers = {};
    const token = this._utilityService.getAuthToken();
    const firebaseToken = this._utilityService.getFCMToken();
    // console.log('----',firebaseToken);
    let config: ApiConfig;
    config = JSON.parse(request.headers.get("config"));
    if (token) {
      headers["authorization"] = "Bearer " + token;
    }

    const customHeader = {
      devicedetails: {
        deviceToken: firebaseToken ? firebaseToken : "na",
        deviceId: "IP",
        deviceType: 2,
      },
      offset: new Date().getTimezoneOffset(),
    };

    if (!firebaseToken) {
      delete customHeader.devicedetails.deviceToken;
    }
    const { countryId } = this._utilityService.countryId;
    // console.log(countryId);

    if (customHeader) {
      if (customHeader.devicedetails) {
        if (!config?.skipDeviceDetail) {
          headers["devicedetails"] = JSON.stringify(customHeader.devicedetails);
        }
        headers["offset"] = JSON.stringify(new Date().getTimezoneOffset());
        headers["lang"] = localStorage.getItem(environment.languageKey)
          ? localStorage.getItem(environment.languageKey)
          : "en";

        headers["countryid"] = countryId ? countryId : "";
      }
    }

    if (!navigator.onLine) {
      const error = new HttpErrorResponse({
        error: {
          httpCode: 510,
          statusCode: 510,
          message: "No Internet Connection",
          type: "NO_INTERNET",
        },
      });

      this._utilityService.errorAlert(error);
      return throwError(error);
    }

    request.headers.delete("config");
    request.headers.delete("skipHeaders");
    request.headers.delete("skipDeviceDetail");
    // console.log(request.headers)
    request = request.clone({
      setHeaders: headers,
    });

    if (config && config.showLoader) {
      this._loaderService.loader.next(true);
    }

    return next.handle(request).pipe(
      tap(
        (data) => {
          if (data instanceof HttpResponse) {
            if (config && config.showLoader) {
              this._loaderService.loader.next(false);
            }
          }
        },
        (err: any) => {
          if (config && config.showLoader) {
            this._loaderService.loader.next(false);
          }
          if (err instanceof HttpErrorResponse) {
            this._dialog.closeAll();

            if (err.status === 0 || err.status === 404) {
              this._utilityService.errorAlert(SOMETHING_WENT_WRONG);
            } else if (this.unAuthorisedCodes.includes(err.status)) {
              this._utilityService.clearStorage();
              // localStorage.removeItem(environment.countryKey);
              // this._utilityService.openCountryDialog().subscribe((res) => {
              this.router.navigate([LOGIN.fullUrl]);
              // });
            }
            if (
              config &&
              !config.skipErrorPopup &&
              ![0, 404].includes(err.status)
            ) {
              this._utilityService.errorAlert(err);
            }
          }
        }
      )
    );
  }
}
