import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useFolder } from "../../Hooks/useFolder";

const DashboardContent = () => {

    const { folderId } = useParams();
    const quickAccessSize = 5;
    const { folder, childFolders } = useFolder(folderId);
    const [ showQuickAccess, setShowQuickAccess ] = useState(true);
    

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
                        to={`/folder/${childFolder.id}`}
                        className="px-2 py-2 text-center"
                        key={childFolder.id}
                        >
                            <i className="fa-solid fa-folder text-homepageCloudIcon text-6xl"></i>
                            <p
                            className="break-words"
                            key={childFolder.id}
                            >
                                {childFolder.name}
                            </p>
                        </Link>
                    )

                    )}
                </div>}

                <div className="w-full mt-10">
                    <h2 className="text-md text-left font-semibold">
                        Recent files
                    </h2>
                    <div className="w-full text-gray-500 mt-4 text-sm grid grid-cols-3 gap-4">
                        <h3>
                            Name
                        </h3>
                        <h3>
                            Last edited
                        </h3>
                    </div>
                    <div className="border border-gray-100 w-full mt-2 mb-4"></div>

                    <div className="w-full text-sm grid grid-cols-3 gap-4">
                        <p className="break-words">
                            item1
                        </p>
                        <p className="break-words">
                            Yesterday,11:09pm
                        </p>
                        <div>
                            <button>
                                item button
                            </button>
                        </div>
                    </div>
                    <div className="border border-gray-100 w-full mt-2 mb-4"></div>

                    <div className="w-full text-sm grid grid-cols-3 gap-4">
                        <p className="break-words">
                            item1
                        </p>
                        <p className="break-words">
                            Yesterday,11:09pm
                        </p>
                        <div>
                            <button>
                                item button
                            </button>
                        </div>
                    </div>
                    <div className="border border-gray-100 w-full mt-2 mb-4"></div>

                    <div className="w-full text-sm grid grid-cols-3 gap-4">
                        <p className="break-words">
                            item1
                        </p>
                        <p className="break-words">
                            Yesterday,11:09pm
                        </p>
                        <div>
                            <button>
                                item button
                            </button>
                        </div>
                    </div>
                    <div className="border border-gray-100 w-full mt-2 mb-4"></div>

                    <div className="w-full text-sm grid grid-cols-3 gap-4">
                        <p className="break-words">
                            item1
                        </p>
                        <p className="break-words">
                            Yesterday,11:09pm
                        </p>
                        <div>
                            <button>
                                item button
                            </button>
                        </div>
                    </div>
                    <div className="border border-gray-100 w-full mt-2 mb-4"></div>

                </div>

            </div>
           
        </>
    );
}
 
export default DashboardContent;