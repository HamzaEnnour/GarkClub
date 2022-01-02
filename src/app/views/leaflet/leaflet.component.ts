import { Component, OnInit } from '@angular/core';
import { circle, latLng, LatLng, Marker, polygon, tileLayer, TileLayer } from 'leaflet';
// import * as L from 'leaflet';
// import { GeoSearchControl, OpenStreetMapProvider } from 'leaflet-geosearch';

@Component({
  selector: 'app-leaflet',
  templateUrl: './leaflet.component.html',
  styleUrls: ['./leaflet.component.scss']
})
export class LeafletComponent implements OnInit {
  options: any;
  layers: any;
  marker : Marker = new Marker([ 36.8082,10.1651 ],{draggable: true,autoPan: true});
  lat: string = "";
  long: string = "";
  constructor() { }

  ngOnInit(): void {
    
    this.options = {
      layers: [
        tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 18, attribution: '...' })
      ],
      zoom: 9,
      center: latLng(36.8082,10.1651)
    };

    this.layers = [
      circle([ 46.95, -122 ], { radius: 5000 }),
      polygon([[ 46.8, -121.85 ], [ 46.92, -121.92 ], [ 46.87, -121.8 ]]),
      this.marker
    ];

    this.marker.on('dragend', (event) => {
      var latlng = event.target.getLatLng();
      this.lat = latlng.lat;
      this.long = latlng.lng;
      console.log(latlng.lat, latlng.lng);
  });

  // const map = L.map('map').setView([36.8082,10.1651], 13);
  // L.tileLayer('//{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);
  // let marker = L.marker([36.8082,10.1651],{draggable: true}).addTo(map);
//   const provider = new GeoSearch.OpenStreetMapProvider();
//   let search = GeoSearch.GeoSearchControl({
//   provider: provider,
//   showMarker: true,
//   marker: {draggable: true},
//   autoClose: true,
//   searchLabel: 'Enter address'
// });
// map.addControl(search);

// map.on('geosearch/marker/dragend',(event:any) => {
//   let latlng = event;
//   this.lat = latlng.location.lat;
//   this.long = latlng.location.lng;
// });

// marker.on('dragend',(event) => {
//   let latlng = event.target._latlng;
//   this.lat = latlng.lat;
//   this.long = latlng.lng;
// });

// map.on('geosearch/showlocation', (data: any) => {
//   console.log(data);
//   var lat = data.Location.Y, lng = data.Location.X;
//   marker.setLatLng(new L.LatLng(lat, lng));
  
// });

}

}
