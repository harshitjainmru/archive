import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-loader',
  template: `<div class="loader-overlay" *ngIf="show"><div class="progress">
             <div class="indeterminate"></div></div></div>`,
  styleUrls: ['./loader.component.scss']
})
export class LoaderComponent implements OnInit {
  @Input('show') show: string;                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            
  constructor() { }

  ngOnInit() {
   
  }

}
 