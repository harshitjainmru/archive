import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { SelectSearchComponent } from "./component/select-search/select-search.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatInputModule } from "@angular/material/input";
import { MatSelectModule } from "@angular/material/select";
import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from "@angular/material/button";

const MATERIAL = [
  FormsModule,
  MatInputModule,
  ReactiveFormsModule,
  MatSelectModule,
  MatIconModule,
  MatButtonModule,
];

@NgModule({
  declarations: [SelectSearchComponent],
  imports: [CommonModule, ...MATERIAL],
  exports: [SelectSearchComponent, ...MATERIAL],
})
export class SelectSearchModule {}
