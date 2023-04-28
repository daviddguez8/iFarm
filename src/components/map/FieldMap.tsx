import { ReactNode, useEffect } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import '@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css'
import { fetchMapData, harvestSector, waterSector } from '../../backend/fieldMap';
import MapboxDraw from "@mapbox/mapbox-gl-draw";
import ReactDOMServer from 'react-dom/server';

//Public token
//mapboxgl.accessToken = 'pk.eyJ1IjoiZGF2aWRkZ3VlejgiLCJhIjoiY2xnOGVsMGM0MHZ1MTNybjVhOHJvbzYzcSJ9.mIZHW4eAwgDi5PM8RC86sw';

//AirFarm Fields
mapboxgl.accessToken = 'pk.eyJ1IjoiZGF2aWRkZ3VlejgiLCJhIjoiY2xnOGZ4NHE3MGQ5czNnbzNuZWRsNDF5MyJ9.qLpmGgjRUKP2IsyOcjqI_A';

export function FieldMap() {
  let map: mapboxgl.Map | null = null;

  
  useEffect(() => {
    if (!map) {

      map = new mapboxgl.Map({
        container: 'map-container',
        style: 'mapbox://styles/mapbox/satellite-streets-v12',
        center: [-114.612945092381, 33.63884782006831], // set the center of the map to a longitude/latitude pair
        zoom: 1, // set the zoom level
      });

      //Adding the sectors data to the map
      map.on('style.load', async function () {
        const sectors: any = await fetchMapData();

        for (const idx in sectors) {
          const sector = sectors[idx];

          map!.addSource(sector.name + '-polygon', {
            'type': 'geojson',
            'data': sector.geojson
          });

          map!.addLayer({
            'id': sector.name,
            'type': 'fill',
            'source': sector.name + '-polygon',
            'layout': {},
            'paint': {
              'fill-color': '#088',
              'fill-opacity': 0.6,
            }
          });

          map!.on('click', sector.name,  (e) => {
            
            // Get the feature that was clicked
            // Create the popup
            const popup = new mapboxgl.Popup({
              closeButton: true,
              closeOnClick: true
            });
            popup.setHTML(createPopupContent(sector));
            
            // Display the popup
            popup.setLngLat(e.lngLat).addTo(map!);

            
            //Adding event listeners to the buttons so that user can take actions on sectors

            const waterButton = document.getElementById('water-'+sector.name);
            waterButton?.addEventListener('click', (e) => {
              e.preventDefault();
              console.log('watering sector' + sector.name);
              
              waterSector(sector.name);
            });

            const harvestButton = document.getElementById('harvest-'+sector.name);
            
            harvestButton?.addEventListener('click', (e) => {
              e.preventDefault();
              
              harvestSector(sector.name);
            });
          });
        }

      });

      // Add map controls, like zoom and compass
      map.addControl(new mapboxgl.NavigationControl());

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
      map.addControl(draw, 'top-right');

      //Map initial animation
      map.flyTo({
        center: [-114.612945092381, 33.63884782006831],
        zoom: 14,
        speed: 1.2
      });

      // Add click event listener to map to print coordinates
      map.on('click', (e: any) => {
        console.log(`${e.lngLat.lng}, ${e.lngLat.lat} `);
      });
    }
  }, []);

  const createPopupContent = (sector: any) => {

    let popupContent = 
      '<h3>' +
      sector.name +
      '</h3>' +
      '<ul style="color: black">' +
      '<li>Humidity:' + sector.humidity + '</li>' +
      '<li>Health:' + sector.health + '</li>' +
      '<li>Volume:' + sector.volume + '</li>' +
      '<li>Harvest:' + sector.harvest + '</li>' +
      '</ul>';

    if (sector.humidity < 10) {
      popupContent += "<button style='background-color: blue' id='water-"+sector.name+"'>Water</button>";
    }
    if (sector.harvest == 10) {
      popupContent += "<button style='background-color: green' id='harvest-"+sector.name+"'>Harvest</button>";
    }
    return popupContent 
  }

  return (
    <>
      <div id="map-container" style={{ height: '100%', width: '100%' }} />
    </>
  );
}
