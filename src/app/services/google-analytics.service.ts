import { DOCUMENT } from '@angular/common';
import { Inject, Injectable, OnDestroy } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { environment } from 'src/environments/environment';
import { IGoogleAnalyticsEvent } from '../models/common.interface';

declare let gtag: Function;
// declare var FB: any;

@Injectable({ providedIn: 'root' })
export class GoogleAnalyticsService {
  constructor(
    private router: Router,
    @Inject(DOCUMENT) private document: Document
  ) {}

  // This will event Emitter of IGoogleAnalyticsEvent type
  public eventEmitter(event: IGoogleAnalyticsEvent) {
    gtag('event', event.eventName, {
      eventCategory: event.eventCategory,
      eventLabel: event.eventLabel,
      eventAction: event.eventAction,
      eventValue: event.eventValue ? event.eventValue : null,
    });
  }

  //Event with string and Object
  public event(eventName: string, params: {}) {
    gtag('event', eventName, params);
    // FB.AppEvents.logEvent(eventName);
  }

  // This will Creates an instance of the element for the specified tag.
  public init(events?: any) {
    // this.listenForRouteChanges(events);
    try {
      // (function (d, s, id) {
      // let js,
      // fjs = d.getElementsByTagName(s)[0];
      // if (d.getElementById(id)) {
      // return;
      // }
      // js = d.createElement(s);
      // js.id = id;
      // js.src = "https://connect.facebook.net/en_US/sdk.js";
      // fjs.parentNode.insertBefore(js, fjs);
      // })(document, "script", "facebook-jssdk");
      // (window as any).fbAsyncInit = function () {
      // FB.init({
      // appId: environment.facebookKey, // CLient Accoutn Id
      // cookie: true,
      // xfbml: true,
      // version: "v9.0",
      // });
      // FB.AppEvents.logPageView();
      // };

      const script1 = this.document.createElement('script');
      script1.async = true;
      script1.src =
        'https://www.googletagmanager.com/gtag/js?id=' +
        environment.googleAnalyticsKey;
      this.document.head.appendChild(script1);

      const script2 = this.document.createElement('script');
      script2.innerHTML =
        `
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '` +
        environment.googleAnalyticsKey +
        `', {'send_page_view': false});
`;
      this.document.head.appendChild(script2);
      this.listenForRouteChanges(events);
    } catch (ex) {
      console.error('Error appending google analytics');
      console.error(ex);
    }
  }

  // An event triggered for navigation
  private listenForRouteChanges(events?: any) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        // console.log(event);
        gtag('config', environment.googleAnalyticsKey, {
          page_path: event.urlAfterRedirects,
        });
        if (events && events.eventName) {
          this.event(events.eventName, { eventAction: events.eventAction });
        }
        // console.log(
        // "Sending Google Analytics hit for route",
        // event.urlAfterRedirects
        // );
        // console.log("Property ID", environment.googleAnalyticsKey);
      }
    });
  }
}
