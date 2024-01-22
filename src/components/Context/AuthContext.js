import React, { useContext, useEffect, useState } from "react";
import { userDataRef } from "../Firebase/firebase";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  sendPasswordResetEmail,
} from "firebase/auth";
import { setDoc, doc } from "firebase/firestore";

const AuthContext = React.createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = (props) => {
  const [userData, setUserData] = useState({
    firstName: "",
    lastName: "",
    email: "",
  });

  const [currentUser, setCurrentUser] = useState("");
  const [loading, setLoading] = useState(true);
  const [width, setWidth] = useState("");

  const [folderName, setFolderName] = useState("");
  const [fileName, setFileName] = useState("");

  const [id, setId] = useState("");

  //show delete folder modal
  const [showDeleteFolderModal, setShowDeleteFolderModal] = useState(false);
  //show delete file modal
  const [showDeleteFileModal, setShowDeleteFileModal] = useState(false);
  // for storing changes in searchBar value
  const [searchTerm, setSearchTerm] = useState("");

  const auth = getAuth();
  const provider = new GoogleAuthProvider();

  const addDocument = (data, id) => {
    return setDoc(doc(userDataRef, id), data);
  };

  const signInWithGoogle = async () => {
    const result = await signInWithPopup(auth, provider);
    addDocument(
      {
        displayName: result.user.displayName,
        email: result.user.email,
      },
      result.user.uid
    );
    return result;
  };

  const logInWithGoogle = async () => {
    const result = await signInWithPopup(auth, provider);
    return result;
  };

  const signup = async (email, password) => {
    const result = await createUserWithEmailAndPassword(auth, email, password);
    addDocument(
      {
        displayName: userData.firstName + " " + userData.lastName,
        email: userData.email,
      },
      result.user.uid
    );
    return result;
  };

  const login = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  const logout = () => {
    return auth.signOut();
  };

  const resetPassword = (email) => {
    return sendPasswordResetEmail(auth, email);
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
      setLoading(false);
    });

    return unsubscribe;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const value = {
    id,
    setId,
    fileName,
    setFileName,
    folderName,
    setFolderName,
    showDeleteFileModal,
    setShowDeleteFileModal,
    showDeleteFolderModal,
    setShowDeleteFolderModal,
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
    resetPassword,
  };
  return (
    <AuthContext.Provider value={value}>
      {!loading && props.children}
    </AuthContext.Provider>
  );
};
