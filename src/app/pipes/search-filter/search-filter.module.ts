import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchFilterPipe } from './search-filter.pipe';
import { SearchUserPipe } from './search-user.pipe';
import { SelectFilterPipe } from './select-filter.pipe';



@NgModule({
  declarations: [SearchFilterPipe, SearchUserPipe, SelectFilterPipe],
  imports: [
    CommonModule
  ],
  exports: [SearchFilterPipe, SearchUserPipe, SelectFilterPipe]
})
export class SearchFilterModule { }
