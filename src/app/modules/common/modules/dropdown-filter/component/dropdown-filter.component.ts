import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatOption } from '@angular/material/core';
import { MatSelect } from '@angular/material/select';

@Component({
  selector: 'app-dropdown-filter',
  templateUrl: './dropdown-filter.component.html',
  styleUrls: ['./dropdown-filter.component.scss'],
})
export class DropdownFilterComponent implements OnInit {
  @ViewChild('select') select: MatSelect;
  @Input() dropdown: DropDown;
  constructor() {}

  ngOnInit() {}

  // This will select option
  toggleAllSelection(event) {
    if (event.checked) {
      this.select.options.forEach((item: MatOption) => item.select());
    } else {
      this.select.options.forEach((item: MatOption) => item.deselect());
    }
  }
}

// Interface for dropdown
interface DropDown {
  control: FormControl;
  label: string;
  list: { viewValue: string; value: string }[];
  multiple?: boolean;
}
