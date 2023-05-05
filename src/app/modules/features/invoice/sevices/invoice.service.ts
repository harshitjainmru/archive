import { Injectable } from '@angular/core';
import { INVOICE_DOWNLOAD, INVOICE_LIST_GET } from 'src/app/constants/urls';
import { HttpService } from 'src/app/services/http.service';

@Injectable({
  providedIn: 'root'
})
export class InvoiceService {

  constructor(
    private http:HttpService
  ) { }

  getInvoiceList(params){
    return this.http.get(INVOICE_LIST_GET,params,{showLoader:true});
  }

  downloadInvice(payload){
    return this.http.put(INVOICE_DOWNLOAD,payload,{showLoader:true});
  }
}
