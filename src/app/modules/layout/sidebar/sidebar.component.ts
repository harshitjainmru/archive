import { Component, OnInit, ViewChildren } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  panelOpenState = false;
  step;


  constructor() { }

  ngOnInit(): void {
  }



  setStep(index: number) {
    this.step = index;
  }
}
