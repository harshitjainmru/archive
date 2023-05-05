import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import * as Joi from "joi-browser";
import * as moment from "moment";
import { Observable, Subscription } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { FormUtils } from 'src/app/constants/form.util';
import { INVOICE_LIST } from 'src/app/constants/routes';
import { IDateRange } from 'src/app/models/common.interface';
import { UtilityService } from 'src/app/services/utility.service';
import { InvoiceService } from '../sevices/invoice.service';
import { saveAs } from 'file-saver';

@Component({
  selector: 'app-invoice-list',
  templateUrl: './invoice-list.component.html',
  styleUrls: ['./invoice-list.component.scss']
})
export class InvoiceListComponent implements OnInit {

  displayedColumns: string[] = [
    "employName",
    "startDate",
    "endDate",
    "billAmount",
    "action",
  ];
  
  filterSchema: any;
  sub: Subscription = new Subscription();
  invoiceList:any;
  dataSource = new MatTableDataSource<any>([]);
  filterObject:any;
  firstTimeLoading = true;
  dateRangeConfig: IDateRange;
  filterForm:FormGroup;
  currentQueryParams:any;
  constructor(
    private activatedRoute: ActivatedRoute,
    private utility: UtilityService,
    private router: Router,
    private invoiceService:InvoiceService,
    private formBuilder: FormBuilder,
  ) { 
    this.createSchema();
    this.createFilterForm();
    this.currentQueryParams = this.activatedRoute.snapshot.queryParams;
    this.filterForm.patchValue(this.currentQueryParams);
    
  }

  ngOnInit(): void {
    this.listenQueryParamChanges();
  }

  /**
   * Creates schema for url
   */
   createSchema() {
    this.filterSchema = Joi.object({
      fromDate: Joi.required(),
      toDate: Joi.required(),
    });
  }

   /**
   * Creates search sort filter
   * @returns  filter
   */
    createFilterForm() {
      return (this.filterForm = this.formBuilder.group({
        fromDate: [],
        toDate: [],
      }));
    }

  /**
   * Listens query param changes
   */
   listenQueryParamChanges() {
    this.sub.add(
      this.activatedRoute.queryParams
        .pipe(switchMap((data) => this.validateFilters({ ...data })))
        .subscribe(async (response) => {
          if (response) {
            this.invoiceList = Array.isArray(response["data"])? [
              ...response["data"]
            ]:[];

            this.dataSource = new MatTableDataSource<any>(
              this.invoiceList
            );
          }
        })
    );
  }

  /**
   * Validates filters
   * @param queryParams from the url
   * @returns  validated query params
   */
  validateFilters(queryParams) {
    this.filterObject = this.activatedRoute.snapshot.queryParams;

    if (!this.firstTimeLoading) {
      return this.getInvoiceList();
    }
    return new Observable((observer) => {
      try {
        Joi.validate(queryParams, this.filterSchema, (err, value: any) => {
          if (err) {
            throw err;
          } else {
            this.filterObject = { ...this.filterObject, ...value };
            this.dateRangeConfig = {
              startDate: this.filterForm.get("fromDate") as FormControl,
              endDate: this.filterForm.get("toDate") as FormControl,
              iSaveAllowed: new FormControl(true),
              maxDateRange: moment().toDate(),
              maxRange:14
            };
            this.filterForm.patchValue(this.filterObject);
            this.firstTimeLoading = false;
            this.getInvoiceList().subscribe(
              (response) => {
                this.firstTimeLoading = false;
                observer.next(response);
                observer.complete();
              },
              (error) => {
                this.firstTimeLoading = false;
                observer.error(error);
                observer.complete();
              }
            );
          }
        });
      } catch (error) {
        console.error("error", error);
        this.filterObject = {
          // ...this.filterObject,
          ...this.utility.getLastCountDays(15),
        };

        this.router.navigate([`${INVOICE_LIST.fullUrl}`], {
          queryParams: this.utility.formatMomentData(
            FormUtils.parse({ ...this.filterObject })
          ),
        });
      }
    });
  }

  /**
   * All query params
   * @returns  parsed params for safe
   */
  allQueryParams() {
    return this.utility.formatMomentData(
      FormUtils.parse({
        // ...this.filterObject,
        // ...this.filterForm.value,
        fromDate: this.dateRangeConfig.startDate.value,
        toDate: this.dateRangeConfig.endDate.value,
      })
    );
  }

  /**
   * Gets Jobs list
   * @returns  listing of job according to queryparams
   */
  getInvoiceList() {
    try {
      return this.invoiceService.getInvoiceList(this.allQueryParams());
    } catch (error) {
      console.log(error)
    }
  }

  listenFormValueChanges(event) {
    try {
      const { startDate, endDate } = this.dateRangeConfig;
      console.log(event,{ startDate, endDate })
    // this.searchSortFilter.patchValue({...this.searchSortFilter.value, fromDate:startDate.value,toDate:endDate.value})
    const filterParams = {
      fromDate: startDate.value,
      toDate: endDate.value,
    };

    this.router.navigate([], {
      relativeTo: this.activatedRoute,
      queryParams: this.utility.formatMomentData(
        FormUtils.parse({
          ...filterParams,
        })
      ),
      queryParamsHandling: "merge",
    });
    } catch (error) {
      console.log("err in lis",error)
    }
  }

  async downloadInvoice(el){
    try {
      // const {employee_name,start_date,end_date,bill_amount}=el;
      const resp= await this.invoiceService.downloadInvice(
        {bill:el}
      ).toPromise();
      saveAs(resp?.data?.url,'invoice')
    } catch (error) {
      
    }

  }

}
