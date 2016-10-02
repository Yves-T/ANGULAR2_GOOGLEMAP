import {Component} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MarkerService} from "./marker.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [MarkerService]
})
export class AppComponent {
  // start position
  lat: number = 51.187438;
  lng: number = 5.117759;
  // zoom level
  zoom: number = 12;
  markers: marker[];

  form: FormGroup;

  draggableOptions = [
    {value: true, description: "marker is draggable"},
    {value: false, description: "marker is not draggable"}
  ];

  constructor(private formBuilder: FormBuilder, private markerService: MarkerService) {
    this.form = formBuilder.group({
      name: ['', Validators.required],
      lat: ['', Validators.required],
      lng: ['', Validators.required],
      draggable: [false]
    });

    this.markers = this.markerService.getMarkers();
  }

  onSubmit() {
    console.log('add marker...');
    console.log(this.form);
    if (this.form.valid) {
      let marker = this.form.value;
      let isDraggable = (marker.draggable == 'yes') ? true : false;

      let newMarker = {
        name: marker.name,
        lat: parseFloat(marker.lat),
        lng: parseFloat(marker.lng),
        draggable: isDraggable
      };
      this.markers.push(newMarker);
      this.markerService.addMarker(newMarker);
    } else {
      alert('Please fill in all fields');
    }
  }


  clickedMarker(marker: marker, index: number) {
    console.log('clicked on ', marker);
  }

  mapClicked(event) {
    console.log(event);
    let newMarker = {
      name: 'Untitled',
      lat: event.coords.lat,
      lng: event.coords.lng,
      draggable: false
    };

    this.markers.push(newMarker);
    this.markerService.addMarker(newMarker);
  }


  markerDragEnd(marker: any, event) {
    let updMarker = {
      name: marker.name,
      lat: parseFloat(marker.lat),
      lng: parseFloat(marker.lng),
      draggable: false
    };

    let newLat = event.coords.lat;
    let newLng = event.coords.lng;

    this.markerService.updateMarker(updMarker, newLat, newLng);
  }

  removeMarker(index) {
    let markerToDelete = this.markers[index];
    this.markerService.deleteMarker(markerToDelete);
    this.markers.splice(index, 1);
  }

}

// marker type

interface marker {
  name?: string;
  lat: number;
  lng: number;
  draggable: boolean;
}
