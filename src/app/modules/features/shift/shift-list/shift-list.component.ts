import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { COMMON_MESSAGES } from 'src/app/constants/messages';
import { Pagination } from 'src/app/constants/pagination';
import { IPopupData } from 'src/app/models/popup';
import { CommonFilterComponent } from 'src/app/modules/common/modules/common-filter/common-filter.component';
import { UtilityService } from 'src/app/services/utility.service';
import { EditShiftComponent } from '../edit-shift/edit-shift.component';
import { ShiftService } from '../service/shift.service';
import { ShiftManagementFilterComponent } from 'src/app/modules/common/modules/shift-management-filter/shift-management-filter.component';
export interface IShiftElemet {
  position: number;
  name: string;
  timing: string;
  working_days: string;
  creation_date: string;
}


@Component({
  selector: 'app-shift-list',
  templateUrl: './shift-list.component.html',
  styleUrls: ['./shift-list.component.scss']
})
export class ShiftListComponent extends Pagination implements OnInit {
  displayedColumns: string[] = ['position', 'name', 'timing', 'working_days', 'creation_date', 'action', 'status'];
  dataSource = new MatTableDataSource<IShiftElemet>(null);
  searchText: string = '';
  filteroption = {};
  // filterData = {};
  activeFilter;
  constructor(
    private shiftService: ShiftService,
    private utility: UtilityService,
    private dialog: MatDialog) {
    super();
  }

  openFilter(): void {
    const subscription = this.dialog.open(ShiftManagementFilterComponent, {
      width: '400px',
      panelClass: 'custom_filter',
      height: '100vh',
      data: this.activeFilter
    }).afterClosed().subscribe(resp => {
      if (resp) {
        const { payload, orgArr } = resp;
        subscription.unsubscribe();
        this.activeFilter = orgArr;
        this.getShiftList({ ...payload });
      }
      // if (resp) {
      //   this.filteroption = JSON.parse(JSON.stringify(resp));
      //   this.filterData = resp;
      //   if (resp['weekDays'] && resp['weekDays'].length) {
      //     this.filterData['weekDays'] = JSON.stringify(resp['weekDays'])
      //   } else {
      //     this.filterData = {}
      //   }
      //   this.getShiftList();
      // }
    })
  }

  ngOnInit(): void {
    this.getShiftList();
  }

  getShiftList(query = {}) {
    this.shiftService.shiftLists({ ...this.validPageOptions, search: this.searchText, ...query }).then(({ data: { result, page, limit, total } }) => {
      this.dataSource.data = result;
      this.page = page;
      this.limit = limit;
      this.total = total;
    })
  }

  openEditshift(rowData): void {
    const dialogRef = this.dialog.open(EditShiftComponent, {
      width: '468px',
      data: rowData
    });

    dialogRef.afterClosed().subscribe(res => {
      if (res) {
        this.getShiftList();
      }
    })
  }

  onPageHandler(data) {
    this.pageOptionsOnChange = data;
    this.getShiftList();
  }

  onSelect(value = 20) {
    this.page = 1;
    this.limit = value;
    this.getShiftList();
  }

  onAction(row, type) {

    let data: IPopupData = {
      title: 'Confirmation',
      message: type == 'active' ? COMMON_MESSAGES.ACTIVATED.confirm('shift') : COMMON_MESSAGES.INACTIVE.confirm('shift'),
      cancelButtonText: "Close",
      hideConfirmButton: true,
    };

    this.utility.openDialog(data).subscribe(resp => {
      if (!!resp) {
        console.log("hello");
        this.shiftService.shiftAction({ shiftId: row._id, status: type }).then(resp => {
          console.log(resp, "nkjdsnkj");
          this.getShiftList();
        })
      }

    })
  }

  onSetSearch(value: string) {
    this.searchText = value;
    this.getShiftList();
  }
}