import {Injectable} from '@angular/core';
import {Init} from "./init-markers";

@Injectable()
export class MarkerService extends Init {

  constructor() {
    super();
    this.load();
  }

  getMarkers() {
    return JSON.parse(localStorage.getItem('markers'));
  }

  addMarker(marker: any) {
    let markers = JSON.parse(localStorage.getItem('markers'));
    markers.push(marker);
    this.persistMarkers(markers);
  }

  updateMarker(updatedMarker: any, newLat: number, newLng: number) {
    let markers = this.getMarkers();

    let marker = this.findMarker(updatedMarker);

    if (marker) {
      marker.lat = newLat;
      marker.lng = newLng;
      this.persistMarkers(markers);
    }
  }

  deleteMarker(markerToDelete) {
    let markers = this.getMarkers();
    let marker = this.findMarker(markerToDelete);

    if (marker) {
      markers.splice(markers.indexOf(marker), 1);
    }

    this.persistMarkers(markers);
  }

  private findMarker(someMarker) {
    let markers = this.getMarkers();
    return markers.find(function (marker) {
      return someMarker.lat == marker.lat && someMarker.lng == marker.lng;
    });
  }

  private persistMarkers(markers) {
    localStorage.setItem('markers', JSON.stringify(markers));
  }
}
