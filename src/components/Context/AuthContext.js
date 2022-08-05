import React, { useContext, useEffect, useState } from 'react';
import { userDataRef } from '../Firebase/firebase';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup ,GoogleAuthProvider, sendPasswordResetEmail } from "firebase/auth";
import { setDoc, doc } from 'firebase/firestore';



const AuthContext = React.createContext();

export function useAuth() {
    return useContext(AuthContext)
}

export function AuthProvider(props) {
    const [userData, setUserData] = useState({
        firstName:"",
        lastName:"",
        email:"",
    });
    const [currentUser, setCurrentUser] = useState("");
    const [loading, setLoading] = useState(true);
    const [width, setWidth] = useState("");
    // for storing changes in searchBar value
    const [searchTerm, setSearchTerm] = useState("");
    

    const auth = getAuth();
    const provider = new GoogleAuthProvider();

    function addDocument(data, id) {
        return setDoc(doc(userDataRef, id), data);
    }

    function signInWithGoogle() {
        return signInWithPopup(auth, provider).then((result) => {
            addDocument({
                displayName: result.user.displayName,
                email: result.user.email
            }, result.user.uid);
        });
    }

    function logInWithGoogle() {
        return signInWithPopup(auth, provider).then((result) => {
        });
    }

    function signup(email, password) {
        return createUserWithEmailAndPassword(auth, email, password).then((result) => {
            addDocument({
                displayName:  userData.firstName + " " + userData.lastName,
                email: userData.email
            }, result.user.uid);
        });
    }

    function login(email, password) {
        return signInWithEmailAndPassword(auth, email, password);
    }

    function logout() {
        return auth.signOut();
    }

    function resetPassword(email) {
        return sendPasswordResetEmail(auth, email);
    }

    useEffect(() =>{
        const unsubscribe = auth.onAuthStateChanged(user => {
            setCurrentUser(user);
            setLoading(false);
        })

        return unsubscribe;
    }, []);


    const value = {
        searchTerm,
        setSearchTerm,
        userData,
        setUserData,
        width,
        setWidth,
        currentUser,
        addDocument,
        signInWithGoogle,
        logInWithGoogle,
        login,
        signup,
        logout,
        resetPassword
    }
    return (
        <AuthContext.Provider value={value}>
            {
                !loading && props.children
            }
        </AuthContext.Provider>
    )
}