import * as firebase from 'firebase/app';
import { collection, getFirestore, serverTimestamp } from "firebase/firestore";
import { getStorage } from "firebase/storage";


const App = () => firebase.initializeApp({
    apiKey: "AIzaSyD5THcjyfViSJKUVKdIld7ogot4yKkIz6w",
    authDomain: "cloud-storage-firebase-12f63.firebaseapp.com",
    projectId: "cloud-storage-firebase-12f63",
    storageBucket: "cloud-storage-firebase-12f63.appspot.com",
    messagingSenderId: "741000125471",
    appId: "1:741000125471:web:0cb05cbb680d0800f4092a"

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

export  { userDataRef, data };