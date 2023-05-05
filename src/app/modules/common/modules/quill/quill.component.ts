import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms';
import { HtmlEditorComponent } from './html-editor/html-editor.component';
import { MatDialog } from '@angular/material/dialog';
import { quillConfigConst } from 'src/app/constants/constant';
import { IQuildConfig } from 'src/app/models/common.interface';
import { PATTERN } from 'src/app/constants/patterns';

@Component({
  selector: 'app-quill',
  templateUrl: './quill.component.html',
  styleUrls: ['./quill.component.scss'],
})
export class QuillComponent {
  modules = quillConfigConst;
  editorData: any = {};
  @Input() quillConfig: IQuildConfig;
  @Output() editContent = new EventEmitter<any>();
  @Output() save = new EventEmitter<any>();
  @Output() cancel = new EventEmitter<any>();
  @Input()
  set data(data) {
    if (data && data.body) {
      this.editorData = data.body;
      //  console.log("in dismiss");("editor data", this.editorData);
    } else {
      this.editorData = null;
    }
  }

  htmlString = '<p  style="color:red;">bold</p>';
  constructor(private dialog: MatDialog) {
    // this.quillControl.valueChanges.subscribe((resp) => {
    //   //  console.log("in dismiss");(resp);
    // });
    //  console.log("in dismiss");("editor");
  }

  /**
   * Determines whether content changed
   * @param event
   */
  onContentChanged(event) {
    // debugger;
    if (event.html) {
      // //  console.log("in dismiss");()
      const text = event.html.replace(PATTERN.removeHTML, '').trim();
      // //  console.log("in dismiss");("text", text, text.length);
      if (text.length === 0) {
        this.editorData = null;
        event.html = null;
      }

      // event.html = event.html.trim();
    } else {
      // //  console.log("in dismiss");(event.html);
    }
    // //  console.log("in dismiss");(event.html);
    this.editContent.emit(event);
  }

  /**
   * Inserts html
   */
  insertHtml() {
    const dialogRef = this.dialog.open(HtmlEditorComponent, {
      width: '800px',
      data: { config: this.quillConfig },
    });
    dialogRef.afterClosed().subscribe((resp) => {
      // //  console.log("in dismiss");({ resp });
      if (resp) {
        this.quillConfig.control.setValue(resp);
      }
    });
  }

  // This will save content
  saveContent() {
    this.save.emit(true);
  }

  // This will cancle emit value
  onCancel() {
    this.cancel.emit(true);
  }
}
