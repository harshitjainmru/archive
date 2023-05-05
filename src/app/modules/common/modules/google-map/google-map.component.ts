import {
  Component,
  ElementRef,
  Inject,
  NgZone,
  OnInit,
  ViewChild,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { MapsAPILoader } from '@agm/core';
// import { ToastService } from '@toast';
// import { ERROR_MESSAGES } from 'src/app/shared/constants/messages';
import { GoogleMapService } from './_service/google-map.service';
import { UtilityService } from 'src/app/services/utility.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

declare const google: any;

@Component({
  selector: 'utb-google-map',
  templateUrl: './google-map.component.html',
  styleUrls: ['./google-map.component.scss'],
})
export class GoogleMapComponent implements OnInit {
  public latitude: number = 0;
  public longitude: number = 0;
  public searchControl: FormControl;
  zoom: number = 3.5;
  selectObj = {
    address: '',
    city: '',
    state: '',
    url: '',
    googlePlace: null,
    coordinates: [],
    lat: null,
    long: null,
  };

  @ViewChild('search') public searchElementRef: ElementRef;
  @ViewChild('search') search: HTMLInputElement;

  constructor(
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone,
    // private toast: ToastService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _utilityService: UtilityService,
    private _googleMap: GoogleMapService,
    private _dialog: MatDialogRef<GoogleMapComponent>
  ) {
    this.searchControl = new FormControl();
  }

  // On init life cycle hook
  async ngOnInit() {
    /*----------Change the default Zooming of Map----------*/
    // if (this.data && this.data && this.data.data.googlePlace && this.data.data.googlePlace.address_components) {
    //   this.resizeZoom(this.data.data.googlePlace.address_components, 1)
    // } else if (!this.data.data.googlePlace && this.data.data.address) {
    //   if (this.data.data.address.length > 15) {
    //     this.zoom = 17;
    //   } else {
    //     this.zoom = 3.5;
    //   }
    // }

    /*--google map wait--*/
    await this.waitGoogleMapLoad();
    if (this.data) {
      this.data['long'] = this.data.coordinates[0];
      this.data['lat'] = this.data.coordinates[1];
      // console.log(this.data, "this.initialData");
      this.getAndSetLocationOfGoogleMap(this.data, false);
    } else {
      this.setCurrentPosition();
    }
    this.searchGetGooglePlace();
  }

  // This will trigger when google map load
  async waitGoogleMapLoad() {
    return this.mapsAPILoader.load().then(
      () => {
        return true;
      },
      (error) => {
        return false;
      }
    );
  }

  // This method trigger when search the place
  searchGetGooglePlace() {
    let autocomplete = new google.maps.places.Autocomplete(
      this.searchElementRef.nativeElement,
      {}
    );
    autocomplete.addListener('place_changed', () => {
      this.ngZone.run(() => {
        let place = (google.maps.places.PlaceResult = autocomplete.getPlace());
        if (place.geometry === undefined || place.geometry === null) {
          return;
        }
        /*----------Change the Zooming of Map----------*/
        this.resizeZoom(place.address_components);

        /*-------set address on object----------Make address view google map-----*/
        this.getAndSetLocationOfGoogleMap(
          this._googleMap.addressFormatView(
            place,
            this.searchElementRef.nativeElement.value
          )
        );
      });
    });
  }

  // This will set current position
  private setCurrentPosition() {
    this._googleMap.setCurrentPosition().then(
      (address) => {
        this.getAndSetLocationOfGoogleMap(address);
      },
      (error) => {
        this.getAndSetLocationOfGoogleMap(error);
      }
    );
  }

  // This will get address and set
  getAndSetLocationOfGoogleMap(address: any, inputFocus?: boolean) {
    if (address) {
      if (address.address.length > 20) {
        this.zoom = 17;
      } else {
        this.zoom = 3.5;
      }
      for (const key in address) {
        if (address.hasOwnProperty(key)) {
          this.selectObj[key] = address[key];
        }
      }
      this.latitude = address.lat;
      this.longitude = address.long;
      if (inputFocus) {
        this.searchElementRef.nativeElement.focus();
      }
      this.searchControl.setValue(this.selectObj.address);
    }
  }

  // This will marker drag end
  markerDragEnd(event: MouseEvent) {
    this._googleMap
      .addressEncode(event['coords'].lat, event['coords'].lng)
      .then((address) => {
        this.getAndSetLocationOfGoogleMap(address);
      });
  }

  // This will submit the address
  submitAddress() {
    if (!this.selectObj.address) {
      // this._utilityService.showAlert(`${ERROR_MESSAGES.OOPS}. Please select google location`);
      this._utilityService.showAlert(`Please select google location`);
      return;
    }
    // this.selectObj['parentData'] = this.data;/*--return parent data---*/
    this.selectObj.coordinates = [this.selectObj.long, this.selectObj.lat];
    this.selectObj.lat = '' + this.selectObj.lat;
    this.selectObj.long = '' + this.selectObj.long;

    this._googleMap.setLatLog(null, this.selectObj.lat, this.selectObj.long); //it is only for selected location
    // console.log(this.selectObj, "this.selectObj");

    this._dialog.close(this.selectObj); /*--send--*/
  }

  // This will resize zoom
  resizeZoom(address: any, defaultCase?: number) {
    if (defaultCase == 1) {
      if (address.length - 1 > 3) {
        this.zoom = 17;
      } else {
        this.zoom = 4;
      }
    } else {
      if (address.length > 3) {
        this.zoom = address.length * 2.5;
      } else {
        this.zoom = 3.5;
      }
    }
  }
}
