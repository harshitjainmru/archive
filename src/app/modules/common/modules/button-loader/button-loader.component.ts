import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-button-loader',
  templateUrl: './button-loader.component.html',
  styleUrls: ['./button-loader.component.scss']
})
export class ButtonLoaderComponent implements OnInit {

  @Input() showLoader = false;
  @Input() diameter = 20;

  constructor() { }

  ngOnInit(): void {
  }

}
