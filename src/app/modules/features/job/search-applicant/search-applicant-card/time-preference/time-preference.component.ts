import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-time-preference',
  templateUrl: './time-preference.component.html',
  styleUrls: ['./time-preference.component.scss']
})
export class TimePreferenceComponent implements OnInit {

  @Input() dayName;
  constructor() { }

  ngOnInit(): void {
  }

}
