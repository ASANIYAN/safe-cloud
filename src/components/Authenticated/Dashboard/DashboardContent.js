import { doc, updateDoc } from "firebase/firestore";
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
  const [showQuickAccess, setShowQuickAccess] = useState(true);
  const { searchTerm } = useAuth();

  function handleFolderDelete(e) {
    e.preventDefault();

    let id = e.target.getAttribute("data-key");
    const docRef = doc(db, "folders", id);

    updateDoc(docRef, {
      deleted: true,
    });
  }

  function handleFileDelete(e) {
    e.preventDefault();

    let id = e.target.getAttribute("data-key");
    const docRef = doc(db, "files", id);

    updateDoc(docRef, {
      deleted: true,
    });
  }

  return (
    <>
      <section className="container">
        <h1 className="text-2xl font-bold mt-4">Homepage</h1>
        <section className="w-full flex flex-row justify-between mt-5">
          <h2 className="text-md font-semibold">Quick access</h2>

          <h2
            className="text-googleBtnText text-md font-bold cursor-pointer select-none"
            onClick={() =>
              setShowQuickAccess((showQuickAccess) => !showQuickAccess)
            }
          >
            {showQuickAccess ? "Hide" : "Show"}
          </h2>
        </section>

        {showQuickAccess && <hr className="mt-2 mb-2" />}

        {showQuickAccess && (
          <section className="w-full grid grid-cols-2 gap-2 sm:grid-cols-4 sm:gap-3 md:grid-cols-5 md:gap-4 mt-5">
            {childFolders.length > 0 &&
              childFolders
                .filter(
                  (val) =>
                    (searchTerm === "" ||
                      val.name
                        .toLowerCase()
                        .includes(searchTerm.toLowerCase())) &&
                    !val.deleted
                )
                .slice(0, quickAccessSize)
                .map((childFolder) => (
                  <Link
                    to={{
                      pathname: `/folder/${childFolder.id}`,
                      state: { folder: folder },
                    }}
                    className="px-2 py-2 text-center"
                    key={childFolder.id}
                  >
                    <i className="fa-solid fa-folder text-homepageCloudIcon text-6xl"></i>
                    <p className="truncate" key={childFolder.id}>
                      {childFolder.name}
                    </p>
                  </Link>
                ))}
          </section>
        )}

        {showQuickAccess &&
          childFolders.length > 0 &&
          childFiles.length > 0 && <hr className="mt-2 mb-2" />}

        {showQuickAccess && (
          <section className="w-full grid grid-cols-2 gap-2 sm:grid-cols-4 sm:gap-3 md:grid-cols-5 md:gap-4 mt-2">
            {childFiles.length > 0 &&
              childFiles
                .filter(
                  (val) =>
                    (searchTerm === "" ||
                      val.name
                        .toLowerCase()
                        .includes(searchTerm.toLowerCase())) &&
                    !val.deleted
                )
                .slice(0, quickAccessSize)
                .map((childFile) => (
                  <a
                    target="_blank"
                    rel="noreferrer"
                    href={`${childFile.url}`}
                    className="px-2 py-2 text-center truncate"
                    key={childFile.id}
                  >
                    <i className="fa-solid fa-file"></i>
                    <p className="truncate" key={childFile.id}>
                      {childFile.name}
                    </p>
                  </a>
                ))}
          </section>
        )}

        <section className="w-full mt-5">
          <h2 className="text-md text-left font-semibold">Recent files</h2>
          <section className="w-full text-gray-500 mt-4 text-sm grid grid-cols-3 gap-5">
            <h3>Name</h3>
            <h3>Last edited</h3>
          </section>
          <hr className="mt-2 mb-2" />

          {childFolders.length > 0 &&
            childFolders
              .filter((val) => !val.deleted)
              .map((childFolder) => (
                <section key={childFolder.id}>
                  <section className="w-full text-md grid grid-cols-3 gap-6">
                    <section className="truncate">
                      <Link
                        to={{
                          pathname: `/folder/${childFolder.id}`,
                        }}
                        className="w-fit"
                      >
                        <span className="mx-2">
                          <i className="fa-solid fa-folder text-homepageCloudIcon text-md"></i>
                        </span>
                        {childFolder.name}
                      </Link>
                    </section>
                    {childFolder.createdAt && (
                      <p className="truncate">
                        {childFolder.createdAt.toDate().toDateString() +
                          " " +
                          childFolder.createdAt
                            .toDate()
                            .toLocaleTimeString("en-NG")}
                      </p>
                    )}
                    <section className="">
                      <button
                        data-key={childFolder.id}
                        className="text-md w-full md:w-32 cursor-pointer text-black 
                                        py-2 px-3 text-center border border-gray-100 shadow-md bg-gray-100"
                        onClick={handleFolderDelete}
                      >
                        Delete
                      </button>
                    </section>
                  </section>
                  <hr className="my-2" />
                </section>
              ))}

          {childFiles.length > 0 &&
            childFiles
              .filter((val) => !val.deleted)
              .map((childFile) => (
                <section key={childFile.id}>
                  <section className="w-full text-md grid grid-cols-3 gap-6 truncate">
                    <section className="truncate">
                      <a
                        target="_blank"
                        rel="noreferrer"
                        href={`${childFile.url}`}
                        className="w-fit"
                      >
                        <span className="mx-2">
                          <i className="fa-solid fa-file"></i>
                        </span>
                        {childFile.name}
                      </a>
                    </section>
                    {childFile.createdAt && (
                      <p className="truncate">
                        {childFile.createdAt.toDate().toDateString() +
                          " " +
                          childFile.createdAt
                            .toDate()
                            .toLocaleTimeString("en-NG")}
                      </p>
                    )}
                    <section className="">
                      <button
                        data-key={childFile.id}
                        className="text-md w-full md:w-32 cursor-pointer text-black 
                                        py-2 px-3 text-center border border-gray-100 shadow-md bg-gray-100"
                        onClick={handleFileDelete}
                      >
                        Delete
                      </button>
                    </section>
                  </section>
                  <hr className="my-2" />
                </section>
              ))}
        </section>
      </section>
    </>
  );
};

export default DashboardContent;
