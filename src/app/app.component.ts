import { Component, ViewChild, ElementRef } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';
import { environment } from '../environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  title = 'ems-web';

  lat = -1.239362;
  lng = 36.726713;

  map!: mapboxgl.Map;
  @ViewChild('mapElement')
  mapElement!: ElementRef;


  currentdate: any;
  datetime: any;
geojson: any;

  

  constructor() {
    /*Initializing Map*/
    this.geojson = [
      {
        type: 'Feature',
        geometry: {
          type: 'Point',
          coordinates: [-77.031952, 38.913184]
        },
        properties: {
          'marker-color': '#3bb2d0',
          'marker-size': 'large',
          'marker-symbol': 'rocket'
        }
      },
      {
        type: 'Feature',
        geometry: {
          type: 'Point',
          coordinates: [-122.413682, 37.775408]
        },
        properties: {
          'marker-color': '#3bb2d0',
          'marker-size': 'large',
          'marker-symbol': 'rocket'
        }
      }
    ];
  }
  ngOnInit() {
    (mapboxgl as any).accessToken = environment.mapboxToken;

    this.currentdate = new Date();
    this.datetime = "Last Sync: " +
      + this.currentdate.getHours() + ":"
      + this.currentdate.getMinutes() + ":"
      + this.currentdate.getSeconds();

  }

  ngAfterViewInit() {
    this.map = new mapboxgl.Map({
      container: this.mapElement.nativeElement,
      style: 'mapbox://styles/mapbox/streets-v9',
      zoom: 12,
      center: [this.lng, this.lat],
      maxZoom: 100,
      scrollZoom: false
    }).addControl(new mapboxgl.AttributionControl({
      customAttribution: 'Map design by me'
    }));

    this.addMarker()

  }

  addMarker() {
    const marker = new mapboxgl.Marker({
      color: "#FFFFFF",
    
      draggable: true,
    }).setLngLat([this.lng, this.lat])
      .setPopup(new mapboxgl.Popup({ offset: 25 }) // add popups
        .setHTML('<h6>Camp Fire</h6><p>Description</p>'))
      .addTo(this.map);
  }

}
