import app from '../config';
import { getAuth, setPersistence, browserSessionPersistence, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged } from 'firebase/auth';
import { doc, getFirestore, setDoc } from 'firebase/firestore';

const auth = getAuth(app);
const db = getFirestore(app);

export const createProfile = async (uid: string, name: string, username: string, email: string, password: string) => {

    const newUser = {
        name: name,
        username: username,
        email: email,
        password: password
    };

    const userRef = doc(db, 'profiles', uid);
    return await setDoc(userRef, newUser)
    .then(() => {
        console.log('new user added');
        return true
    }).catch((e)=> {
        console.log(e);
    });
}