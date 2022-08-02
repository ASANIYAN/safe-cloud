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
    
    const [ getProgress, setGetProgress ] = useState(0);
    const [ uploadingFiles, setUploadingFiles ] = useState([]);
    const [ showUploadingFiles, setShowUploadingFiles] = useState(true);
    const { currentUser } = useAuth();
    const { folderId } = useParams();
    const { folder} = useFolder(folderId);
    let uploadTask;

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

        // console.log(currentFolder.path);
        // console.log(filePath);

        const fileRef = ref(storage, `/files/${currentUser.uid}/${filePath}`);

        uploadBytes(fileRef, file).then((snapshot) => {
          });

        uploadTask = uploadBytesResumable(fileRef, file);

        uploadTask.on('state_changed', (snapshot) => {
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            setGetProgress( (Math.round(progress)).toString() );
            setUploadingFiles(prevUploadingFiles => {
                return prevUploadingFiles.map(uploadFile => {
                    if (uploadFile.id === id) {
                        return { ...uploadFile, progress: progress}
                    }

                    return uploadFile;
                })
            })
        }, (error) => {
            //Handle Unsuccessful uploads
            setUploadingFiles(prevUploadingFiles => {
                return prevUploadingFiles.map(uploadFile => {
                    if (uploadFile.id === id) {
                        return { ...uploadFile, error: true};
                    } else {
                        return uploadFile;
                    }
                })
            })

        }, () => {
            //Handle Successful uploads
            setUploadingFiles(prevUploadingFiles => {
                return prevUploadingFiles.filter(uploadFile => {
                    return uploadFile.id !== id;
                })
            })

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

    // const [pauseUpload, setPauseUpload] = useState(false);
    // // const [ cancel, setCancel ] = 
    //     function handlePauseUpload () {
    //         uploadTask.pause();
    //         setPauseUpload(true);
    //     }

    //     function handleResumeUpload() {
    //         uploadTask.resume();
    //         setPauseUpload(false);
    //     }

    return (
        <>
            <input
            id="file_upload"
            type="file" 
            onChange={handleUpload}
            style={{ opacity: 0, position: 'absolute', left: '-9999px'}}
            />
            { uploadingFiles.length > 0 && 
                    <section
                    className='bg-white shadow-[0px_4px_15px_-1px_rgba(0,0,0,0.1)]'
                    style={{
                        position: 'absolute',
                        bottom: '1rem',
                        right: '1rem',
                        width: '350px',
                        maxWidth: '500px',
                    }}
                    >
                        { uploadingFiles.map(file => (
                                <section key={file.id}>
                                <div
                                className='flex justify-between mt-3'
                                >
                                    <p
                                    className='text-black text-md ml-3 font-bold'
                                    >
                                        Uploading Files <span> { Math.round(file.progress) }% </span>
                                    </p>
                                    <p className="text-googleBtnText text-md font-bold cursor-pointer select-none mr-3" onClick={ () => setShowUploadingFiles(showUploading => !showUploading )}>                     {
                                    showUploadingFiles ? "Hide" : "Show"
                                }
                                    </p>
                                </div>

                                <hr className='mt-4' />
                                <div
                                className='flex justify-between mt-4'
                                >
                                    <p className='truncate' style={{width: '150px'}}>
                                        <i className="fa-solid fa-file ml-4 mr-2"></i> <span className=' text-black'> {file.name} </span> 
                                    </p>

                                    { file.error && 
                                    <div className='flex pt-1 mr-4'>
                                        <p className='text-red-600 text-sm mx-2'>
                                            Error
                                        </p>
                                        <i className="fa-solid fa-xmark text-gray-400 cursor-pointer mx-2"></i>
                                    </div>
                                    }
                                    
                                    {/* { file.progress < 100 && <div className="flex pt-1 mr-4">
                                        <i className="fa-solid fa-xmark text-gray-400 cursor-pointer mx-2"></i>    
                                        <i className="fa-solid fa-play text-gray-400 cursor-pointer mx-2" ></i> : 
                                        <i className="fa-solid fa-pause text-gray-400 cursor-pointer mx-2"></i>
                                        
                                        
                                    </div>} */}

                                    { file.progress === 100 && <i className="fa-solid fa-check text-progressbar cursor-pointer mr-4 mt-1"></i> }
                                
                                </div>
                                <div 
                                className="w-full rounded h-0.5 my-2 bg-gray-100" 
                                >
                                    {
                                        file.error && 
                                        <div 
                                        className={"h-full bg-red-600"}  
                                        id="progressbar-error" 
                                        style={{width: `100%`}}
                                        >
                                        </div>
                                    }
                                   
                                    { !file.error &&
                                        <div 
                                        className={"h-full bg-progressbar"}  
                                        id="progressbar" 
                                        style={{width: `${file.progress}%`, 
                                        transition: 'width 1s'}}
                                        >
                                        </div>
                                    }
                                </div>
                            </section>
                        ))
                        }

                    </section>
            }
        </>
    );
}
 
export default AddFile;