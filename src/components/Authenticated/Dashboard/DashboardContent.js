import { Timestamp } from "firebase/firestore";
import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useFolder } from "../../Hooks/useFolder";
import dateFormatter from 'date-format-conversion';

const DashboardContent = () => {

    const { folderId } = useParams();
    const quickAccessSize = 5;
    const { folder, childFolders, childFiles } = useFolder(folderId);
    const [ showQuickAccess, setShowQuickAccess ] = useState(true);
    console.log(childFolders)
    

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
                {
                    showQuickAccess &&
                    <div className="w-full grid grid-cols-2 gap-2 sm:grid-cols-4 sm:gap-3 md:grid-cols-5 md:gap-4 mt-10">
                    {childFolders.length > 0 && 
                    childFolders.slice(0, quickAccessSize).map(childFolder => (
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

                { showQuickAccess && childFolders.length > 0 && childFiles.length > 0 && <hr className="mt-2" />}

                {
                    showQuickAccess &&
                    <div className="w-full grid grid-cols-2 gap-2 sm:grid-cols-4 sm:gap-3 md:grid-cols-5 md:gap-4 mt-5">
                    {childFiles.length > 0 && 
                    childFiles.slice(0, quickAccessSize).map(childFile => (
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

                <div className="w-full mt-10">
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
                    <div className="border border-gray-100 w-full mt-2 mb-4"></div>

                    {
                        childFolders.length > 0 && childFolders.map(childFolder => (
                            <section
                            key={childFolder.id}
                            >
                                <div className="w-full text-sm grid grid-cols-3 gap-6 truncate">
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
                                    <p className="truncate">
                                        

                                    </p>
                                    <div>
                                        <button className="text-md">
                                            ...
                                        </button>
                                    </div>
                                </div>
                                <div className="border border-gray-100 w-full mt-2 mb-4"></div>
                            </section>
                        ))
                    }

                    {
                        childFiles.length > 0 && childFiles.map(childFile => (
                            <section
                            key={childFile.id}
                            >
                                <div className="w-full text-sm grid grid-cols-3 gap-6 truncate">
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
                                    <p className="truncate">
                                        

                                    </p>
                                    <div>
                                        <button className="text-md">
                                            ...
                                        </button>
                                    </div>
                                </div>
                                <div className="border border-gray-100 w-full mt-2 mb-4"></div>
                            </section>
                        ))
                    }

                </div>

            </div>
           
        </>
    );
}
 
export default DashboardContent;