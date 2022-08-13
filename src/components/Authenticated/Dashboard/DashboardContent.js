import { doc, Timestamp, updateDoc } from "firebase/firestore";
import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useFolder } from "../../Hooks/useFolder";
import { useAuth } from "../../Context/AuthContext";
import { db } from "../../Firebase/firebase";

const DashboardContent = () => {

    const { folderId } = useParams();
    const quickAccessSize = 5;
    const { folder, childFolders, childFiles } = useFolder(folderId);
    // console.log(childFolders);
    const [ showQuickAccess, setShowQuickAccess ] = useState(true);
    const { searchTerm, currentUser } =  useAuth();

    function handleFolderDelete(e) {
        e.preventDefault();

        let id = e.target.getAttribute('data-key');
        const docRef = doc(db, "folders", id);

        updateDoc(docRef, {
            deleted: true
        });
    }

    // function handleFileDelete(id) {
    //     // const docRef = doc(db, "folders", id);

    //     // updateDoc(docRef, {
    //     //     deleted: true
    //     // });
    // }

    return (
        <>

            <div className="container">
                <h1 className="text-2xl font-bold mt-4">
                    Homepage
                </h1>
                <div className="w-full flex flex-row justify-between mt-5">
                    <h2 className="text-md font-semibold">
                        Quick access
                    </h2>

                    <h2 className="text-googleBtnText text-md font-bold cursor-pointer select-none" onClick={ () => setShowQuickAccess(showQuickAccess => !showQuickAccess )}>
                        {
                            showQuickAccess ? "Hide" : "Show"
                        }
                    </h2>
                </div>

                { showQuickAccess && <hr className="mt-2 mb-2" />}
                
                {
                    showQuickAccess &&
                    <div className="w-full grid grid-cols-2 gap-2 sm:grid-cols-4 sm:gap-3 md:grid-cols-5 md:gap-4 mt-5">
                    {childFolders.length > 0 && 
                    childFolders.filter((val) => {
                        if(searchTerm === "" && val.deleted === false) {
                            return val
                        } else if( val.name.toLowerCase().includes(searchTerm.toLowerCase()) && val.deleted === false ) {
                            return val;
                        }
                    }).slice(0, quickAccessSize).map(childFolder => (
                        <Link
                        to={{
                            pathname: `/folder/${childFolder.id}`,
                            state: { folder: folder },
                        }}
                        className="px-2 py-2 text-center"
                        key={childFolder.id}
                        >
                            <i className="fa-solid fa-folder text-homepageCloudIcon text-6xl"></i>
                            <p
                            className="truncate"
                            key={childFolder.id}
                            >
                                {childFolder.name}
                            </p>
                        </Link>
                    )

                    )}
                </div>}

                { showQuickAccess && childFolders.length > 0 && childFiles.length > 0 && <hr className="mt-2 mb-2" />}

                {
                    showQuickAccess &&
                    <div className="w-full grid grid-cols-2 gap-2 sm:grid-cols-4 sm:gap-3 md:grid-cols-5 md:gap-4 mt-2">
                    {childFiles.length > 0 && 
                    childFiles.filter((val) => {
                        if(searchTerm === "" && val.deleted === false) {
                            return val
                        } else if( val.name.toLowerCase().includes(searchTerm.toLowerCase()) && val.deleted === false ) {
                            return val;
                        }
                    }).slice(0, quickAccessSize).map(childFile => (
                        <a
                        target="_blank"
                        rel="noreferrer"
                        href={`${childFile.url}`}
                        className="px-2 py-2 text-center truncate"
                        key={childFile.id} 
                        >
                            <i className="fa-solid fa-file"></i>
                            <p
                            className="truncate"
                            key={childFile.id}
                            >
                                {childFile.name}
                            </p>
                        </a>
                    )

                    )}
                </div>}

                <div className="w-full mt-5">
                    <h2 className="text-md text-left font-semibold">
                        Recent files
                    </h2>
                    <div className="w-full text-gray-500 mt-4 text-sm grid grid-cols-3 gap-5">
                        <h3>
                            Name
                        </h3>
                        <h3>
                            Last edited
                        </h3>
                    </div>
                    <hr className="mt-2 mb-2" />

                    {
                        childFolders.length > 0 && childFolders.filter((val) => {
                            if (val.deleted === false) {
                                return val;
                            }
                        }).map(childFolder => (
                            <section
                            key={childFolder.id}
                            >
                                <div className="w-full text-md grid grid-cols-3 gap-6 truncate">
                                    <div
                                    className="truncate"
                                    >
                                        <Link 
                                        to={{
                                            pathname: `/folder/${childFolder.id}`
                                        }}
                                        className="w-fit">
                                            <span className="mx-2"><i className="fa-solid fa-folder text-homepageCloudIcon text-md"></i></span>
                                            { childFolder.name }
                                        </Link>

                                    </div>
                                    { childFolder.createdAt &&
                                        <p className="truncate">
                                            {childFolder.createdAt.toDate().toDateString() + " " + 
                                            childFolder.createdAt.toDate().toLocaleTimeString('en-NG')}
                                        </p>
                                    }
                                    <div className="">
                                        <button
                                        data-key={childFolder.id}
                                        className="text-md w-full md:w-32 cursor-pointer text-black 
                                        py-2 px-3 text-center border border-gray-100 shadow-md bg-gray-100"
                                        onClick={handleFolderDelete}
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </div>
                                <hr className="my-2" />
                            </section>
                        ))
                    }

                    {
                        childFiles.length > 0 && childFiles.filter((val) => {
                            if (val.deleted === false) {
                                return val;
                            }
                        }).map(childFile => (
                            <section
                            key={childFile.id}
                            >
                                <div className="w-full text-md grid grid-cols-3 gap-6 truncate">
                                    <div
                                    className="truncate"
                                    >
                                        <a 
                                        target="_blank"
                                        rel="noreferrer"
                                        href={`${childFile.url}`}
                                        className="w-fit">
                                            <span className="mx-2"><i className="fa-solid fa-file"></i></span>
                                            { childFile.name }
                                        </a>
                                    </div>
                                    {childFile.createdAt &&
                                        <p className="truncate">
                                        {childFile.createdAt.toDate().toDateString() + " " + 
                                        childFile.createdAt.toDate().toLocaleTimeString('en-NG')}

                                    </p>}
                                    <div className="">
                                        <button className="text-md w-full md:w-32 cursor-pointer text-black 
                                        py-2 px-3 text-center border border-gray-100 shadow-md bg-gray-100"
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </div>
                                <hr className="my-2"/>
                            </section>
                        ))
                    }

                </div>

            </div>
           
        </>
    );
}
 
export default DashboardContent;