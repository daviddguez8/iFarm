import * as React from 'react';
import { ReactNode, useEffect } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import '@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css'
import { fetchMapData, waterSector } from '../../backend/fieldMap';
import MapboxDraw from "@mapbox/mapbox-gl-draw";
import ReactDOMServer from 'react-dom/server';

//Public token
//mapboxgl.accessToken = 'pk.eyJ1IjoiZGF2aWRkZ3VlejgiLCJhIjoiY2xnOGVsMGM0MHZ1MTNybjVhOHJvbzYzcSJ9.mIZHW4eAwgDi5PM8RC86sw';

//AirFarm Fields
mapboxgl.accessToken = 'pk.eyJ1IjoiZGF2aWRkZ3VlejgiLCJhIjoiY2xnOGZ4NHE3MGQ5czNnbzNuZWRsNDF5MyJ9.qLpmGgjRUKP2IsyOcjqI_A';

export class FieldMap extends React.Component {
  map!: mapboxgl.Map;
  x: number;

  constructor(props: any) {
    super(props);
    this.x = 2
    
  }



  componentDidMount() {
    //Adding the sectors data to the map
    this.map = new mapboxgl.Map({
      container: 'map-container',
      style: 'mapbox://styles/mapbox/satellite-streets-v12',
      center: [-114.612945092381, 33.63884782006831], // set the center of the map to a longitude/latitude pair
      zoom: 1, // set the zoom level
    });
    
    this.map.on('style.load', async  () => {
      const sectors: any = await fetchMapData();
      
      for (const idx in sectors) {
        const sector = sectors[idx];

        this.map.addSource(sector.name + '-polygon', {
          'type': 'geojson',
          'data': sector.geojson
        });

        this.map.addLayer({
          'id': sector.name,
          'type': 'fill',
          'source': sector.name + '-polygon',
          'layout': {},
          'paint': {
            'fill-color': '#088',
            'fill-opacity': 0.6,
          }
        });

        //Event listener for click on a sector
        this.map.on('click', sector.name,  (e) => {
          // Get the feature that was clicked
          // Create the popup
          const popup = new mapboxgl.Popup({
            closeButton: true,
            closeOnClick: true
          });
          popup.setHTML(this.createPopupContent(sector));

          // Display the popup
          popup.setLngLat(e.lngLat).addTo(this.map);

          //The popup html has a button with class water, I want to run the function waterSector() when the button in the popup is clicked
          //I tried to add an event listener to the button but it doesn't work
          const waterButton = document.getElementById('water-' + sector.name);
          console.log(waterButton);
          waterButton?.addEventListener('click', (e) => {
            console.log('watering sector' + sector.name);
            //alert('here');
            //waterSector(sector.name);
          });

          const harvestButton = document.getElementById('harvest-' + sector.name);
          console.log(harvestButton);
          harvestButton?.addEventListener('click', (e) => {
            console.log('harvesting sector' + sector.name);
          });

        });
      }

    });

    // Add map controls, like zoom and compass
    this.map.addControl(new mapboxgl.NavigationControl());

    //Drawing controls
    const draw = new MapboxDraw({
      // set drawing options here
      displayControlsDefault: false,
      controls: {
        polygon: true,
        trash: true
      },
      styles: [
        {
          id: 'gl-draw-polygon-fill-inactive',
          type: 'fill',
          paint: {
            'fill-color': '#3bb2d0',
            'fill-opacity': 0.4
          }
        },
        {
          id: 'gl-draw-polygon-stroke-inactive',
          type: 'line',
          paint: {
            'line-color': '#3bb2d0',
            'line-width': 2
          }
        }
      ],
    });
    this.map.addControl(draw, 'top-right');

    //Map initial animation
    this.map.flyTo({
      center: [-114.612945092381, 33.63884782006831],
      zoom: 14,
      speed: 1.2
    });

    // Add click event listener to map to print coordinates
    this.map.on('click', (e: any) => {
      console.log(`${e.lngLat.lng}, ${e.lngLat.lat} `);
    });

  };

  createPopupContent = (sector: any) => {
    return '<h3>' +
      sector.name +
      '</h3>' +
      '<ul style="color: black">' +
      '<li>Humidity:' + sector.humidity + '</li>' +
      '<li>Health:' + sector.health + '</li>' +
      '<li>Volume:' + sector.volume + '</li>' +
      '<li>Harvest:' + sector.harvest + '</li>' +
      '</ul>' +
      "<button id='water-" + sector.name + "'>Water</button>" +
      "<button id='harvest-" + sector.name + "'>Harvest</button>";
  }

  render() {
    return (
      <>
        <div id="map-container" style={{ height: '100%', width: '100%' }} />
      </>
    );
  }
}
