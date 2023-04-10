import { json } from "react-router-dom";
import app from '../config';
import { doc, getFirestore, getDocs, collection, query, orderBy, limit } from 'firebase/firestore';

const db = getFirestore(app);

export const fetchMapData = async () => {
    const sectorsRef = collection(db, 'sectors');

    const q = query(sectorsRef);
    const sectors = await getDocs(q).then((response) => {
        return response.docs.map((document) => {
            const fetchedData = document.data();
            fetchedData.geojson = JSON.parse(fetchedData.geojson);
            //console.log(fetchedData);
            return fetchedData;
        });
    });

    /*
    const stringSectors = {
        'sector1': {
            "type": "FeatureCollection",
            "features": [
                {
                    "type": "Feature",
                    "properties": {},
                    "geometry": {
                        "coordinates": [
                            [
                                [
                                    -114.62378538552949,
                                    33.646303040480376
                                ],
                                [
                                    -114.62378538552949,
                                    33.63918582011593
                                ],
                                [
                                    -114.61486184123643,
                                    33.63918582011593
                                ],
                                [
                                    -114.61486184123643,
                                    33.646303040480376
                                ],
                                [
                                    -114.62378538552949,
                                    33.646303040480376
                                ]
                            ]
                        ],
                        "type": "Polygon"
                    }
                }
            ]
        },
        'sector2': {
            "type": "FeatureCollection",
            "features": [
                {
                    "type": "Feature",
                    "properties": {},
                    "geometry": {
                        "coordinates": [
                            [
                                [
                                    -114.62347337349131,
                                    33.6389780092217
                                ],
                                [
                                    -114.62347337349131,
                                    33.63196409746814
                                ],
                                [
                                    -114.61479943882871,
                                    33.63196409746814
                                ],
                                [
                                    -114.61479943882871,
                                    33.6389780092217
                                ],
                                [
                                    -114.62347337349131,
                                    33.6389780092217
                                ]
                            ]
                        ],
                        "type": "Polygon"
                    }
                }
            ]
        },
        'sector3': {
            "type": "FeatureCollection",
            "features": [
                {
                    "type": "Feature",
                    "properties": {},
                    "geometry": {
                        "coordinates": [
                            [
                                [
                                    -114.61492123714858,
                                    33.63918331699834
                                ],
                                [
                                    -114.61492123714858,
                                    33.63206550811617
                                ],
                                [
                                    -114.60618490007825,
                                    33.63206550811617
                                ],
                                [
                                    -114.60618490007825,
                                    33.63918331699834
                                ],
                                [
                                    -114.61492123714858,
                                    33.63918331699834
                                ]
                            ]
                        ],
                        "type": "Polygon"
                    }
                }
            ]
        },
        'sector4': {
            "type": "FeatureCollection",
            "features": [
                {
                    "type": "Feature",
                    "properties": {},
                    "geometry": {
                        "coordinates": [
                            [
                                [
                                    -114.61498363841102,
                                    33.64619664108025
                                ],
                                [
                                    -114.61498363841102,
                                    33.63923526995383
                                ],
                                [
                                    -114.60618489893297,
                                    33.63923526995383
                                ],
                                [
                                    -114.60618489893297,
                                    33.64619664108025
                                ],
                                [
                                    -114.61498363841102,
                                    33.64619664108025
                                ]
                            ]
                        ],
                        "type": "Polygon"
                    }
                }
            ]
        }
    }
    */
    return sectors;
}