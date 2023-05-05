import { Injectable } from '@angular/core';
// import { ToastService } from '@toast';
import { MapsAPILoader } from '@agm/core';
import { UtilityService } from 'src/app/services/utility.service';
declare const google: any;

@Injectable({
  providedIn: 'root',
})
export class GoogleMapService {
  DEFAULT_LOCATION = [42.3600825, -71.05888010000001];

  constructor(
    // private toast: ToastService,
    private _utilityService: UtilityService,
    private mapsAPILoader: MapsAPILoader
  ) {}

  // This will address encode with lat and log
  async addressEncode(lat: any, long: any) {
    await this.waitGoogleMapLoad(); /*--google map wait--*/
    return new Promise((resolve, reject) => {
      let geocoder = new google.maps.Geocoder();
      var latlng = { lat: +lat, lng: +long };
      geocoder.geocode({ location: latlng }, (results, status) => {
        if (status === 'OK') {
          let formatAddress = this.addressFormatView(
            results[8] &&
              results[8].formatted_address &&
              results[8].formatted_address == 'Boston, MA, USA'
              ? results[8]
              : results[0]
          );
          resolve(formatAddress);
        } else {
          reject(false);
          this._utilityService.showAlert('Geocoder failed');
        }
      });
    });
  }

  // This will define address formate view
  addressFormatView(place: any, elementValue?: any) {
    let formatAddress = {
      address: '',
      city: '',
      state: '',
      url: '',
      lat: null,
      long: null,
      googlePlace: null,
      coordinates: [] /*--long,lat----*/,
    };
    formatAddress.googlePlace = place;
    formatAddress.coordinates[0] = place.geometry.location.lat();
    formatAddress.coordinates[1] = place.geometry.location.lng();
    formatAddress.lat = place.geometry.location.lat();
    formatAddress.long = place.geometry.location.lng();
    formatAddress.url = place.url;

    formatAddress.address = elementValue
      ? elementValue
      : place.formatted_address;

    if (place.address_components.length > 2) {
      formatAddress.city = place.address_components[0].long_name; /*--city--*/
      formatAddress.state =
        place.address_components[
          place.address_components.length - 2
        ].long_name; /*--state--*/
    }
    return formatAddress;
  }

  // This will set current possition
  async setCurrentPosition() {
    await this.waitGoogleMapLoad(); /*--google map wait--*/
    return new Promise((resolve, reject) => {
      if ('geolocation' in navigator) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            this.addressEncode(
              position.coords.latitude,
              position.coords.longitude
            ).then((address) => {
              if (address) {
                resolve(address);
                this.setLatLog(address);
              }
            });
          },
          (error: any) => {
            this.addressEncode(
              this.DEFAULT_LOCATION[0],
              this.DEFAULT_LOCATION[1]
            ).then((address: any) => {
              if (address) {
                let err = {
                  errorCode: error.code,
                  errorMessage: error.message,
                };
                reject({ ...address, ...err });
                this.setLatLog(address);
              }
            });
          }
        );
      } else {
        alert('Geolocation is not supported for this browser.');
      }
    });
  }

  // This will wait for google map load
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

  // This will set lat and long of address
  setLatLog(address: any, lat?, long?) {
    sessionStorage.setItem('lat', lat ? lat : address.lat);
    sessionStorage.setItem('long', long ? long : address.long);
  }

  // This will get current lat and long
  get getCurrentLatLong() {
    const lat = sessionStorage.getItem('lat');
    const long = sessionStorage.getItem('long');
    if (lat && long) {
      return { lat: lat, long: long };
    } else {
      return false;
    }
  }
}
