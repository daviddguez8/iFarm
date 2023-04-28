import { json } from "react-router-dom";
import app from '../config';
import { where, doc, getFirestore, getDocs, collection, query, setDoc } from 'firebase/firestore';

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
    return sectors;
}

export const waterSector = async (sectorName: string) => {

    const sectorsRef = collection(db, 'sectors');
    const q = query(sectorsRef, where("name", "==", sectorName));

    const docData = await getDocs(q).then((response) => {
        const doc = response.docs[0];
        const fetchedData = doc.data();
        fetchedData.humidity = 10;

        return fetchedData;

    });

    const docRef = doc(db, "sectors", sectorName);
    console.log(docRef);
    console.log(docData);
    await setDoc(docRef, docData).then((response) => {
        console.log(response);
    }).catch((error) => {
        console.log(error);
    });

}

export const harvestSector = async (sectorName: string) => {

    alert('here');

    const sectorsRef = collection(db, 'sectors');
    const q = query(sectorsRef, where("name", "==", sectorName));

    const docData = await getDocs(q).then((response) => {
        const doc = response.docs[0];
        const fetchedData = doc.data();
        fetchedData.harvest = 0;
        return fetchedData;
    });

    const docRef = doc(db, "sectors", sectorName);
    await setDoc(docRef, docData).then((response) => {
        console.log(response);
    }).catch((error) => {
        console.log(error);
    });


}