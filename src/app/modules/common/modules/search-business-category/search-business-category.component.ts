import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-search-business-category',
  templateUrl: './search-business-category.component.html',
  styleUrls: ['./search-business-category.component.scss'],
})
export class SearchBusinessCategoryComponent implements OnInit {
  searchValue = new FormControl(['']);
  selectedCategories: any = [];
  @Input() categoryData: any = [];
  constructor() {}

  ngOnInit(): void {}

  onChenageState() {
    this.searchValue.setValue('');
  }

  // This will store selectedCategories item in array
  onSelectionChange(item: any) {
    if (!this.selectedCategories.includes(item)) {
      if (this.selectedCategories.length < 5) {
        this.selectedCategories.push(item);
      }
      // else {
      //   this._utilityService.showAlert("You ")
      // }onChenageState
    }
  }

  // This will remove item from selectedCategories array
  onRemove(item) {
    const index = this.selectedCategories.indexOf(item);
    if (index >= 0 && this.selectedCategories.length >= 1) {
      this.selectedCategories.splice(index, 1);
    }
    if (!this.selectedCategories.length) {
      // this.thirdStepForm.controls.businessCategories.setValue('');
    }
  }
}
