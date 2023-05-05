import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-quill-view',
  templateUrl: './quill-view.component.html',
  styleUrls: ['./quill-view.component.scss']
})
export class QuillViewComponent implements OnInit {

  @Input() content;
  constructor() { }


  ngOnInit(): void {
  }

}
