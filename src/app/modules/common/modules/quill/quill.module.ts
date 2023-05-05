import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { QuillModule } from "ngx-quill";
import { FormsModule,ReactiveFormsModule } from "@angular/forms";
import { QuillComponent } from "./quill.component";
import { ValidationErrorPipeModule } from "src/app/pipes/validation-error/validation-error-pipe.module";
import { HtmlEditorComponent } from "./html-editor/html-editor.component";
// import { GetControlModule } from "src/app/pipes/get-control";
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from "@angular/material/button";
import { QuillViewComponent } from './quill-view/quill-view.component';
import { GetControlModule } from "src/app/pipes/get-control/get-control.module";
import 'quill-emoji/dist/quill-emoji.js';

@NgModule({
  declarations: [QuillComponent, HtmlEditorComponent, QuillViewComponent],
  imports: [
    CommonModule,
    QuillModule.forRoot(),
    FormsModule,
    MatFormFieldModule,
    ValidationErrorPipeModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatInputModule,
    GetControlModule,
    MatButtonModule
  ],
  exports: [QuillComponent,QuillViewComponent],
  entryComponents: [HtmlEditorComponent],
})
export class QuillEditorModule {}
