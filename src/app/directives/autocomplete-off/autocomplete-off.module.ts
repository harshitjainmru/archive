import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AutocompleteOffDirective } from './autocomplete-off.directive';



@NgModule({
  declarations: [AutocompleteOffDirective],
  imports: [
    CommonModule
  ],
  exports:[AutocompleteOffDirective]
})
export class AutocompleteOffModule { }
