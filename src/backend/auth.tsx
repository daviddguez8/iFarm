import app from '../config';
import { getAuth, setPersistence, browserSessionPersistence, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged } from 'firebase/auth';
import { doc } from 'firebase/firestore';
import { createProfile } from './profile';
import { AuthErrorCodes } from 'firebase/auth'
const auth = getAuth(app);

export const createAccount = async (name: string, email: string, password: string, username: string) => {
    let wasCreated = false;
    setPersistence(auth, browserSessionPersistence)
    .then(()=> {
        
        //Promise returned by setPersistence
        createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential)=> {
            const user = userCredential.user;
            console.log(user);
            console.log(user.uid);
            wasCreated = true;
            createProfile(user.uid, name, username, email);
        }).catch((e)=> {
            if (e.code == AuthErrorCodes.EMAIL_EXISTS) {
                alert('Email is already in use, please retry with a different email or log in');
            }
        })
    }).catch((e)=> {
        //Error from persistence caught
        if (e == AuthErrorCodes.EMAIL_EXISTS) {
            alert('email already in use');
        }
        console.log('here');
        console.log(e);
        wasCreated = false;
    });
    return wasCreated
}

export const logIn = async (email: string, password: string) => {
    
    //WARNING: DEVELOPMENT ONLY REMOVE WHEN PRODUCTION
    email = "testUser@test.com";
    password = "test123";
    let correctLogin = false;

    await signInWithEmailAndPassword(auth, email, password)
    .then((user)=>{
        alert('User signed in: ' + user.user.email);
        console.log(auth);
        correctLogin = true;
    }).catch((e)=> {
        console.log(e);
    });
    return correctLogin;
}


export const logOut = () => {
    signOut(auth)
    .then(()=> {
        //Sign-out succesful,
        console.log('Signed out');
    }).catch((e)=> {
        //error
        console.log(e);
    });
}

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
