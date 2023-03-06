import app from '../config';
import { getAuth, setPersistence, browserSessionPersistence, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged } from 'firebase/auth';
import { doc, getFirestore, setDoc } from 'firebase/firestore';

const auth = getAuth(app);
const db = getFirestore(app);

export const createProfile = (uid: string, name: string, username: string, email: string) => {

    const newUser = {
        name: name,
        username: username,
        email: email
    }

    const userRef = doc(db, 'profiles', uid);
    setDoc(userRef, newUser)
    .then(() => {
        console.log('new user added');
    }).catch((e)=> {
        console.log(e);
    })

    
    return 0;

}