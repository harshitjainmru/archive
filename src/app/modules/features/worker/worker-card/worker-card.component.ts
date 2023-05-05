import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-worker-card',
  templateUrl: './worker-card.component.html',
  styleUrls: ['./worker-card.component.scss']
})
export class WorkerCardComponent implements OnInit {
  @Input() workerData;
  constructor() { }

  ngOnInit(): void {
  }

}
