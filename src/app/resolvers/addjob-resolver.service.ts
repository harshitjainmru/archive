import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { ACCOUNT_API_GROUP, USER_API_GROUP } from '../constants/urls';
import { HttpService } from '../services/http.service';
import { UserProfileService } from '../services/user-profile.service';

@Injectable({
  providedIn: 'root'
})
export class AddjobResolverService implements Resolve<Promise<any>> {
  stateCityLists;
  constantsData;
  roleLists = [];
  categoryList = [];
  constructor(
    private userProfileService: UserProfileService,
    private httpService: HttpService,
    ) { 
    
  }

  async resolve() {
    try {
      
      const userData = await this.userProfileService.getProfileDetail();
      const roleData = await this.roleDropDwon({page:1});
      // const categoryData = await this.categoryDropDwon();
      // const constantData = await this.constantsLists();
      return { userData, roleData };
    } catch (error) {
      return null;
    }
  }



  // async stateCityDropDwon(query) {
  //   query = {
  //     ...query,
  //     countryId: this.userProfileService.countryInfo.countryId
  //   }
  //   const {data} = await this.httpService.get(ACCOUNT_API_GROUP.DROPDWON_JOBAREA, query, { showLoader: true }).toPromise();
  //   return data;
  // }

  // async addAddress(query) {
  //   const {data} = await this.httpService.get(ACCOUNT_API_GROUP.DROPDWON_JOBAREA, query, { showLoader: true }).toPromise();
  //   return data;
  // }

  async roleDropDwon(query = {}): Promise<any> {
    if (this.roleLists.length) {
      return this.roleLists;
    } else {
      const { data } = await this.httpService.get(USER_API_GROUP.USERS_ROLE, {...query,isClient:true}).toPromise();
      this.roleLists = data || [];
      return this.roleLists;
    }
  }


  async constantsLists(query = {}): Promise<any> {
    if (this.constantsData) {
      return this.constantsData;
    } else {
      const { data } = await this.httpService.get(ACCOUNT_API_GROUP.DROPDWON_COMMON, query).toPromise();
      this.constantsData = data;
      this.constantsData['EXPERIENCE_LEVEL'].map(item => { item['isChecked'] = false; return item; })
      this.constantsData['SHIFTS'].map(item => { item['isChecked'] = false; return item; })
      return this.constantsData;
    }
  }

}
