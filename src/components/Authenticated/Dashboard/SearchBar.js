import { addDoc } from "firebase/firestore";
import { useEffect, useRef, useState } from "react";
import { useAuth } from "../../Context/AuthContext";
import { data } from "../../Firebase/firebase";
import { ROOT_FOLDER, useFolder } from "../../Hooks/useFolder";
import { Link, useParams } from "react-router-dom";
import FolderBreadCrumbs from "./FolderBreadCrumbs";
import AddFile from "./AddFile";

const SearchBar = () => {
  const { folderId } = useParams();
  const { folder, childFolders } = useFolder(folderId);
  let currentFolder = folder;

  const { setSearchTerm } = useAuth();

  let path = currentFolder === ROOT_FOLDER ? [] : [ROOT_FOLDER];
  if (currentFolder) path = [...path, ...currentFolder.path];
  // const foldersInSearchBarSize = 3;

  const [toolTipVisibility, setToolTipVisibility] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [title, setTitle] = useState("");
  const { currentUser, showDeleteFolderModal } = useAuth();

  const visibilityParentRef = useRef(null);
  useOutsideAlerter(visibilityParentRef);

  function useOutsideAlerter(ref) {
    useEffect(() => {
      /**
       * removeTooltip if clicked on outside of parent element
       */
      function handleClickOutside(event) {
        if (ref.current && !ref.current.contains(event.target)) {
          setToolTipVisibility(false);
        }
      }
      // Bind the event listener
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        // Unbind the event listener on clean up
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [ref]);
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (currentFolder === null) return;

    const path = [...currentFolder.path];
    if (currentFolder !== ROOT_FOLDER) {
      path.push({ name: currentFolder.name, id: currentFolder.id });
    }
    //create a folder in the database
    addDoc(data.foldersRef, {
      name: title,
      parentId: currentFolder.id,
      userId: currentUser.uid,
      path: path,
      createdAt: data.getCurrentTimeStamp,
      deleted: false,
    });

    setTitle("");
    setShowModal(false);
  }

  return (
    <>
      {showDeleteFolderModal && (
        <div
          className="fixed w-screen h-screen z-10 overflow-hidden"
          style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
        ></div>
      )}
      {showModal && (
        <div
          className="fixed w-screen h-screen z-10 overflow-hidden"
          style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
        ></div>
      )}
      <section className="w-full">
        <div className="flex w-fit ml-auto md:w-full md:flex-row md:ml-3 md:mt-1">
          <div className="hidden md:block md:w-8/12 outline-0 border-0 focus:outline-0 focus:border-0 mt-3 md:mt-0">
            <div className="relative w-full outline-0 focus:outline-0 focus:border-0 ml-0 md:ml-3">
              <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none border-0 outline-0">
                <svg
                  className="w-5 h-5 text-gray-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  ></path>
                </svg>
              </div>
              <input
                type="search"
                id="default-search"
                className="block p-4 pl-10 w-full text-md placeholder:text-gray-400 bg-transparent border-0 outline-0 active:border-0 active:outline-0 focus:outline-0"
                placeholder="Search Folders, Files"
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                }}
              />
            </div>
          </div>

          <div className="flex flex-row w-full md:w-fit md:space-x-8 mt-1 md:ml-10">
            <div className="relative" ref={visibilityParentRef}>
              <button
                onClick={() =>
                  setToolTipVisibility((visibility) => !visibility)
                }
                className="text-googleBtnText bg-gray-100 w-28 text-center ml-3 sm:mx-3 md:mx-0 md:ml-0 font-bold h-10 md:px-7 rounded md:w-fit mt-2 md:mt-1"
              >
                Create
              </button>

              {toolTipVisibility && (
                <div className="absolute mt-2 space-y-3 w-64 border border-gray-100 z-10 shadow-md bg-white">
                  <button
                    className="pl-4 pt-2 hover:bg-gray-100 w-full text-left pb-2"
                    onClick={() => {
                      setShowModal((showModal) => !showModal);
                      setToolTipVisibility(false);
                    }}
                  >
                    <i className="fa-solid fa-folder text-homepageCloudIcon"></i>{" "}
                    New Folder
                  </button>
                  <div className="border border-gray-100 w-full"></div>
                  <button className="pl-4 hover:bg-gray-100 w-full text-left pt-2 pb-2">
                    {" "}
                    <i className="fa-solid fa-file-lines text-doc"></i> Google
                    Document{" "}
                  </button>
                  <button className="pl-4 hover:bg-gray-100 w-full text-left pt-2 pb-2">
                    {" "}
                    <i className="fa-solid fa-file text-sheet"></i> Google Sheet{" "}
                  </button>
                  <button className="pl-4 hover:bg-gray-100 w-full text-left pt-2 pb-2">
                    {" "}
                    <i className="fa-solid fa-file-excel text-yellow-400"></i>{" "}
                    Google Presentation{" "}
                  </button>
                </div>
              )}
            </div>

            <label
              className="bg-progressbar text-white font-bold text-center cursor-pointer flex items-center 
                                justify-center h-10 md:px-7 w-28 ml-3 sm:ml-0 rounded mt-2 md:mt-1 md:w-fit sm:mx-3"
              htmlFor="file_upload"
            >
              Upload
            </label>
            <AddFile />

            <i className="fa-solid fa-bell text-xl mt-4 md:mt-3 ml-3 mx-4 md:ml-0 text-center md:pr-10"></i>
          </div>
        </div>
      </section>

      {showModal && (
        <div
          id="authentication-modal"
          tabIndex="-1"
          aria-hidden="true"
          className=" overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 w-full md:inset-0 h-modal md:h-full justify-center items-center"
        >
          <div className="relative p-4 w-full max-w-sm h-full mx-auto mt-10 md:h-auto">
            <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
              <div className="flex justify-between pt-4">
                <p className="pl-5 font-semibold">Create Folder</p>
                <i
                  className="fa-solid fa-xmark text-gray-300 cursor-pointer text-xl pr-5"
                  onClick={() => setShowModal(false)}
                ></i>
              </div>
              <div className="py-6 px-6 lg:px-8">
                <form className="space-y-6" onSubmit={handleSubmit}>
                  <div className="">
                    <label
                      htmlFor="title"
                      className="block mb-2 text-sm font-medium text-gray-400"
                    >
                      Title
                    </label>
                    <input
                      type="text"
                      name="title"
                      id="title"
                      onChange={(e) => setTitle(e.target.value)}
                      className="focus:outline-0 border border-gray-200 input h-10 w-full mt-2 focus:border-progressbar leading-3 pl-3 text-lg"
                      required
                    />
                  </div>

                  <p className="text-gray-400 font-medium mt-3 text-sm">
                    Location:{" "}
                    {path.map((folder, index) => (
                      <span className="pl-1" key={folder.id}>
                        <Link
                          className="text-blue-400"
                          to={{
                            pathname: folder.id ? `/folder/${folder.id}` : "/",
                          }}
                          state={{
                            folder: { ...folder, path: path.slice(1, index) },
                          }}
                          key={folder.id}
                        >
                          {folder.name}
                        </Link>{" "}
                        /
                      </span>
                    ))}{" "}
                    <span className="text-black">
                      {" "}
                      <FolderBreadCrumbs currentFolder={folder} />{" "}
                    </span>
                  </p>

                  <section className="overflow-auto h-40">
                    {childFolders.length > 0 &&
                      childFolders
                        .filter((val) => !val.deleted)
                        .map((childFolder) => (
                          <section key={childFolder.id}>
                            <div className="border border-gray-100 opacity-80 mt-1"></div>
                            <Link
                              to={`/folder/${childFolder.id}`}
                              key={childFolder.id}
                              className="w-full flex justify-between pt-4"
                            >
                              <p key={childFolder.id} className="">
                                <i className="fa-solid fa-folder text-homepageCloudIcon"></i>
                                <span
                                  key={childFolder.id}
                                  className="pl-3 truncate"
                                >
                                  {childFolder.name}
                                </span>
                              </p>
                              <i className="fa-solid fa-angle-right text-gray-300 mt-1 mr-5"></i>
                            </Link>
                          </section>
                        ))}
                  </section>
                  <button
                    type="submit"
                    className="bg-progressbar w-full rounded text-white h-10 mt-10"
                  >
                    Create
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SearchBar;
