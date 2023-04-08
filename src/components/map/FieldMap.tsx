import { ReactNode, useEffect } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

mapboxgl.accessToken = 'pk.eyJ1IjoiZGF2aWRkZ3VlejgiLCJhIjoiY2xnOGZ4NHE3MGQ5czNnbzNuZWRsNDF5MyJ9.qLpmGgjRUKP2IsyOcjqI_A';

interface CropMapsProps {
  children: ReactNode;
}

export function FieldMap() {
  let map: mapboxgl.Map | null = null;

  useEffect(() => {
    if (!map) {
      map = new mapboxgl.Map({
        container: 'map-container',
        style: 'mapbox://styles/mapbox/satellite-v9',
        center: [-107.929074, 30.3807], // set the center of the map to a longitude/latitude pair
        zoom: 15, // set the zoom level
      });

      map.on('style.load', function () {
        const data: any = {
          'type': 'Feature',
          'geometry': {
            'type': 'Polygon',
            'coordinates': [[
              [-107.92758283129183, 30.38293550439016 ],
              [-107.92277715597903, 30.383028041951732],
              [-107.92732538440043, 30.379826191372317],
              [-107.92243389345677, 30.379826191372317],
            ]]
          }
        }

        map!.addSource('polygon', {
          'type': 'geojson',
          'data': data
        });

        map!.addLayer({
          'id': 'polygon-layer',
          'type': 'fill',
          'source': 'polygon',
          'layout': {},
          'paint': {
            'fill-color': '#088',
            'fill-opacity': 0.6,
          }
        });
      });

      // Add click event listener to map
      map.on('click', (e: any) => {
        console.log(`${e.lngLat.lng}, ${e.lngLat.lat} `);
      });

      // Add map controls, like zoom and compass
      map.addControl(new mapboxgl.NavigationControl());
      
      const polygonCoordinates = [
        [-107.930291, 30.377965],
        [-107.934345, 30.378040],
        [-107.934732, 30.381101],
        [-107.929950, 30.381473]
      ];

      const polygonGeoJSON: any = {
        type: 'Feature',
        geometry: {
          type: 'Polygon',
          coordinates: [polygonCoordinates]
        }
      };


      // map.addLayer({
      //   id: 'polygon',
      //   type: 'fill',
      //   source: 'polygon',
      //   paint: {
      //     'fill-color': '#FF0000',
      //     'fill-opacity': 0.5
      //   }
      // });

    }
  }, []);

  return (
    <>
      <div id="map-container" style={{ height: '100%', width: '100%' }} />
    </>
  );
}
