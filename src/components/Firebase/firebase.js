import * as firebase from 'firebase/app';
import { collection, getFirestore, serverTimestamp } from "firebase/firestore";
import { getStorage } from "firebase/storage";



const App = () => firebase.initializeApp({
    apiKey: process.env.REACT_APP_API_KEY,
    authDomain: process.env.REACT_APP_AUTH_DOMAIN,
    projectId: process.env.REACT_APP_PROJECT_ID,
    storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_APP_ID

})
App();

// init services
const db = getFirestore();

// collection ref
const userDataRef = collection(db, 'users');

const data = {
    foldersRef: collection(db, 'folders'),
    filesRef: collection(db, 'files'),
    formatDoc: doc => {
        return { id: doc.id, ...doc.data() }
    },
    getCurrentTimeStamp: serverTimestamp(), 

}

export const storage = getStorage();

export  { userDataRef, data, db };