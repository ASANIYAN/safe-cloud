import { useEffect } from "react";
import { useReducer } from "react";
import { data } from "../Firebase/firebase";
import { doc, getDoc, orderBy, limit, query, where, onSnapshot } from 'firebase/firestore';
import { useAuth } from "../Context/AuthContext";

const ACTIONS = {
    SELECT_FOLDER: 'select-folder',
    UPDATE_FOLDER: 'update-folder',
    SET_CHILD_FOLDERS: 'set-child-folders',
    SET_CHILD_FILES: 'set-child-files',
}

export const ROOT_FOLDER = {
    name: 'Root',
    id: null,
    path: [], 
}


function reducer(state, { type, payload }) {
    switch (type) {
        case ACTIONS.SELECT_FOLDER:
            return {
                folderId: payload.folderId,
                folder: payload.folder,
                childFiles: [],
                childFolders: [],
            }
        case ACTIONS.UPDATE_FOLDER:
            return {
                ...state,
                folder: payload.folder,
            }
        case ACTIONS.SET_CHILD_FOLDERS :
            return {
                ...state,
                childFolders: payload.childFolders,
            }
            
        case ACTIONS.SET_CHILD_FILES :
            return {
                ...state,
                childFiles: payload.childFiles,
            }
    
        default:
            return state;
    }
}

export function useFolder(folderId = null, folder = null) {
    const [state, dispatch] = useReducer(reducer, {
        folderId,
        folder,
        childFolders: [],
        childFiles: [],
    });

    const { currentUser } = useAuth();
    
    useEffect(() => {
        dispatch({ type: ACTIONS.SELECT_FOLDER, payload: { folderId, folder } });
    }, [folderId, folder]);

    useEffect(() => {
        if (folderId === null) {
            return dispatch({
                type: ACTIONS.UPDATE_FOLDER,
                payload: { folder: ROOT_FOLDER}
            })
        }

        const foldersRef = doc(data.foldersRef, folderId);
        getDoc(foldersRef).then(doc => {
            dispatch({
                type: ACTIONS.UPDATE_FOLDER,
                payload: { folder: data.formatDoc(doc) }
            })
        }).catch(() => {
            dispatch({
                type: ACTIONS.UPDATE_FOLDER,
                payload: { folder: ROOT_FOLDER}
            });
        })

    }, [folderId]);

    //checks if the parentId of the folders in the storage equals the folderId we are looking for and also 
    //checks if the userId equals the uid of the current user.
    //These operations are performed when there is a change in the folderId or currentUser
    useEffect(() => {
        const q = query(data.foldersRef, where("parentId", "==", folderId), where("userId", "==", currentUser.uid, orderBy("createdAt", "desc"), limit(5)));
        const unsubscribe = onSnapshot(q, (snapshot) => {
            dispatch({
                type: ACTIONS.SET_CHILD_FOLDERS,
                payload: { childFolders: snapshot.docs.map(data.formatDoc) }
            })
        });

        return () => unsubscribe();

    }, [folderId, currentUser]);

    useEffect(() => {
        const q = query(data.filesRef, where("folderId", "==", folderId), where("userId", "==", currentUser.uid, orderBy("createdAt", "asc")));
        const unsubscribe = onSnapshot(q, (snapshot) => {
            dispatch({
                type: ACTIONS.SET_CHILD_FILES,
                payload: { childFiles: snapshot.docs.map(data.formatDoc) }
            })
        });

        return () => unsubscribe();

    }, [folderId, currentUser]);

    return state;

}
