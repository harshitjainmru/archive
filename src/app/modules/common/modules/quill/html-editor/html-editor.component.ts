import { Component, OnInit, Inject, Input } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormService } from 'src/app/services/form.service';

@Component({
  selector: 'app-html-editor',
  templateUrl: './html-editor.component.html',
  styleUrls: ['./html-editor.component.scss'],
})
export class HtmlEditorComponent implements OnInit {
  htmlEditorForm: FormGroup;
  constructor(
    private formService: FormService,
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<HtmlEditorComponent>,
    @Inject(MAT_DIALOG_DATA) private data: any
  ) {
    this.createForm();
  }

  // On init life cycle hook
  ngOnInit() {
    //  console.log("in dismiss");(this.data)
    this.htmlEditorForm.controls['editor'].setValue(
      this.data.config.control.value
    );
  }

  // Create form group
  createForm() {
    this.htmlEditorForm = this.fb.group({
      editor: this.formService.getControl('cmsDesc'),
    });
  }

  // This will submit htmlEditorForm date with close dialog
  submit() {
    const content = this.htmlEditorForm.get('editor').value;
    this.dialogRef.close(content);
  }

  // This will use for close dialog
  close() {
    this.dialogRef.close();
  }
}
