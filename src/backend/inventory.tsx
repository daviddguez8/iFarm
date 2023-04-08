import app from '../config';
import { getAuth, setPersistence, browserSessionPersistence, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged } from 'firebase/auth';
import { doc, getFirestore, getDocs, collection, query, orderBy, limit } from 'firebase/firestore';

const db = getFirestore(app);

export interface InventoryItem {
    description: string,
    entryDate: string,
    contents: {}
}

export const fetchInventory = async () => {

    const inventoryRef = collection(db, 'inventory');
    const latestInventoryQuery = query(inventoryRef, orderBy('entry_date', 'desc'), limit(10));

    return await getDocs(latestInventoryQuery).then((response) => {
        const fetchedData = response.docs.map((document) => {
            const data = document.data();
            const item: InventoryItem = {
                'description': data.description, 
                'entryDate': data.entry_date.toDate().toLocaleString('en-US', {timeZone: 'UTC'}),
                'contents': data.contents
            }
            return item;
        });
        //console.log(fetchedData)
        return fetchedData;
    });
    
    //return latestInventorySnapshot
}