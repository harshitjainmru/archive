import { Pipe, PipeTransform } from "@angular/core";
import * as routes from "../../constants/routes";

@Pipe({
  name: "absolutePath",
})
export class AbsoluteRoutingPipe implements PipeTransform {
  
  // transforms absolute routes used in HTML 
  // eg, SIGNUP -> /account/signup   LOGIN -> /account/login
  // if id exists we append it at the route path

  transform(route, id?,) {
    
    console.log('pipe---',route,'------',routes[route],routes[route].fullUrl)
    try {
      if (id) {
        
        return Array.isArray(id)?routes[route].fullUrl(...id):routes[route].fullUrl(id);

      }
      
      return routes[route].fullUrl;
    } catch (error) {
      // console.log(route, '--------');
      return '';
    }
  }
}
