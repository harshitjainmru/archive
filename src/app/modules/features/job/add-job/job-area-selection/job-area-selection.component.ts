import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatSelectChange } from '@angular/material/select';
import { SelectSearchComponent } from 'src/app/modules/common/modules/select-search/component/select-search/select-search.component';

@Component({
  selector: 'app-job-area-selection',
  templateUrl: './job-area-selection.component.html',
  styleUrls: ['./job-area-selection.component.scss']
})
export class JobAreaSelectionComponent implements OnInit {
  @ViewChild(SelectSearchComponent) searchComponent: SelectSearchComponent;
  @Input() stateCityLists = [];
  jobAreaCtrl: FormControl;
  @Input() set jobAreaSelectCtrl(ctrl) {
    if (ctrl) {
      this.jobAreaCtrl = ctrl;
    }
  };
  @Output() jobAreaSelection = new EventEmitter();
  search = "";
  constructor() { }

  ngOnInit(): void {
  }

  onJobAreaSelection(event: MatSelectChange) {
    this.jobAreaSelection.emit(event)
  }

  onClearSearch() {
    this.searchComponent.clearValue();
  }
}