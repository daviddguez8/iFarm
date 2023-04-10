import { ReactNode, useEffect } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import '@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css'
import { fetchMapData } from '../../backend/fieldMap';
import MapboxDraw from "@mapbox/mapbox-gl-draw";
import ReactDOMServer from 'react-dom/server';
import BarChart from '../charts/BarChart';

//mapboxgl.accessToken = 'pk.eyJ1IjoiZGF2aWRkZ3VlejgiLCJhIjoiY2xnOGZ4NHE3MGQ5czNnbzNuZWRsNDF5MyJ9.qLpmGgjRUKP2IsyOcjqI_A';

//Public token
mapboxgl.accessToken = 'pk.eyJ1IjoiZGF2aWRkZ3VlejgiLCJhIjoiY2xnOGVsMGM0MHZ1MTNybjVhOHJvbzYzcSJ9.mIZHW4eAwgDi5PM8RC86sw';


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

          map!.on('click', sector.name, function (e) {
            // Get the feature that was clicked
            // Create the popup
            const popup = new mapboxgl.Popup({
              closeButton: true,
              closeOnClick: true
            });
            //.setHTML(ReactDOMServer.renderToString(<BarChart data={[0,1,2,3]}/>))
            popup.setHTML(createPopupContent(sector));

            popup.setLngLat(e.lngLat).addTo(map!)
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
    console.log(ReactDOMServer.renderToString(<BarChart data={[0,1,2,3]}/>));
    
    return  '<h3>'+ 
              sector.name+ 
            '</h3>'+
            '<ul style="color: black">' + 
             '<li>Humidity:'+sector.humidity+'</li>'+
             '<li>Health:'+sector.health+'</li>'+
             '<li>Volume:'+sector.volume+'</li>'+
             '<li>Harvest:'+sector.harvest+ '</li>'+
            '</ul>';
  }

  return (
    <>
      <div id="map-container" style={{ height: '100%', width: '100%' }} />
    </>
  );
}
