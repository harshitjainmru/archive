import { BrowserModule } from "@angular/platform-browser";
import { APP_INITIALIZER, NgModule } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { ConfirmationModalComponent } from "./modules/common/components/confirmation-modal/confirmation-modal.component";
import { LoaderComponent } from "./modules/common/components/loader/loader.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MatButtonModule } from "@angular/material/button";
import { MatButtonToggleModule } from "@angular/material/button-toggle";
import { MatDialogModule } from "@angular/material/dialog";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { MatInputModule } from "@angular/material/input";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { FormsModule } from "@angular/forms";
import { TranslateService } from "./services/translate.service";
import { TokenInterceptor } from "./interceptors/token.interceptor";
import { AccountGuard } from "./guards/account.guard";
import { FeatureGuard } from "./guards/feature.guard";
import { UserProfileService } from "./services/user-profile.service";
import { CountrySelectionModule } from "./modules/common/components/country-selection/country-selection/country-selection.module";
import * as firebase from "firebase/app";
import { environment } from "src/environments/environment";
import { AngularFireMessagingModule } from "@angular/fire/messaging";
import { AngularFireDatabaseModule } from "@angular/fire/database";
import { AngularFireAuthModule } from "@angular/fire/auth";
import { FirebaseService } from "./modules/common/modules/firebase/firebase.service";
import { AngularFireModule } from "@angular/fire";

// firebase.initializeApp(environment.firebaseConfig);

export function setupTranslateFactory(service: TranslateService): Function {
  return () => service.fetchLanguageData();
}

@NgModule({
  declarations: [AppComponent, ConfirmationModalComponent, LoaderComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatDialogModule,
    MatInputModule,
    MatSnackBarModule,
    HttpClientModule,
    FormsModule,
    CountrySelectionModule,
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    AngularFireMessagingModule,

    AngularFireModule.initializeApp(environment.firebaseConfig),
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: setupTranslateFactory,
      deps: [TranslateService],
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true,
    },
    AccountGuard,
    FeatureGuard,
    // UserProfileService,
    FirebaseService,
  ],
  entryComponents: [ConfirmationModalComponent],
  bootstrap: [AppComponent],
})
export class AppModule {}
