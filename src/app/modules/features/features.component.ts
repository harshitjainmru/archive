import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { UtilityService } from 'src/app/services/utility.service';

@Component({
  selector: 'app-features',
  templateUrl: './features.component.html',
  styleUrls: ['./features.component.scss']
})
export class FeaturesComponent implements OnInit {
  showSideView: boolean = false;
  panelSub: Subscription;

  constructor(private utilityService: UtilityService) { }

  ngOnInit(): void {
    this.panelSub = this.utilityService.sidepanel.subscribe(flag => {
      this.showSideView = !this.showSideView;
    })
  }

  ngOnDestroy() {
    this.panelSub.unsubscribe();
  }

}
