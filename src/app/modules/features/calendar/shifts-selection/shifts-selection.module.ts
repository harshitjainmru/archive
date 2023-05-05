import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ShiftsSelectionComponent } from "./shifts-selection/shifts-selection.component";
import { MatExpansionModule } from "@angular/material/expansion";
import { CustomCheckboxModule } from "src/app/modules/common/modules/custom-checkbox/custom-checkbox.module";
import { CommonSearchModule } from "src/app/modules/common/modules/common-search/common-search.module";
import { InfiniteScrollModule } from "ngx-infinite-scroll";
import { DataLoaderModule } from "src/app/modules/common/modules/data-loader/data-loader.module";
import { NotFoundModule } from "src/app/modules/common/modules/not-found/not-found.module";
import { NoRecordModule } from "src/app/modules/common/modules/no-record/no-record.module";
import { MatCheckboxModule } from "@angular/material/checkbox";

const MATERIAL = [MatExpansionModule];

const CUSTOM_MODULES = [
  CustomCheckboxModule,
  CommonSearchModule,
  DataLoaderModule,
  NoRecordModule,
  MatCheckboxModule,
];

const EXTERNAL_MODULES = [InfiniteScrollModule];

@NgModule({
  declarations: [ShiftsSelectionComponent],
  imports: [CommonModule, ...MATERIAL, ...CUSTOM_MODULES, ...EXTERNAL_MODULES],
  exports: [ShiftsSelectionComponent],
})
export class ShiftsSelectionModule {}
