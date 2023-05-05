import { Injectable } from "@angular/core";
import { Resolve } from "@angular/router";
import { UserProfileService } from "../services/user-profile.service";
import { environment } from "../../environments/environment";

@Injectable({
  providedIn: "root",
})
export class UserResolverService implements Resolve<Promise<any>> {
  constructor(private _userProfileService: UserProfileService) {}

  async resolve() {
    try {
      if (!localStorage.getItem(environment.tokenKey)) {
        return null;
      }
      return   this._userProfileService.getProfileDetail();
    } catch (error) {
      return null;
    }
  }
}
