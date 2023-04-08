import app from '../config';
import { getAuth, setPersistence, browserSessionPersistence, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged } from 'firebase/auth';
import { doc, getFirestore, getDocs, collection, query, orderBy, limit } from 'firebase/firestore';

const db = getFirestore(app);

export const fetchShipments = async () => {

    const inventoryRef = collection(db, 'shipments');
    const latestInventoryQuery = query(inventoryRef, orderBy('date', 'desc'), limit(10));

    return await getDocs(latestInventoryQuery).then((response) => {
        const fetchedData = response.docs.map((document) => {
            const data = document.data();
            return [
                data.customer, 
                data.destination,
                data.eta.toDate().toLocaleString('en-US', {timeZone: 'UTC'}),
                data.total,
                data.status
            ]
        });
        return fetchedData;
    });
}