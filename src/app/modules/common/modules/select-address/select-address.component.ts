import {
  Component,
  Input,
  OnInit,
  Output,
  ViewChild,
  EventEmitter,
  AfterViewInit,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { JobService } from 'src/app/modules/features/job/add-job/service/job.service';
import { AddAddressComponent } from 'src/app/modules/features/job/popups/add-adress/add-address.component';

@Component({
  selector: 'app-select-address',
  templateUrl: './select-address.component.html',
  styleUrls: ['./select-address.component.scss'],
})
export class SelectAddressComponent implements OnInit, AfterViewInit {
  private _filterOptions = {
    page: 1,
    limit: 50,
    search: '',
  };
  selectedAddress;
  listItemData: any = [];
  @Input() controls: FormControl = new FormControl();
  @Input() addressControl: FormControl = new FormControl();
  @Output() selectedItem = new EventEmitter();
  public isLoader: boolean = false;
  public isSearch: boolean = false;
  // -------- INFINITE SCROLL --------
  @ViewChild('selectElem', { static: true }) selectElem: any;
  private readonly PIXEL_TOLERANCE = 3.0;
  viewIndex = 0;
  windowSize = 10;
  nextHit = false;
  // -------- END INFINITE SCROLL --------
  constructor(private jobService: JobService, private dialog: MatDialog) {
    this.getDataList();
  }

  ngOnInit(): void {
    // console.log('wowoowoww',this.addressControl, this.controls)
  }

  // After view init life cycle hook
  ngAfterViewInit() {
    // this.initAddress();
    this.selectElem.openedChange.subscribe(() =>
      this.registerPanelScrollEvent()
    );
  }

  // This will pathvalue initial value
  initAddress() {
    this.addressControl.patchValue('');
  }

  // Get data list
  async getDataList() {
    this.isLoader = true;
    const query = { ...this._filterOptions };
    await this.jobService
      .addressList(query)
      .then(({ data: { result, next } }) => {
        this.isLoader = false;
        this.nextHit = next;
        if (!this.listItemData) {
          this.listItemData = result;
        } else {
          result.forEach((item) => {
            this.listItemData.push(item);
          });
        }
        // this.setExistingData(this.addressControl.value); // ONLY FOR SET EXISTING SELECT DATA
      });
  }

  // This will set existing data
  setExistingData(data) {
    if (data && this.listItemData) {
      let dataIndex = this.listItemData.findIndex((x) => x._id === data._id);
      this.addressControl.patchValue(this.listItemData[dataIndex]);
    }
  }

  // //   SEARCHING  ////////////
  searchData(text: string) {
    text ? (this.isSearch = true) : (this.isSearch = false);
    this.listItemData = [];
    this._filterOptions.search = text;
    this._filterOptions.page = 1;
    this.getDataList();
  }

  // // FETCH MORE DATA ON SCROLL DOWN ////////////
  getNextBatch() {
    if (!this.nextHit) {
      return;
    }
    ++this._filterOptions.page;
    this.getDataList();
  }

  // ////////// INFINITE SCROLL  ////////////

  registerPanelScrollEvent() {
    setTimeout(() => {
      if (this.selectElem && this.selectElem.panel) {
        const panel = this.selectElem.panel.nativeElement;
        panel.addEventListener('scroll', (event) =>
          this.loadNextOnScroll(event)
        );
      }
    }, 0);
  }

  // This will use for load next scroll
  loadNextOnScroll(event) {
    if (this.hasScrolledToBottom(event.target)) {
      // console.log('Scrolled to bottom');
      this.viewIndex += this.windowSize;
      this.getNextBatch();
    }
  }

  // Scroll to buttom
  private hasScrolledToBottom(target): boolean {
    return (
      Math.abs(target.scrollHeight - target.scrollTop - target.clientHeight) <
      this.PIXEL_TOLERANCE
    );
  }

  // ////////// INFINITE SCROLL  ////////////

  // This dialog open for address in job third step
  addAddress(): void {
    const dialogRef = this.dialog.open(AddAddressComponent, {
      // data: '',
      width: '460px',
    });
    dialogRef.afterClosed().subscribe((response) => {
      if (response) {
        this.setAddress(response);
      }
    });
    dialogRef.disableClose = true;
  }

  // This will set Address
  setAddress(data: any = {}) {
    this.listItemData.unshift(data);
    this.addressControl.patchValue(this.listItemData[0]);
    this.controls.setValue(data._id);
  }

  // This will use foe select
  onSelect(event: any) {
    if (event) {
      this.controls.setValue(event._id);
    }
  }

  // This will compare Object
  compareObjectIds(o1: any, o2: any): boolean {
    return o1._id === o2._id;
  }
}
