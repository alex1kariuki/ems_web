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


  constructor() {
    /*Initializing Map*/
    
  }
  ngOnInit() {
    (mapboxgl as any).accessToken =  environment.mapboxToken;

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
      zoom: 13,
      center: [this.lng, this.lat],
      maxZoom:100,
      scrollZoom: true
    });
  }

}
