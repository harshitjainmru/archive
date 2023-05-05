import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JobInfoComponent } from './job-info.component';
import { JobListService } from '../../job-list/job-list.service';
import { ConstantParserModule } from 'src/app/pipes/constant-parser/constant-parser.module';



@NgModule({
  declarations: [JobInfoComponent],
  imports: [
    CommonModule,
    ConstantParserModule
  ],
  exports: [JobInfoComponent],
  providers: [JobListService]
})
export class JobInfoModule { }
