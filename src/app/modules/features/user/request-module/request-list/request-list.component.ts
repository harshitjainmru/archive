import { Component, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { MatPaginator } from "@angular/material/paginator";
import { MatSelectChange } from "@angular/material/select";
import { FormUtils } from "src/app/constants/form.util";
import { Pagination } from "src/app/constants/pagination";
import { CreateRequestComponent } from "../create-request/create-request.component";
import { RequestDetailsComponent } from "../request-details/request-details.component";
import { RequestService } from "../request.service";

@Component({
  selector: "app-request-list",
  templateUrl: "./request-list.component.html",
  styleUrls: ["./request-list.component.scss"],
})
export class RequestListComponent extends Pagination implements OnInit {
  requestList = [];
  applyStatus = "";
  firstTimeLoading = true;

  constructor(
    private dialog: MatDialog,
    private requestService: RequestService
  ) {
    super();
    this.getRequestList();
  }
  ngOnInit(): void {}

  async getRequestList() {
    try {
      this.firstTimeLoading = false;
      const res = await this.requestService.requestList(
        FormUtils.parse({ ...this.pageParams, applyStatus: this.applyStatus })
      );
      console.log(res.data.result);
      this.requestList = [...res.data.result];
      this.total = res.data.total;
    } catch (error) {}
  }

  openRequest(): void {
    const dialogRef = this.dialog.open(CreateRequestComponent, {
      width: "800px",
      autoFocus: false,
      disableClose: true,
      restoreFocus: false,
    });
    dialogRef.afterClosed().subscribe((resp) => {
      if (resp) {
        this.getRequestList();
      }
    });
  }
  openRequestDetails(item): void {
    const dialogRef = this.dialog.open(RequestDetailsComponent, {
      width: "600px",
      data: item,
    });
    dialogRef.afterClosed().subscribe((resp) => {
      if (resp) {
      }
    });
  }

  changePage(event: MatPaginator) {
    this.pageOptionsOnChange = event;
    if (this.total === 0) {
      return;
    }
    this.getRequestList();
  }

  handleStatusChange(event: MatSelectChange) {
    this.getRequestList();
  }
}
