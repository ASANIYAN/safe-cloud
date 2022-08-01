import * as ReactDOM from 'react-dom';
import { getDownloadURL, ref, uploadBytes, uploadBytesResumable } from "firebase/storage";
import { collection, addDoc, serverTimestamp, getFirestore } from "firebase/firestore"; 
import { useParams } from "react-router-dom";
import { useAuth } from "../../Context/AuthContext";
import { storage } from "../../Firebase/firebase";
import { ROOT_FOLDER, useFolder } from "../../Hooks/useFolder";
import { useState } from "react";

import { v4 as uuidv4 } from 'uuid';

const AddFile = () => {
    
    const [ uploadingFiles, setUploadingFiles ] = useState([]);
    const [ showUploadingFiles, setShowUploadingFiles] = useState(true);
    const { currentUser } = useAuth();
    const { folderId } = useParams();
    const { folder} = useFolder(folderId);
    let currentFolder = folder;
    const db = getFirestore();
    
    function handleUpload(e) {
        const file = e.target.files[0];
        if (currentFolder == null || file == null) return

        const id = uuidv4();
        setUploadingFiles(prevUploadingFiles => [
            ...prevUploadingFiles, 
            {id: id, name: file.name, progress: 0, error: false}
        ])
        const filePath = currentFolder === ROOT_FOLDER ? `${currentFolder.path.join('/')}/${file.name}` : `${currentFolder.path.join('/')}/${currentFolder.name}/${file.name}`;

        console.log(currentFolder.path);
        console.log(filePath);

        const fileRef = ref(storage, `/files/${currentUser.uid}/${filePath}`);

        uploadBytes(fileRef, file).then((snapshot) => {
            // console.log('Uploaded a blob or file!');
          });

        const uploadTask = uploadBytesResumable(fileRef, file);

        uploadTask.on('state_changed', (snapshot) => {

        }, () => {

        }, () => {
            // Upload completed successfully, now we can get the download URL
            getDownloadURL(uploadTask.snapshot.ref).then((url) => {
                addDoc(collection(db, "files"), {
                    url: url,
                    name: file.name,
                    createdAt: serverTimestamp(),
                    folderId: currentFolder.id,
                    userId: currentUser.uid,
                  });
                  
            });          
        });



    }
    return (
        <>
            <input
            id="file_upload"
            type="file" 
            onChange={handleUpload}
            style={{ opacity: 0, position: 'absolute', left: '-9999px'}}
            />
            {/* {uploadingFiles.length > 0 &&  */}
                ReactDOM.createPortal(
                    <section
                    className='bg-white shadow-[0px_4px_12px_-1px_rgba(0,0,0,0.1)]'
                    style={{
                        position: 'absolute',
                        bottom: '1rem',
                        right: '1rem',
                        width: '350px',
                        maxWidth: '500px',
                    }}
                    >
                        <div className='flex justify-between mt-3'>
                            <p className='text-black text-md ml-2 font-bold'>
                                Uploading Files <span> {}% </span>
                            </p>
                            <p className="text-googleBtnText text-md font-bold cursor-pointer select-none mr-2" onClick={ () => setShowUploadingFiles(showUploading => !showUploading )}>                     {
                            showUploadingFiles ? "Hide" : "Show"
                        }
                            </p>
                        </div>

                        <hr className='mt-3' />
                        <div className='flex justify-between mt-3'>
                            <p className='truncate' style={{width: '150px'}}>
                                <i className="fa-solid fa-file ml-4 mr-2"></i> <span className=' text-black'> Data.xls </span> 
                            </p>
                            <div className="flex pt-1 mr-4">
                                <i className="fa-solid fa-xmark mx-2"></i>
                                <i className="fa-solid fa-pause mx-2"></i>
                            </div>
                            {/* <i className="fa-solid fa-check text-progressbar mr-4 mt-1"></i> */}
                        </div>
                        <div className="w-full rounded h-0.5 my-2 bg-gray-100">
                            <div className="bg-progressbar h-full" id="progressbar" style={{width: `10%`}}></div>
                        </div>

                    </section>
                )
            {/* } */}
        </>
    );
}
 
export default AddFile;