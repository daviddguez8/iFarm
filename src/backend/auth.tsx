import app from '../config';
import { getAuth, setPersistence, browserSessionPersistence, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged } from 'firebase/auth';
import { doc } from 'firebase/firestore';
import { createProfile } from './profile';
import { AuthErrorCodes } from 'firebase/auth'
const auth = getAuth(app);

export const createAccount = async (name: string, email: string, password: string, username: string) => {
    let uid = '';
    const wasCreated = await setPersistence(auth, browserSessionPersistence)
    .then(()=> {
        //Promise returned by setPersistence
        return createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential)=> {
            const user = userCredential.user;
            uid = user.uid;
            return true;
        }).catch((e)=> {
            if (e.code == AuthErrorCodes.EMAIL_EXISTS) {
                alert('Email is already in use, please retry with a different email or log in');
            }
            return false;
        })
    }).catch((e)=> {
        //Error from persistence caught
        if (e == AuthErrorCodes.EMAIL_EXISTS) {
            alert('email already in use');
        }
        alert('error');
        return false;
    });

    if (wasCreated) {
        createProfile(uid, name, username, email, password);
    }
    return wasCreated;
}

export const logIn = async (email: string, password: string) => {
    
    //WARNING: DEVELOPMENT ONLY REMOVE WHEN PRODUCTION
    let correctLogin = false;

    return await signInWithEmailAndPassword(auth, email, password)
    .then((user)=>{
        alert('User signed in: ' + user.user.email);
        console.log(auth);
        return true;
    }).catch((e)=> {
        console.log(e);
        return false
    });
}


export const logOut = () => {
    return signOut(auth)
    .then(()=> {
        //Sign-out succesful,
        console.log('Signed out');
        return true;
    }).catch((e)=> {
        //error
        console.log(e);
        return false;
    });
};

//Observer
onAuthStateChanged(auth, (user)=> {
    if (user) {
        const uid = user.uid;
        console.log(uid);
        console.log('signed IN onAuthState');
        //...
    } else {
        console.log('Signed OUT onAuthState');

    }
});
